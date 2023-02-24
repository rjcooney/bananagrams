import { useEffect, useState } from "react";
// import { Typo } from "typo-js-ts";
import {
  Direction,
  NUM_COLS,
  NUM_START_TILES,
  Position,
  Word,
} from "../config/BoardDefinition";
import { FindWords, PosToIndex, SquareAtRowCol } from "../utils/WordValidation";
import { Square, SquareProps } from "./Square";
import { Tile, TileProps } from "./Tile";

const letters: Map<string, number> = new Map([
  ["A", 13],
  ["B", 3],
  ["C", 3],
  ["D", 6],
  ["E", 18],
  ["F", 3],
  ["G", 4],
  ["H", 3],
  ["I", 12],
  ["J", 2],
  ["K", 2],
  ["L", 5],
  ["M", 3],
  ["N", 8],
  ["O", 11],
  ["P", 3],
  ["Q", 2],
  ["R", 9],
  ["S", 6],
  ["T", 9],
  ["U", 6],
  ["V", 3],
  ["W", 3],
  ["X", 2],
  ["Y", 3],
  ["Z", 2],
]);

function GenerateTiles(): TileProps[] {
  let tiles: TileProps[] = [];
  let count = 0;
  letters.forEach((v, k) => {
    for (let i = 0; i < v; i += 1) {
      tiles.push({ id: count, letter: k });
      count += 1;
    }
  });

  return tiles;
}

export function Board() {
  const [words, setWords] = useState<Word[]>([]);
  const [squares, setSquares] = useState<SquareProps[]>([]);
  const [pileTiles, setPileTiles] = useState<TileProps[]>([]);
  const [bagTiles, setBagTiles] = useState<TileProps[]>([]);

  const DropTile = (index: number, item: TileProps) => {
    setSquares((existingSquares) => {
      const newSquare = [...existingSquares];
      newSquare.forEach((v) => {
        if (v.activeTileProps?.id === item.id) {
          v.activeTileProps = undefined;
        }
      });

      newSquare[index].activeTileProps = {
        id: item.id,
        letter: item.letter,
        removeTile: undefined,
      };
      return newSquare;
    });
  };

  const removePileTile = (tileProps: TileProps) => {
    setPileTiles((currentTiles) => {
      return currentTiles.filter((c) => c.id !== tileProps.id);
    });
  };

  const addPileTile = (tileProps: TileProps) => {
    if (tileProps === undefined) return;
    setPileTiles((currentTiles) => {
      return [...currentTiles, tileProps];
    });
  };

  const getRandomBagTile = (bTiles: TileProps[]): TileProps | undefined => {
    // When getting a bag tile, this is then for the board
    const len = bTiles.length;
    if (len === 0) return undefined;

    const index = Math.floor(Math.random() * len);
    const tile = bTiles.splice(index, 1)[0];
    tile.removeTile = removePileTile;
    return tile;
  };

  const setWordBackground = (words: Word[]) => {
    let tempSquares = [...squares];

    if (tempSquares.length < 1) return;

    tempSquares.forEach((s) => (s.background = undefined));
    words.forEach((word) => {
      if (word.value === undefined) {
        return;
      }

      // var dictionary = new Typo("en-us");
      // dictionary.check("asdfasd");

      let color = "bg-red-300";
      if (word.is_valid) {
        color = "bg-green-300";
      }

      for (let i = 0; i < word.value.length; i++) {
        let charPos: Position = { col: 0, row: 0 };
        if (word.dir == Direction.Down) {
          charPos = { col: word.pos.col, row: word.pos.row + i };
        } else {
          charPos = { col: word.pos.col + i, row: word.pos.row };
        }
        SquareAtRowCol(tempSquares, charPos.row, charPos.col).background =
          color;
        // tempSquares[charPos].background = color;
      }
    });
    setSquares(tempSquares);
    // tempSquares.forEach((s) => s.)
  };

  const Peel = () => {
    let bTiles = [...bagTiles];
    const newTile = getRandomBagTile(bTiles);
    if (!newTile) return;
    addPileTile(newTile);
    setBagTiles(bTiles);
  };

  useEffect(() => {
    let pileTiles = [];

    let bagTiles = GenerateTiles();
    // console.log("asdfasdf");

    for (var i = 0; i < NUM_START_TILES; i++) {
      const bagTile = getRandomBagTile(bagTiles);
      if (bagTile === undefined) continue;
      pileTiles.push(bagTile);
    }

    setPileTiles(pileTiles);
    setBagTiles(bagTiles);

    setSquares(
      Array.from(Array(250).keys()).map((x) => {
        return {
          index: x,
          dropTile: DropTile,
          activeTileProps: undefined,
        };
      })
    );
  }, []);

  useEffect(() => {
    let newWords = FindWords(squares);

    if (
      newWords
        .map((v) => v.value)
        .sort()
        .join(",") !=
      words
        .map((v) => v.value)
        .sort()
        .join(",")
    ) {
      console.log("Setting words!");
      setWords(newWords);
    }
  }, [squares]);

  useEffect(() => {
    setWordBackground(words);
  }, [words]);

  return (
    <div className="flex flex-col m-10">
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={Peel}
          className="bg-yellow-500 text-center hover:opacity-90 focus:outline-none focus:ring-4font-bold py-4 px-8 rounded m-1"
        >
          Peel
        </button>
      </div>
      <div className="flex flex-row flex-wrap w-[1600px] mb-4 bg-slate-800">
        {squares.map((props) => {
          return (
            <div
              key={props.index}
              className="flex w-16 h-16 border-2  items-center justify-center"
            >
              <Square {...props}></Square>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row items-center justify-center gap-2 min-h-[60px] w-[1600px] m border-2 border-red-800">
        {pileTiles.map((t) => {
          return <Tile key={t.id} {...t}></Tile>;
        })}
      </div>
    </div>
  );
}
