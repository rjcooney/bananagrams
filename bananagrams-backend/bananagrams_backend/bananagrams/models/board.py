from django.db import models

from bananagrams_backend.bananagrams.models.tile import Tile

# TODO: my initial thought is that this'll represent a group of tiles. 
# That could be a player's board, or the tiles in a player's hand, or the tiles
# that aren't in any player's hand
# feels kinda weird, so probably not the best call. Open to other thoughts!
class Board(models.Model):
    tile = models.ForeignKey(Tile)
    position = models.IntegerField()

    def __str__(self):
        return self.id