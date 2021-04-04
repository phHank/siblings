import graphene

import sib_apps.catalogue.schema
import sib_apps.basket.schema

class Query(sib_apps.catalogue.schema.Query, sib_apps.basket.schema.Query, graphene.ObjectType):
    pass

class Mutation(sib_apps.basket.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)