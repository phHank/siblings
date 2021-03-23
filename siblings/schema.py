import graphene

import sib_catalogue.schema


class Query(sib_catalogue.schema.Query, graphene.ObjectType):
    pass

class Mutation(graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)