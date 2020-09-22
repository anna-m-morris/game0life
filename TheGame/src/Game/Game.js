import React, { useState } from 'react';
import "./game.css"

const xAxis = 25 //rows
const yAxis = 25 //collumns

class Cell {
    constructor(x, y) {
        this.location = [x, y]
        this.neighbors = {
            north: [x + 1, y],
            northEast: [x + 1, y + 1],
            east: [x, y + 1],
            southEast: [x - 1, y + 1],
            south: [x - 1, y],
            southWest: [x - 1, y - 1],
            west: [x, y - 1],
            northWest: [x + 1, y - 1]
        }
        this.isAlive = false
    }
}

const Game = () => {
    const [board, setBoard] = useState(() => {
        const cells = []
        for (let x = 0; x < xAxis; x++) {
            for (let y = 0; y < yAxis; y++) {
                cells.push(new Cell(x, y))
            }
        }
        return (cells)
    })

    console.log(board)
    return (
        <div className="board">{board.map(cell => {
            return (<CellDiv
                key={cell.location}
                cell={cell} />)
        })}</div>
    )
}

const CellDiv = (props) => {
    const [state, setState] = useState(false)
    return (
        <div className={state ? "alive" : "dead"}
            onClick={() => {
                props.cell.isAlive = !props.cell.isAlive
                setState(!state)
            }}></div>
    )
}

export default Game