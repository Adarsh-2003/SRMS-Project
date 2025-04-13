from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Student, Subject, Result

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'is_student', 'is_admin', 'is_staff')
    list_filter = ('is_student', 'is_admin')
    fieldsets = UserAdmin.fieldsets + (
        ('Role', {'fields': ('is_student', 'is_admin')}),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(Student)
admin.site.register(Subject)
admin.site.register(Result)
