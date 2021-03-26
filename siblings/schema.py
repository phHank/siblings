import graphene

import sib_catalogue.schema
import sib_basket.schema

class Query(sib_catalogue.schema.Query, sib_basket.schema.Query, graphene.ObjectType):
    pass

class Mutation(sib_basket.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)