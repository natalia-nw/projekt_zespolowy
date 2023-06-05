from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from items.views import ItemList, ItemDetail, ItemPublicList

urlpatterns = [
    path("items/", ItemList.as_view(), name=ItemList.name),
    path("items/<int:pk>", ItemDetail.as_view(), name=ItemDetail.name),
    path("items/public", ItemPublicList.as_view(), name=ItemPublicList.name)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
