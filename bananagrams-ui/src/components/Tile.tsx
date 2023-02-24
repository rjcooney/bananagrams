import { DragSourceMonitor, useDrag } from "react-dnd";

export interface TileProps {
  id: number;
  letter: string;
  removeTile?: any;
}

export function Tile(props: TileProps) {
  const { id, letter, removeTile } = props;

  function handleDrop(item: any, monitor: DragSourceMonitor) {
    // console.log(monitor.didDrop());
    if (monitor.didDrop()) {
      // console.log("Calling remove item");
      if (removeTile) {
        removeTile(item);
      }
    }
  }

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "TILE",
      item: props,
      end: handleDrop,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [props]
  );

  // console.log(letter);

  return (
    <div
      key={id.toString()}
      ref={drag}
      className="text-lg w-12 h-12 border-2 border-black bg-yellow-500 rounded-md"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {letter}
    </div>
  );
}
