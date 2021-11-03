from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import EmailField

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=30, unique=True, null=False)
    email = models.EmailField(null=False)
    password = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.username


class Item(models.Model):
    type_option = (
        ("T", "Task"),
        ("E", "Event"),
        ("N", "Note"),
    )

    status_option = (
        ("C", "Completed"),
        ("P", "Pending"),
    )

    IDNum = models.BigAutoField(primary_key=True)
    User = models.ForeignKey(User, on_delete=CASCADE)
    Type = models.CharField(max_length=1, choices=type_option)
    Title = models.CharField(max_length=100)
    Body = models.TextField(null=True, blank=True)
    Date = models.DateField(null=True, blank=True)
    Time = models.TimeField(null=True, blank=True)
    Journal = models.CharField(max_length=50, null=True, blank=True)
    List = models.CharField(max_length=50, null=True, blank=True)
    Status = models.CharField(max_length=1, choices=status_option)

    def __str__(self):
        return self.Title
