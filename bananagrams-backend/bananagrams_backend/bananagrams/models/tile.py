from msilib.schema import Class
from django.db import models

# TODO: my thought right now is that we'll have a list of "tiles" associated with a specific game
# so that we can track the exact tiles within a given game. Not sure that's necessary at all
# This means we'd have several tile instances for the same letter within a game
class Tile(models.Model):
    letter = models.CharField(max_length=1)


    def __str__(self) -> str:
        return self.id