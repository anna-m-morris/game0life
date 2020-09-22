import React from 'react';
import './App.css';
import Board from "./Game/Game"

function App() {
  return (
    <div className="App">
      Conway's (Anna's) Game of Life.
      <Board></Board>
    </div>
  );
}

export default App;
