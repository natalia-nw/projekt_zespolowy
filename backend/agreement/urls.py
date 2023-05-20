from django.urls import path

from agreement.views import AgreementList

urlpatterns = [
    path("agreement/", AgreementList.as_view(), name=AgreementList.name),
    # path("agreement/<int:pk>", AgreementDetail.as_view(), name=AgreementDetail.name),

]
