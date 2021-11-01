from django.contrib import admin
from django.contrib.admin.decorators import register
from .models import Item, User


class JournalyAdmin(admin.ModelAdmin):
    users_display = ('username', 'email', 'password')
    items_display = ('__all__')


# Register your models here.
admin.site.register(User, JournalyAdmin)
admin.site.register(Item, JournalyAdmin)
