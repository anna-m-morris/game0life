import React from "react";
import "./App.css";
import Board from "./game/Board";

function App() {
  return (
    <div className="App">
        <Board></Board>
      <div>
        <h1>Anna's (Conway's) Game of Life.</h1>
        If a cell has 3 live neighbors it comes to life
        <br />
        If a cell has 2 or 3 live neighbors and was already alive it stays alive
        <br />
        If a cell has less than two neighbors or more than three it dies.
      </div>
    </div>
  );
}

export default App;
