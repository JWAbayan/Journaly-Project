from rest_framework import fields, serializers
from .models import Item, User


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = (
            "IDNum",
            "User",
            "Type",
            "Title",
            "Body",
            "Date",
            "Time",
            "Journal",
            "List",
            "Status",
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
        )
