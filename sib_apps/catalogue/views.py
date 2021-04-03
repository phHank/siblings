from django.urls import reverse
from django.http import HttpResponseRedirect

def redirect(request, pk=None, **kwargs):
    return HttpResponseRedirect( reverse('frontend:index') + f'?products={pk}')