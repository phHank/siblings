from django.shortcuts import render, reverse
from django.http import HttpResponseRedirect

def index(request):
    return render(request, 'frontend/index.html')

def search(request):
    return HttpResponseRedirect( reverse('frontend:index'))

def redirects(request, name, id=None):
    if id:
        return HttpResponseRedirect( reverse('frontend:index') + f'?{name}={id}')
    return HttpResponseRedirect( reverse('frontend:index') + f'?{name}')