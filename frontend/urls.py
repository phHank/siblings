from django.urls import path
from . import views

app_name = 'frontend'

urlpatterns = [
  path('', views.index, name='index'),
  path('products/<int:id>', views.redirects, name='redirect_prods'),
  path('category/<name>', views.redirects, name='redirect_cats'),
  path('search', views.redirects, name='redirect_search'),
]