import React, { useState } from 'react';
import "./game.css"

const xAxis = 25 //rows
const yAxis = 25 //collumns

class Cell {
    constructor(x, y) {
        this.location = [x, y]
        this.neighbors = [
            this.north = [x + 1, y],
            this.northEast = [x + 1, y + 1],
            this.east = [x, y + 1],
            this.southEast = [x - 1, y + 1],
            this.south = [x - 1, y],
            this.southWest = [x - 1, y - 1],
            this.west = [x, y - 1],
            this.northWest = [x + 1, y - 1]
        ]
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

    const findByLocation = (board, location) => {
        let result = {}
        board.forEach(cell => {
            if (location[0] === cell.location[0] && location[1] === cell.location[1]) {
                result = cell
            }
        })
        return result
    }


    console.log(board)
    return (<div>
        <div className="board">{board.map(cell => {
            return (<CellDiv
                key={cell.location}
                cell={cell}
                board={board} />)
        })}
        </div>
        <button
            onClick={() => {
                let newBoard = board.map((cell) => {
                    let liveOnes = 0
                    cell.neighbors.forEach((neighbor) => {
                        let current = findByLocation(board, neighbor)
                        if (current.isAlive === true) {
                            liveOnes++
                            console.log(liveOnes)
                        }
                    })
                    if(liveOnes===2||liveOnes===3){cell.isAlive=true}
                    else if (liveOnes<2||liveOnes>3){cell.isAlive=false}
                    return cell
                })
                setBoard(newBoard)
            }}>Run</button>
        <button>Stop</button>
    </div>
    )
}

const CellDiv = (props) => {
    const [state, setState] = useState(false)
    props.cell.isAlive=state
    return (
        <div className={state ? "alive" : "dead"}
            onClick={() => {
                setState(!state)
                console.log(props.cell)
            }}></div>
    )
}

export default Game