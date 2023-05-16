from rest_framework.permissions import BasePermission


class ItemAccess(BasePermission):
    def has_object_permission(self, request, view, obj):
        # True if user is admin, or item is associated with request user.
        user = request.user
        return obj.user == user or user.is_staff
