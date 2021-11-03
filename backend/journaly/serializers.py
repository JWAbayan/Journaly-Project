from rest_framework import serializers
from .models import Item


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
