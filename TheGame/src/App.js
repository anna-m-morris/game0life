import React from 'react';
import './App.css';
import Game from "./Game/Game"

function App() {
  return (
    <div className="App">
      Conway's (Anna's) Game of Life.
      <Game></Game>
    </div>
  );
}

export default App;
