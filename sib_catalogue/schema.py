from django.shortcuts import get_list_or_404, get_object_or_404

from graphene import Field, Float, Int, List, ObjectType, String, Schema, Boolean
from graphene_django import DjangoObjectType

from oscar.apps.partner.strategy import Selector
from oscar.core.loading import get_model

Product = get_model('catalogue', 'product')
ProductImage = get_model('catalogue', 'productimage')
ProductClass = get_model('catalogue', 'productclass')
Option = get_model('catalogue', 'Option')

strategy = Selector().strategy()

def staff_user(info):
    return info.context.user.is_staff


class PriceType(ObjectType):
    ex_tax = Float()
    incl_tax = Float()
    currency = String()


class ProductImageType(DjangoObjectType):
    class Meta:
        model = ProductImage
        exclude = ('product',)


class ProductOptionType(DjangoObjectType):
    class Meta:
        model = Option
        exclude = ('product_set',)


class ProductType(DjangoObjectType):
    images = List(ProductImageType, take=Int())
    in_stock = Int()
    options = List(ProductOptionType)
    price = Field(PriceType)

    class Meta: 
        model = Product
        exclude = ('meta_description', 'meta_title', 'product_set')

    def resolve_images(parent, info, take=None, **kwargds):
        return ProductImage.objects.filter(product=parent).order_by('display_order').all()[:take]

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

class Query(ObjectType):
    products = List(ProductType)
    product = Field(ProductType, id=Int(required=True))

    def resolve_products(parent, info, **kwargs):
        if staff_user(info):
            return get_list_or_404(Product)
        
        return get_list_or_404(Product, is_public=True)

    def resolve_product(parent, info, id=None, **kwargs):
        if staff_user(info):
            return get_object_or_404(Product, pk=id)

        return get_object_or_404(Product, pk=id, is_public=True)



schema = Schema(query=Query)