import React, { useState } from "react"
import produce from "immer"
import "./game.css"

const rows = 25
const collumns = 25


const possibleNeighbors = [[0, 1], [1, 1], [1, 0], [-1, 1], [0, -1], [-1, -1], [-1, 0], [1, -1]]



const Game = () => {
    const [running, setRunning] = useState(false)
    const [gen, setGen] = useState(0)



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
    }




    console.log(grid)

    return (<div>
        <div className="board">{grid.map((rows, i) =>
            rows.map((cols, j) =>
                <div key={`${i}-${j}`}
                    onClick={() => {
                        const newBoard = produce(grid, newGrid => {
                            newGrid[i][j] = grid[i][j] ? 0 : 1
                        })
                        if (!running) { setGrid(newBoard) }
                        console.log(newBoard)
                    }}
                    style={{ height: 20, width: 20, background: grid[i][j] ? 'black' : 'green', border: grid[i][j] ? 'solid 1px green' : 'solid 1px black' }} />
            )
        )}</div>
        <button onClick = {stepGame}>step 1 gen</button>
    </div>
    )
}
export default Game