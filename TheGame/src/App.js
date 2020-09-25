import React from 'react';
import './App.css';
import Board from "./Game/Game"

function App() {
  return (
    <div className="App"><div>
      Conway's (Anna's) Game of Life.
      <Board></Board></div>
      <div>If a cell has 3 live neighbors it comes to life<br/>If a cell has 2 or 3 live neigbors and was already alive it stays alive<br/>If a cell has less than two neighbors or more than four it dies.</div>
    </div>
  );
}

export default App;
