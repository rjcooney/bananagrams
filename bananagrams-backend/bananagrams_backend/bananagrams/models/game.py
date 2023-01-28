from django.db import models

from bananagrams_backend.bananagrams.models.player import Player

class Game(models.Model):
    # TODO: define enum
    status = models.IntegerChoices()
    time_start = models.DateTimeField()
    time_end = models.DateTimeField()

    def __str__(self) -> str:
        return self.id