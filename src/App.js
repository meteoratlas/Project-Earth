import React, { Component } from "react";
import * as PIXI from "pixi.js-legacy";
import TestMenu from "./components/ui/TestMenu";
import Game from "./pixi/Game";
import Transforms from "./logic/Transforms";
import "./App.css";
import "./TransTable.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.UIRef = React.createRef();
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
            this.game.resetTable = this.sendResetTableMsg;
            this.game.toggleUI = this.toggleUIVisible;
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
    sendResetTableMsg = () => {
        this.UIRef.current.clearTable();
    };
    toggleUIVisible = () => {
        this.UIRef.current.toggleVisible();
    };
    render() {
        return (
            <div id="app-container">
                <div id="game-container">
                    <canvas ref={this.canvasRef} />
                    <TestMenu
                        ref={this.UIRef}
                        hidden={false}
                        moves={this.move}
                        rotates={this.rotate}
                        reflects={this.reflect}
                        resetTable={this.resetTable}
                    />
                </div>
            </div>
        );
    }
}

export default App;
