from rest_framework import fields, serializers, settings
from .models import Item, User, Journal

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
        )

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = (
            "id",
            "user",
            "name",
            
        )  

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
            "status",
        )

class AllUserItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Item
        fields = (
            'id', 'title', 'date', 'journal',
        )


