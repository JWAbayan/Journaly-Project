from django.contrib import admin
from .models import Item, User, Journal


class JournalyAdmin(admin.ModelAdmin):
    users_display = ('__all__')
    items_display = ('__all__')
    journals_display = ('__all__')


# Register your models here.

admin.site.register(User, JournalyAdmin)
admin.site.register(Item, JournalyAdmin)
admin.site.register(Journal, JournalyAdmin)