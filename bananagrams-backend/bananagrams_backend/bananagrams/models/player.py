from django.db import models
from bananagrams_backend.bananagrams.models.board import Board
from bananagrams_backend.bananagrams.models.game import Game
from bananagrams_backend.bananagrams.models.user import User

class Player(models.Model):
    user = models.ForeignKey(User)
    game = models.ForeignKey(Game)
    board = models.ForeignKey(Board)

    # TODO: probably some metadata about the user's session

    def __str__(self) -> str:
        return self.id
