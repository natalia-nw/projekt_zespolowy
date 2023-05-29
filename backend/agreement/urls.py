from django.urls import path

from agreement.views import AgreementList, AgreementDetail

urlpatterns = [
    path("agreements/", AgreementList.as_view(), name=AgreementList.name),
    path('items/<int:item_id>/agreements/', AgreementList.as_view(), name=AgreementList.name),
    path('items/<int:item_id>/agreements/<int:pk>', AgreementDetail.as_view(), name=AgreementDetail.name),
    path("agreements/<int:pk>", AgreementDetail.as_view(), name=AgreementDetail.name),

]
