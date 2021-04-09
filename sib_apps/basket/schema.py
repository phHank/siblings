from django.shortcuts import get_object_or_404

from graphene import Boolean, Field, Int, Mutation, ObjectType, Schema, String
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

class BasketType(DjangoObjectType):
    class Meta:
        model = Basket

    def resolve_lines(parent, info, **kwargs):
        return Line.objects.filter(basket=parent).all()


class Query(ObjectType):
    basket = Field(BasketType)

    def resolve_basket(parent, info, **kwargs):
        user = info.context.user
        if user.is_authenticated:
            basket = Basket.objects.filter(owner=user, status='Open').last()
            if basket is None:
                raise Exception('Empty Basket')
            
            return basket
        
        basket_cookie = info.context.COOKIES.get('oscar_open_basket')
        if basket_cookie is not None:
            basket_id = basket_cookie.split(':')[0]
            basket = Basket.objects.filter(pk=basket_id, status='Open').last()
            if basket is None:
                raise Exception('Empty Basket')
            
            return basket
        
        raise Exception('Empty Basket')


class AddItem(Mutation):
    basket = Field(BasketType)

    class Arguments:
        product_id = Int(required=True)
        quantity = Int(default_value=1)
        size_1 = String(required=True)
        size_2 = String(required=True)
        size_3 = String()
        size_4 = String()

    def mutate(self, info, product_id=None, size_1=None, size_2=None, size_3=None, size_4=None, quantity=1, **kwargs):
        option_1, option_2 = size_1.split(';'), size_2.split(';')

        valid_options = (
            'niño s', 'niño m', 'niño l', 
            'mujer s', 'mujer m', 'mujer l', 'mujer xl', 
            'hombre s', 'hombre m', 'hombre l', 'hombre xl'
            )

        if (option_1[1].lower() not in valid_options) or (option_2[1].lower() not in valid_options):
            raise Exception('Invalid Option: available size options are S, M, L, or XL.') 

        options = [
            {
                'option': Option.objects.filter(name=option_1[0]).first(),
                'value': option_1[1]
            },
            {
                'option': Option.objects.filter(name=option_2[0]).first(),
                'value': option_2[1]
            }
        ]

        if size_3 is not None:
            option_3 = size_3.split(';')

            options.append({
                'option': Option.objects.filter(name=option_3[0]).first(),
                'value': option_3[1]
            })

        if size_4 is not None:
            option_4 = size_4.split(';')

            options.append({
                'option': Option.objects.filter(name=option_4[0]).first(),
                'value': option_4[1]
            })

        product = get_object_or_404(Product, pk=product_id)

        user = info.context.user

        if user.is_authenticated:
            basket = Basket.objects.filter(owner=user, status='Open').last()
            basket = basket if basket is not None else Basket(owner=user)

        basket_cookie = info.context.COOKIES.get('oscar_open_basket')
        if basket_cookie is not None:
            basket_id = basket_cookie.split(':')[0]
            basket = Basket.objects.filter(pk=basket_id, status='Open').first()
            basket = basket if basket is not None else Basket()
        
        if user.is_anonymous and basket_cookie is None:
            basket = Basket()
 
        # expose basket to oscar.apps.basket.middleware
        info.context.basket = basket
        basket.strategy = info.context.strategy
        basket.add_product(product, quantity, options)

        return AddItem(basket=basket)

class Mutation(ObjectType):
    add_product = AddItem.Field()


schema = Schema(query=Query, mutation=Mutation)