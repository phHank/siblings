from django.shortcuts import get_object_or_404

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
        user = info.context.user
        if user.is_authenticated:
            return get_object_or_404(Basket, owner=user)
        
        return get_object_or_404(Basket, pk=id) 



class AddKidItem(Mutation):
    basket = Field(BasketType)

    class Arguments:
        basket_id = Int()
        product_id = Int(required=True)
        quantity = Int(default_value=1)
        size_1 = String(required=True)
        size_2 = String(required=True)

    def mutate(self, info, product_id=None, basket_id=None, size_1=None, size_2=None, quantity=1, **kwargs):
        valid_options = ('s', 'm', 'l')

        if (size_1.lower() not in valid_options) or (size_2.lower() not in valid_options):
            raise Exception('Invalid Option: available size options are S, M, or L.') 

        options = [
            {
                'option': Option.objects.filter(code='size-1').first(),
                'value': size_1
            },
            {
                'option': Option.objects.filter(code='size-2').first(),
                'value': size_2
            }
        ]

        product = get_object_or_404(Product, pk=product_id)

        user = info.context.user

        if user.is_authenticated:
            # Check if a basket has been assigned to the user.
            basket = Basket.object.filter(owner=user).first()
            basket = basket if basket is not None else Basket(owner=user)

        elif basket_id is not None:
            basket = Basket.objects.filter(pk=basket_id).first()
            basket = basket if basket is not None else Basket()
        
        else:
            basket = Basket()
 
        # basket.strategy = info.context.strategy
        # basket.add_product(product, quantity, options)

        return AddKidItem(basket=basket)

class Mutation(ObjectType):
    add_kid_product = AddKidItem.Field()


schema = Schema(query=Query, mutation=Mutation)