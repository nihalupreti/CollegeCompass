from django.contrib import admin
from .models import College, Staff, Faculty

class CollegeAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            # Superuser can view all colleges
            return qs
        try:
            # Get the college associated with the current user
            staff_college = Staff.objects.get(user=request.user).college
            return qs.filter(id=staff_college.id)
        except Staff.DoesNotExist:
            # If user is not associated with any college, return an empty queryset
            return qs.none()

    def has_add_permission(self, request):
        try:
            # Check if the current user is associated with any college
            Staff.objects.get(user=request.user)
            # User is associated with a college, disallow adding new entries
            return False
        except Staff.DoesNotExist:
            # User is not associated with any college, allow adding new entries
            return True

    def save_model(self, request, obj, form, change):
        if not change:
            # If this is a new entry, save the college first
            obj.save()
            # Associate the college with the current user
            staff_user = Staff(user=request.user, college=obj)
            staff_user.save()
        else:
            obj.save()


admin.site.register(College, CollegeAdmin)
admin.site.register(Faculty)
