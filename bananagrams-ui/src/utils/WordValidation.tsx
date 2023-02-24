import { useEffect, useState } from "react";
import { Square, SquareProps } from "../components/Square";
import { Tile, TileProps } from "../components/Tile";
import {
  Direction,
  NUM_COLS,
  NUM_ROWS,
  Position,
  Word,
} from "../config/BoardDefinition";

const GetRowCol = (index: number): Position => {
  return {
    col: index % NUM_COLS,
    row: Math.floor(index / NUM_COLS),
  };
};

export const PosToIndex = (pos: Position): number => {
  const index = pos.col + pos.row * NUM_COLS;
  return index;
};

export const SquareAtRowCol = (
  squares: SquareProps[],
  row: number,
  col: number
): SquareProps => {
  const index = col + row * NUM_COLS;
  return squares[index];
};

const IsWordStartRight = (squares: SquareProps[], pos: Position): boolean => {
  // If there is a tile to the left, current pos cannot be start of a word
  if (pos.col != 0) {
    const square_to_left = SquareAtRowCol(squares, pos.row, pos.col - 1);
    if (square_to_left?.activeTileProps !== undefined) {
      return false;
    }
  }

  // If there is a tile to the right, but not left, then it is start of a word!
  if (pos.col < NUM_COLS - 1) {
    const square_to_right = SquareAtRowCol(squares, pos.row, pos.col + 1);
    if (square_to_right?.activeTileProps !== undefined) {
      return true;
    }
  }

  // Neither tile to right or left, not a horizontal word
  return false;
};

const IsWordStartDown = (squares: SquareProps[], pos: Position): boolean => {
  // If there is a tile above, current pos cannot be start of a word
  if (pos.row != 0) {
    const square_above = SquareAtRowCol(squares, pos.row - 1, pos.col);
    if (square_above?.activeTileProps !== undefined) {
      return false;
    }
  }

  // If there is a tile below, but not above, then it is start of a word!
  if (pos.row < NUM_ROWS - 1) {
    const square_below = SquareAtRowCol(squares, pos.row + 1, pos.col);
    if (square_below?.activeTileProps !== undefined) {
      return true;
    }
  }

  // Neither tile above or below, not start of word
  return false;
};

const appendLetter = (
  squares: SquareProps[],
  word: Word,
  nextPos: Position
) => {
  const square = SquareAtRowCol(squares, nextPos.row, nextPos.col);
  if (square?.activeTileProps === undefined) {
    return;
  }

  if (word.value) {
    word.value = word.value?.concat(square.activeTileProps.letter);
  } else {
    word.value = square.activeTileProps.letter;
  }

  if (word.dir === Direction.Right && word.pos.col < NUM_COLS - 1) {
    appendLetter(squares, word, { row: nextPos.row, col: nextPos.col + 1 });
  } else if (word.dir === Direction.Down && word.pos.row < NUM_ROWS - 1) {
    appendLetter(squares, word, { row: nextPos.row + 1, col: nextPos.col });
  }
};

const printWords = (squares: SquareProps[], words: Word[]) => {
  words.forEach((word) => {
    word.value = "";
    appendLetter(squares, word, word.pos);
    console.log(word.value);
  });
};

export const FindWords = (squares: SquareProps[]): Word[] => {
  let words: Word[] = [];

  for (let i = 0; i < NUM_ROWS * NUM_COLS; i += 1) {
    const pos = GetRowCol(i);
    const square = squares[i];

    if (square?.activeTileProps === undefined) {
      continue;
    }

    const isHorizontalWord = IsWordStartRight(squares, pos);

    if (isHorizontalWord) {
      words.push({ pos: pos, dir: Direction.Right, is_valid: true });
      console.log(
        `Word starting at ${i} to the right! Start letter: ${square.activeTileProps?.letter}`
      );
    }

    const isDownWord = IsWordStartDown(squares, pos);

    if (isDownWord) {
      words.push({ pos: pos, dir: Direction.Down });
      console.log(
        `Word starting at ${i} down! Start letter: ${square.activeTileProps?.letter}`
      );
    }
  }

  printWords(squares, words);
  return words;
};
