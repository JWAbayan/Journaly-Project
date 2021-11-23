from django.db import models
from django.db.models.deletion import CASCADE, SET_DEFAULT, SET_NULL

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=30, unique=True, null=False)
    email = models.EmailField(null=False)
    password = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.username

class Journal(models.Model):
    name  = models.CharField(max_length=50, null=False)
    date_created = date_created = models.DateField(null=True, blank=True)
    user = models.ForeignKey(to=User, on_delete=CASCADE)

    def __str__(self):
        return self.name

class Item(models.Model):
    type_option = (
        ("Task", "Task"),
        ("Event", "Event"),
        ("Note", "Note"),
    )

    status_option = (
        ("Completed", "Completed"),
        ("Pending", "Pending"),
    )

    user = models.ForeignKey(User, on_delete=CASCADE)
    type = models.CharField(max_length=10, choices=type_option)
    title = models.CharField(max_length=100, default="Untitled")
    body = models.TextField(null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    journal = models.ForeignKey(to=Journal, on_delete=CASCADE)
    status = models.CharField(max_length=10, choices=status_option)

    def __str__(self):
        return self.title
