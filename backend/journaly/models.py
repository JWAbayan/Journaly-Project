from django.db import models
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

    id = models.BigAutoField(primary_key=True)
    type = models.CharField(max_length=1, choices=type_option)
    title = models.CharField(max_length=100)
    body = models.TextField(null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    journal = models.CharField(max_length=50, null=True, blank=True)
    list = models.CharField(max_length=50, null=True, blank=True)
    status = models.CharField(max_length=1, choices=status_option)

    def __str__(self):
        return self.id, self.title
