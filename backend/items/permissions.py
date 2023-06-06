from rest_framework.permissions import BasePermission, SAFE_METHODS


class ItemAccess(BasePermission):
    def has_object_permission(self, request, view, obj):
        # True if user is admin, or item is associated with request user,
        # or item is public read only
        user = request.user
        return (obj.public and request.method in SAFE_METHODS) \
            or obj.user == user or user.is_staff
