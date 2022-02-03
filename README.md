# bananagrams

Starting w a small game, then will scale.

Timeline?

UI

Requirements:
General Gameplay:
- Picture in picture of other people's boards
- Peel / bananagrams button
- Pressing peel can validate the word choice
- Dump button
- Visual: See number of tiles left/number of turns
-   perhaps a visual indicator of a stack of tiles?
- Draggy-droppy

Settings screen:
- Validation - add on setting
- Picture in picture

End Game:
- who won?
- ability to view everyone's board

Loading Screen
- 1-8 players

this will be done in django 

abstract server-client push comms as much as possible - we don't know what we're doing
django can't inherently do web sockets?
  perhaps django channels can?
  perhaps twisted or tornado? instead

vscode for development

abstract data repository - redis cache
v2 - past game states?


Logic


How are we going to validate words? Detecting words in the grid

How are we pushing changes from the server to clients?
