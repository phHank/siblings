from django.shortcuts import get_list_or_404, get_object_or_404
from django.db.models import Q

from graphene import Boolean, Field, Float, Int, List, ObjectType, String, Schema
from graphene_django import DjangoObjectType

from oscar.apps.partner.strategy import Selector
from oscar.core.loading import get_model

Category = get_model('catalogue', 'category')
ProductCategory = get_model('catalogue', 'productcategory')
Product = get_model('catalogue', 'product')
ProductImage = get_model('catalogue', 'productimage')
ProductClass = get_model('catalogue', 'productclass')
Option = get_model('catalogue', 'option')

strategy = Selector().strategy()

def staff_user(info):
    return info.context.user.is_staff


class PriceType(ObjectType):
    ex_tax = Float()
    incl_tax = Float()
    currency = String()

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        exclude=('productcategory_set',)

class ProductCategoryType(DjangoObjectType):
    class Meta:
        model = ProductCategory
        exclude = ('product',)

class ProductImageType(DjangoObjectType):
    class Meta:
        model = ProductImage
        exclude = ('product',)


class ProductOptionType(DjangoObjectType):
    class Meta:
        model = Option
        exclude = ('product_set',)


class ProductType(DjangoObjectType):
    images = List(ProductImageType, take=Int(), skip=Int())
    in_stock = Int()
    options = List(ProductOptionType)
    price = Field(PriceType)
    categories = List(ProductCategoryType)

    class Meta: 
        model = Product
        exclude = ('meta_description', 'meta_title', 'product_set', 'basket_lines', 'productcategory_set')

    def resolve_images(parent, info, skip=0, take=None, **kwargds):
        return ProductImage.objects.filter(product=parent).order_by('display_order').all()[skip:take]

    def resolve_in_stock(parent, info, **kwargs):
        details = strategy.fetch_for_product(parent)

        return details.stockrecord.num_in_stock

    def resolve_price(parent, info, **kwargs):
        details = strategy.fetch_for_product(parent)
        excl_tax = details.price.excl_tax
        incl_tax = details.price.incl_tax
        currency = details.price.currency
    
        return PriceType(ex_tax=excl_tax, incl_tax=incl_tax, currency=currency)
    
    def resolve_options(parent, info, **kwargs):
        return ProductClass.objects.filter(products=parent).first().options.all()

    def resolve_categories(parent, info, **kwargs):
        return ProductCategory.objects.filter(product=parent).all()

class Query(ObjectType):
    products = List(ProductType, search=String(), take=Int(), skip=Int(), order_by=String())
    product = Field(ProductType, id=Int(required=True))
    
    categories = List(CategoryType)
    category = Field(CategoryType, name=String(required=True))

    logged_in = Boolean()

    def resolve_products(
        self, info, search=None, take=None, skip=None, order_by='-pk', **kwargs):
        if staff_user(info):
            qs = Product.objects.order_by(order_by).all()
        
        else:
            qs = Product.objects.filter(is_public=True).order_by(order_by).all()

        if search: 
            filter = (
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(meta_title__icontains=search) |
                Q(meta_description__icontains=search)
            )
            qs = qs.filter(filter)
        
        return qs[skip:take]

    def resolve_product(self, info, id=None, **kwargs):
        if staff_user(info):
            return get_object_or_404(Product, pk=id)

        return get_object_or_404(Product, pk=id, is_public=True)

    def resolve_categories(self, info, **kwargs):
        if staff_user(info):
            return get_list_or_404(Category)

        return get_list_or_404(Category, is_public=True)
    
    def resolve_category(self, info, name=None, **kwargs):
        if staff_user(info):
            return get_object_or_404(Category, name=name)

        return get_object_or_404(Category, name=name, is_public=True)

    def resolve_logged_in(self, info, **kwargs):
        return info.context.user.is_authenticated


schema = Schema(query=Query)