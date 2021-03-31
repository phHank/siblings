from oscar.apps.shipping import repository, methods
from oscar.core import prices
from oscar.core.loading import get_classes

class Collection(methods.Free):
    """
    The customer would like to collect the items from the store. 
    """
    code = 'collection'
    name = ('MXN $0 Recoger en la Tienda')

class Delivery(methods.Free):
    '''
    Delivery in CDMX
    '''
    code = 'cdmx-delivery'
    name = ('MXN $65 en efectivo Día de la Entrega')



class Repository(repository.Repository):
    methods = (Delivery(), Collection())

