import React, { Component } from "react";
import * as PIXI from "pixi.js-legacy";
import TestMenu from "./components/ui/TestMenu";
import Game from "./pixi/Game";
import Transforms from "./logic/Transforms";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.canvas = this.canvasRef.current;
        this.app = undefined;
        this.game = undefined;
        this.state = {};
    }
    componentDidMount() {
        setTimeout(() => {
            this.canvas = this.canvasRef.current;
            this.app = new PIXI.Application({
                width: 1024,
                height: 576,
                backgroundColor: 0x1099bb,
                view: this.canvas,
                resolution: window.devicePixelRatio || 1
            });
            this.game = new Game(this.app);
            this.game.start();
        }, 5);
    }
    move = (x, y) => {
        this.game.translate(x, y);
    };
    rotate = (a, oX, oY) => {
        this.game.rotate(a, oX, oY);
    };
    reflect = (a, b, c) => {
        this.game.reflect(a, b, c);
    };
    render() {
        return (
            <div id="app-container">
                <h3>Transformation Game</h3>
                <div id="game-container">
                    <canvas ref={this.canvasRef} />
                    <TestMenu
                        hidden={false}
                        moveUp={() => this.move(0, -1)}
                        moveDown={() => this.move(0, 1)}
                        moveLeft={() => this.move(-1, 0)}
                        moveRight={() => this.move(1, 0)}
                        rotL={() => this.rotate(-90, 0, 0)}
                        rotR={() => this.rotate(90, 0, 0)}
                        reflectX={() => this.reflect(0, 1, 0)}
                        reflectY={() => this.reflect(1, 0, 0)}
                    />
                </div>
            </div>
        );
    }
}

export default App;
