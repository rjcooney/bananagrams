from django.db import models

class User(models.Model):
    username = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    def __str__(self) -> str:
        return self.username
    def is_tom(self) -> bool:
        return self.username == "tom"