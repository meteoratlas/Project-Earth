import React, { Component } from "react";

class TestMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="sidebar" className={this.props.hidden ? "hidden" : ""}>
                <h3>Translate</h3>
                <button onClick={this.props.moveUp}>Up</button>
                <button onClick={this.props.moveDown}>Down</button>
                <button onClick={this.props.moveLeft}>Left</button>
                <button onClick={this.props.moveRight}>Right</button>
                <h3>Rotate</h3>
                <button onClick={this.props.rotL}>90 Left</button>
                <button onClick={this.props.rotR}>90 Right</button>
                <h3>Reflect</h3>
                <button onClick={this.props.reflectX}>Vertical</button>
                <button onClick={this.props.reflectY}>Horizontal</button>
            </div>
        );
    }
}

export default TestMenu;
