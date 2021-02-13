import React, { useState, useRef } from "react";
import produce from "immer";
const possibleNeighbors = [
  [0, 1],
  [1, 1],
  [1, 0],
  [-1, 1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [1, -1],
];

const Board = () => {
  const [rows, setRows] = useState(25);
  const [columns, setColumns] = useState(25);
  const [gen, setGen] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(500);

  const isRunning = useRef();
  isRunning.current = running;

  const newBoard = () => {
    var board = [];
    for (let i = 0; i < rows; i++) {
      board.push(Array.from(Array(columns), () => 0));
    }
    return board;
  };
  const [grid, setGrid] = useState(() => {
    return newBoard();
  });

  const stepGame = () => {
    setGrid((state) => {
      return produce(state, (newState) => {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            let neighbors = 0;
            possibleNeighbors.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < rows && newJ >= 0 && newJ < columns) {
                neighbors += state[newI][newJ];
              }
            });
            if (state[i][j] && neighbors === 2) {
              newState[i][j] = 1;
            }
            if (neighbors === 3) {
              newState[i][j] = 1;
            }
            if (neighbors < 2 || neighbors > 3) {
              newState[i][j] = 0;
            }
          }
        }
      });
    });
    setGen((gen) => gen + 1);
  };

  const runGame = () => {
    if (!isRunning.current) {
      return;
    }
    stepGame();
    setTimeout(runGame, speed);
  };

  const clearBoard = () => {
    setGrid(() => {
      return newBoard();
    });
    setRunning(false);
    setGen(0);
  };

  const randomize = () => {
    clearBoard();
    setGrid((state) => {
      return produce(state, (newState) => {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            let random = Math.floor(Math.random() * 2);
            newState[i][j] = random;
          }
        }
      });
    });
  };

  const changeSpeed = (event) => {
    setSpeed(event.target.value);
  };

  const changeRow = (event) => {
    clearBoard();
    setRows(event.target.value);
    setGrid(() => {
      return newBoard();
    });
  };

  const changeColumn = (event) => {
    setColumns(event.target.value);
    setGrid(() => {
      return newBoard();
    });
    console.log();
  };

  return (
    <div className="board">
      <div>{`Current Generation: ${gen}`}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${rows}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((columns, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newBoard = produce(grid, (newGrid) => {
                  newGrid[i][j] = grid[i][j] ? 0 : 1;
                });
                if (!running) {
                  setGrid(newBoard);
                }
              }}
              style={{
                height: 18,
                width: 18,
                background: grid[i][j] ? "green" : "black",
                border: grid[i][j] ? "solid 1px black" : "solid 1px green",
              }}
            />
          ))
        )}
      </div>
      <button
        onClick={() => {
          if (!running) {
            isRunning.current = true;
            setRunning(true);
            runGame();
            console.log(running);
          }
        }}
      >
        Run
      </button>
      <button
        onClick={() => {
          if (running) {
            isRunning.current = false;
            setRunning(false);
          }
        }}
      >
        Pause
      </button>
      <button onClick={stepGame}>One Generation</button>
      <button onClick={randomize}>Random</button>
      <button onClick={clearBoard}>Clear</button>
      <br />
      <span>Speed (multiples of 100): </span>
      <input onChange={changeSpeed} value={speed} />
      <br />
      <span>Row length: </span>
      <input onChange={changeRow} value={rows}></input>
      <br />
      <span>Column height: </span>
      <input type="number" onChange={changeColumn} value={columns}></input>
    </div>
  );
};
export default Board;
