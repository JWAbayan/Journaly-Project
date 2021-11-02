from rest_framework import serializers
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = (
            "id",
            "user",
            "type",
            "title",
            "body",
            "date",
            "time",
            "journal",
            "lists",
            "status",
        )
