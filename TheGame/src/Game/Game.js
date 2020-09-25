import React, { useState, useRef } from "react"
import produce from "immer"
import "./game.css"
const possibleNeighbors = [[0, 1], [1, 1], [1, 0], [-1, 1], [0, -1], [-1, -1], [-1, 0], [1, -1]]

const Game = () => {
    const [running, setRunning] = useState(false)
    const [gen, setGen] = useState(0)
    const [speed, setSpeed] = useState(500)
    const [rows, setRows] = useState(25)
    const [collumns, setCollumns] = useState(25)

    const isRunning = useRef()
    isRunning.current = running

    const newBoard = () => {
        var board = []
        for (let i = 0; i < rows; i++) {
            board.push(Array.from(Array(collumns), () => 0))
        }
        return board
    }
    const [grid, setGrid] = useState(() => { return newBoard() })

    const stepGame = () => {
        setGrid((state) => {
            return produce(state, newState => {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < collumns; j++) {
                        let neighbors = 0
                        possibleNeighbors.forEach(([x, y]) => {
                            const newI = i + x; const newJ = j + y
                            if (newI >= 0 && newI < rows && newJ >= 0 && newJ < collumns) { neighbors += state[newI][newJ] }
                        })
                        if (neighbors < 2 || neighbors > 3) { newState[i][j] = 0 }
                        else if (state[i][j] === 0 && neighbors === 3) { newState[i][j] = 1 }
                    }
                }
            })
        })
        setGen(gen => gen + 1)
    }

    const runGame = () => {
        if (!isRunning.current) { return }

        setGrid((state) => {
            return produce(state, newState => {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < collumns; j++) {
                        let neighbors = 0
                        possibleNeighbors.forEach(([x, y]) => {
                            const newI = i + x; const newJ = j + y
                            if (newI >= 0 && newI < rows && newJ >= 0 && newJ < collumns) { neighbors += state[newI][newJ] }
                        })
                        if (neighbors < 2 || neighbors > 3) { newState[i][j] = 0 }
                        else if (state[i][j] === 0 && neighbors === 3) { newState[i][j] = 1 }
                    }
                }
                console.log(isRunning.current)
            })
        })
        setGen(gen => gen + 1)
        setTimeout(runGame, speed)

    }

    const clearBoard = () => {
        setGrid(() => { return newBoard() })
        setGen(0)
    }

    const randomize = () => {
        clearBoard()
        setGrid((state) => {
            return produce(state, newState => {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < collumns; j++) {
                        
                        let random = Math.floor((Math.random()) * 2)
                        console.log(random)
                        if (random) { newState[i][j] = 1 }
                        else { newState[i][j] = 0 }
                    }
                }
            })
        })
    }

    const changeSpeed = (event) => {
        setSpeed(event.target.value)
    }
    const changeRow = (event) => {
        setRows(event.target.value)
        setGrid(() => { return newBoard() })
    }
    const changeCollumn = (event) => {
        setCollumns(event.target.value)
        setGrid(() => { return newBoard() })
    }



    console.log(grid)

    return (<div>
        <div>{`Current Generation: ${gen}`}</div>
        <div className="board">{grid.map((rows, i) =>
            rows.map((cols, j) =>
                <div key={`${i}-${j}`}
                    onClick={() => {
                        console.log()
                        const newBoard = produce(grid, newGrid => {
                            newGrid[i][j] = grid[i][j] ? 0 : 1
                        })
                        if (!running) { setGrid(newBoard) }
                        console.log(newBoard)
                        console.log(running)
                    }}
                    style={{ height: 20, width: 20, background: grid[i][j] ? 'green' : 'black', border: grid[i][j] ? 'solid 1px black' : 'solid 1px green' }} />
            )
        )}</div>
        <button onClick={() => {
            if (!running) {
                isRunning.current = true
                setRunning(true)
                runGame()
                console.log(running)
            }
        }}>Run</button>
        <button onClick={() => {
            if (running) {
                isRunning.current = false
                setRunning(false)
            }
        }}>Pause</button>
        <button onClick={stepGame}>One Generation</button>
        <button onClick={randomize}>Random</button>
        <button onClick={clearBoard}>Clear</button><br />
        <span>Speed (multiples of 100): </span><input onChange={changeSpeed} value={speed} /><br />
        <span>Row length: </span><input onChange={changeRow} value={rows}></input><br />
        <span>Collumn height: </span><input onChange={changeCollumn} value={collumns}></input>
    </div>
    )
}
export default Game