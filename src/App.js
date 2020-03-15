import React, { Component } from "react";
import * as PIXI from "pixi.js-legacy";
import TestMenu from "./components/ui/TestMenu";
import Game from "./pixi/Game";
import "./App.css";
import "./TransTable.css";
import Sound from "react-sound";
import AudioIcon from "./components/ui/AudioIcon";

class App extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.UIRef = React.createRef();
        this.canvas = this.canvasRef.current;
        this.app = null;
        this.game = null;
        this.width = 1024;
        this.height = 576;
        this.state = { audioStatus: Sound.status.PLAYING };
    }
    componentDidMount() {
        setTimeout(() => {
            this.canvas = this.canvasRef.current;
            this.app = new PIXI.Application({
                width: this.width,
                height: this.height,
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
    resetLevel = () => {
        this.game.resetLevel();
    };

    sendResetTableMsg = () => {
        this.UIRef.current.clearTable();
    };
    toggleUIVisible = () => {
        this.UIRef.current.toggleVisible();
    };
    audioStatus = () => {
        if (this.state.audioStatus === Sound.status.PLAYING) {
            this.setState({ audioStatus: Sound.status.PAUSED });
        } else {
            this.setState({ audioStatus: Sound.status.PLAYING });
        }
    };

    render() {
        return (
            <div id="app-container">
                {/*<Sound
          url="https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3"
          playStatus={this.state.audioStatus}
          playFromPosition={0  } //  in milliseconds
          loop={true}
          // onLoading={this.handleSongLoading}
          // onPlaying={this.handleSongPlaying}
          // onFinishedPlaying={this.handleSongFinishedPlaying}
        />*/}
                <div id="game-container">
                    <canvas ref={this.canvasRef} />
                    <TestMenu
                        ref={this.UIRef}
                        hidden={false}
                        moves={this.move}
                        rotates={this.rotate}
                        reflects={this.reflect}
                        resetLevel={this.resetLevel}
                        firstName={this.props.firstName || "Guest"}
                        lastName={this.props.lastName}
                        email={this.props.email}
                    />
                    <AudioIcon
                        className="audio icon"
                        id="idSoundOn"
                        alt="Sound On"
                        toggle={this.audioStatus}
                    />
                </div>
            </div>
        );
    }
}

export default App;
