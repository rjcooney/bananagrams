import { ReactNode } from "react";
import { useDrop } from "react-dnd";
import { Overlay, OverlayType } from "./Overlay";
import { Tile, TileProps } from "./Tile";
// import classNames from "classnames";
import classNames from "classnames";

export interface SquareProps {
  index: number;
  activeTileProps?: TileProps;
  dropTile: any;
  background?: string;
}

export function Square(props: SquareProps) {
  const { index, activeTileProps, dropTile, background } = props;

  const setBackground = background ?? "bg-slate-600";

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "TILE",
      drop: (tile) => dropTile(index, tile),
      canDrop: (item, monitor) => {
        return activeTileProps === undefined;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [activeTileProps]
  );

  return (
    <div
      ref={drop}
      //   role="Space"
      //   data-testid={`(${index})`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      className={classNames("flex items-center justify-center", setBackground)}
      key={index}
    >
      <div className="flex text-lg">
        {activeTileProps && <Tile {...activeTileProps}></Tile>}
      </div>
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
    </div>
  );
}
