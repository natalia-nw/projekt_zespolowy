from django.utils.timezone import now
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission, SAFE_METHODS

from agreement.choices import AgreementStatus


class AgreementAccess(BasePermission):
    def has_object_permission(self, request, view, obj):
        # True if user is admin, or item is associated with request user,
        # Item receiver can only cancel, cannot undo cancel, other field permissions
        user = request.user
        if obj.receiver == user:
            if request.method in SAFE_METHODS:
                return True
            allowed_keys = ['status']
            if request.method not in ['PUT', 'DELETE'] or all(key in allowed_keys for key in request.data):
                if obj.status == AgreementStatus.RECEIVER_CANCELLED:
                    raise PermissionDenied(detail="Już anulowano to zapytanie.")
                if obj.date_stop > now().date():
                    raise PermissionDenied(detail="Nie można anulować umowy z przeszłości.")
                if obj.status == AgreementStatus.RECEIVER_CONFIRMED \
                        and obj.date_start < now().date():
                    raise PermissionDenied(detail="Tylko właściciel może anulować trwającą/zakończoną umowę.")
                if request.data.get('status', AgreementStatus.RECEIVER_CANCELLED) == AgreementStatus.RECEIVER_CANCELLED:
                    return True
            raise PermissionDenied(detail="Możesz tylko anulować zapytanie.")
        else:
            disallowed_keys = ['receiver', 'item']
            if request.method == 'PUT' or any(key in disallowed_keys for key in request.data):
                raise PermissionDenied(detail="Nie można ręcznie zmienić danych o użytkowniku i przedmiocie. "
                                              "Możesz edytować przedmiot w menu przedmiotów.")
            if obj.status == AgreementStatus.OWNER and request.data.get('status'):
                raise PermissionDenied(detail="Nie można zmienić statusu wpisu właściciela.")
            if obj.status != AgreementStatus.OWNER and request.data.get('status') == AgreementStatus.OWNER:
                raise PermissionDenied(detail="Nie można zmienić zapytania na wpis właściciela.")
        return obj.item.user == user or user.is_staff
