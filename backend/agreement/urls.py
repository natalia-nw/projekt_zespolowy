from django.urls import path

from agreement.views import AgreementList, AgreementDetail, AgreementLinkView

urlpatterns = [
    path("agreements/", AgreementList.as_view(), name=AgreementList.name),
    path('items/<int:item_id>/agreements/', AgreementList.as_view(), name=AgreementList.name),
    path('items/<int:item_id>/agreements/<int:pk>', AgreementDetail.as_view(), name=AgreementDetail.name),
    path("agreements/<int:pk>", AgreementDetail.as_view(), name=AgreementDetail.name),
    path("agreements/link", AgreementLinkView.as_view(), name=AgreementLinkView.name),

]
