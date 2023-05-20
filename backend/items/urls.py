from django.urls import path

from items.views import ItemList, ItemDetail, ItemPublicList

urlpatterns = [
    path("items/", ItemList.as_view(), name=ItemList.name),
    path("items/<int:pk>", ItemDetail.as_view(), name=ItemDetail.name),
    path("items/public", ItemPublicList.as_view(), name=ItemPublicList.name)
]
