from django.shortcuts import get_object_or_404, get_list_or_404

from graphene import Field, Int, Mutation, ObjectType, Schema, String, List
from graphene_django import DjangoObjectType

from django.contrib.auth.models import User

from oscar.core.loading import get_model

Basket = get_model('basket', 'basket')
Line = get_model('basket', 'line')
Product = get_model('catalogue', 'product')
Option = get_model('catalogue', 'option')

class LineType(DjangoObjectType):
    class Meta:
        model = Line
        exclude = ('basket',)

class OwnerType(DjangoObjectType):
    class Meta: 
        model = User
        exclude = ('baskets',)

class BasketType(DjangoObjectType):
    owner = List(OwnerType)

    class Meta:
        model = Basket

    def resolve_lines(parent, info, **kwargs):
        return Line.objects.filter(basket=parent).all()


class Query(ObjectType):
    basket = Field(BasketType, id=Int())

    def resolve_basket(parent, info, id=None, **kwargs):
        new_basket = Basket()
        return new_basket



class AddKidItem(Mutation):
    basket = Field(BasketType)

    class Arguments:
        basket_id = Int()
        product_id = Int(required=True)
        quantity = Int(default_value=1)
        size_1 = String(required=True)
        size_2 = String(required=True)

    def mutate(self, info, size_1=None, size_2=None, quantity=1, product_id=None, basket_id=None, **kwargs):
        options = [
            {'size-1': size_1}, {'size-2': size_2}
            #TODO: link the relevant options model as keys with the value in dicts. 
            # https://django-oscar.readthedocs.io/en/3.0.2/_modules/oscar/apps/basket/abstract_models.html
        ]

        product = get_object_or_404(Product, pk=product_id)

        user = info.context.user

        if user.is_authenticated:
            auth_user = User.objects.filter(username=user.username).first()
            basket = get_object_or_404(Basket, owner=auth_user)
        elif basket_id is not None:
            basket = get_object_or_404(Basket, pk=basket_id)
        else:
            # TODO: instatiate an new empty Basket instance. 
            basket = Basket.objects.first()

        basket.strategy = info.context.strategy
        basket.add_product(product, quantity, options)

        return AddKidItem(basket=basket)

class Mutation(ObjectType):
    add_kid_product = AddKidItem.Field()


schema = Schema(query=Query, mutation=Mutation)