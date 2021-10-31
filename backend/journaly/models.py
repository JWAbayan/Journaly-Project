from django.db import models
from django.db.models.fields import EmailField

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=30, unique=True, null=False)
    email = models.EmailField(null=False)
    password = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.username
