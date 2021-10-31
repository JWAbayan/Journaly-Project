from django.contrib import admin
from django.contrib.admin.decorators import register
from .models import User


class JournalyAdmin(admin.ModelAdmin):
    users_display = ('username', 'email', 'password')


# Register your models here.
admin.site.register(User, JournalyAdmin)
