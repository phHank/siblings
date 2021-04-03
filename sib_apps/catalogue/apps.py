from django.urls import path, re_path

from oscar.apps.catalogue.apps import CatalogueOnlyConfig as CoreCatalogueOnlyConfig, CatalogueReviewsOnlyConfig

from .views import redirect

class CatalogueOnlyConfig(CoreCatalogueOnlyConfig):
    def get_urls(self):
        urls = [
            path('', self.catalogue_view.as_view(), name='index'),
            path('<str:product_slug>_<pk>/', redirect, name='detail'),
            path('<pk>/', redirect, name='detail2'),
            re_path(
                r'^category/(?P<category_slug>[\w-]+(/[\w-]+)*)_(?P<pk>\d+)/$',
                self.category_view.as_view(), name='category'),
            path('ranges/<slug:slug>/', self.range_view.as_view(), name='range'),
        ]
        return self.post_process_urls(urls)

class CatalogueConfig(CatalogueOnlyConfig, CatalogueReviewsOnlyConfig):
    """
    Composite class combining Products with Reviews
    """
