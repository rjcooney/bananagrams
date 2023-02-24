import React from "react";
import "./App.css";
import { Board } from "./components/Board";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Board></Board>
      </DndProvider>
    </div>
  );
}

export default App;
