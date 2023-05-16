from django.urls import include, path

from users.views import ItemList, ItemDetail


urlpatterns = [
    path("items/", ItemList.as_view(), name=ItemList.name),
    path("items/<int:pk>", ItemDetail.as_view(), name=ItemDetail.name)
]
