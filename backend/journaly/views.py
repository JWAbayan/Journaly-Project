from django.db.models import query
from django.http import request
from rest_framework import fields, viewsets
from rest_framework import generics
from rest_framework.serializers import Serializer
from .serializers import AllUserItemSerializer, ItemSerializer, UserSerializer, JournalSerializer
from .models import Item, User, Journal

# Create your views here.

class JournalView(viewsets.ModelViewSet):
    serializer_class = JournalSerializer
    # queryset = Journal.objects.all()

    def get_queryset(self):
        uid = self.request.query_params.get('id')
    
        queryset = Journal.objects.filter(user = uid)

        return queryset

class ItemView(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    
    
    def get_queryset(self):
        uid = self.request.query_params.get('id')
        itemType = self.request.query_params.get('type')
        currJournal = self.request.query_params.get('journal')

        queryset = Item.objects.filter(user=uid, type=itemType, journal=currJournal)

        return queryset

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    
    def get_queryset(self):
        userEmail = self.request.query_params.get('email')
        userPassword = self.request.query_params.get('password')

        queryset = User.objects.filter(email=userEmail, password=userPassword)

        return queryset
    # queryset = User.objects.all()

class ValidateUserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        userEmail = self.request.query_params.get('email')

        queryset = User.objects.filter(email=userEmail)

        return queryset

class AllUserItemView(viewsets.ModelViewSet):
    serializer_class = AllUserItemSerializer
    def get_queryset(self):
        uid = self.request.query_params.get('id')

        queryset = Item.objects.filter(user=uid)

        return queryset
    
class AllUserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    class Meta:
        fields=(
            'id',
            'username',
            'email',
            'password',
            
        )

class AllItemView(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    class Meta:
        fields=(
            'id',
            'user',
            'type',
            'title',
            'body',
            'date',
            'time',
            'journal',
            'status',
        )

class AllJournalView(viewsets.ModelViewSet):
    serializer_class = JournalSerializer
    queryset = Journal.objects.all()
    class Meta:
        fields=(
            'id',
            'name',
            'date_creted',
            'user',
        )