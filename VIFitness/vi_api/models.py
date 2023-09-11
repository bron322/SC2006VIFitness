from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserData(models.Model):
    username = models.CharField(max_length=26)
    email = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.username
