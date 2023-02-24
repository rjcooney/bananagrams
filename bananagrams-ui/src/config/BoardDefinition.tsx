export enum Direction {
  Right = "Right",
  Down = "Down",
}

export interface Position {
  row: number;
  col: number;
}

export interface Word {
  pos: Position;
  dir: Direction;
  is_valid?: boolean;
  value?: string;
}

export const NUM_COLS = 25;
export const NUM_ROWS = 10;
export const NUM_START_TILES = 10;
