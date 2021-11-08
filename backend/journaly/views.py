from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.serializers import Serializer
from .serializers import ItemSerializer, UserSerializer
from .models import Item, User

# Create your views here.


class ItemView(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()