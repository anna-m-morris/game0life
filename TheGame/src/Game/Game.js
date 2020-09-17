import React from "react";
import "./game.css"

const CELLSIZE = 20
const HEIGHT = 600
const WIDTH = 800

class Game extends React.Component {
    constructor() {
        super()
        this.rows = HEIGHT / CELLSIZE
        this.columns = WIDTH / CELLSIZE
        console.log(this.rows, this.columns)
    }

    render() {

        return (

            <div className="board" style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELLSIZE}px ${CELLSIZE}px` }}>

            </div>
        )
    }
}

export default Game