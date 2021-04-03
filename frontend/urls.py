from django.urls import path
from . import views

app_name = 'frontend'

urlpatterns = [
  path('', views.index, name='index'),
  path('search', views.search, name='search'),
  path('<str:name>/<id>', views.redirects, name='param_redirects'),
  path('<str:name>', views.redirects, name='no_param_redirect')
]