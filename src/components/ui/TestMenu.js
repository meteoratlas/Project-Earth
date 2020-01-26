import React, { Component } from "react";
import { ReactComponent as Arrow } from "./triangle.svg";
import OptionComp from "./selectOpt.js";
import { ReactComponent as RotateRight } from "./redo.svg";
import { ReactComponent as RotateLeft } from "./undo.svg";
import { ReactComponent as Reflect } from "./reflect.svg";

class TestMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  sendInput = e => {
    console.log("from send input");
    let unit = Number(this.unitsMove.value);
    if (e.target.id === "idArrowUp") return this.props.moves(0, unit);
    if (e.target.id === "idArrowDown") return this.props.moves(0, -unit);
    if (e.target.id === "idArrowLeft") return this.props.moves(-unit, 0);
    if (e.target.id === "idArrowRight") return this.props.moves(unit, 0);
    if (e.target.id === "idRotateRight") return this.props.rotates(90, 0, 0);
    if (e.target.id === "idRotateLeft") return this.props.rotates(-90, 0, 0);
    if (e.target.id === "idReflectY") return this.props.reflects(1, 0, 0);
    if (e.target.id === "idReflectX") return this.props.reflects(0, 1, 0);
  };

  render() {
    return (
      // <div id="sidebar" className={this.props.hidden ? "hidden" : ""}>
      <div id="sidebar" className="sidebar">
        <h3>CONTROLLERS</h3>

        {/* display arrows, changed direction in ccs */}
        <div className="icon-group">
          <div className="icon-grid">
            <RotateRight
              className="icon"
              id="idRotateRight"
              alt="Rotate Right"
              onClick={this.sendInput}
            />
            <Arrow
              className="icon"
              id="idArrowUp"
              alt="Move Up"
              onClick={this.sendInput}
            />
            <RotateLeft
              className="icon"
              id="idRotateLeft"
              alt="Rotate Left"
              onClick={this.sendInput}
            />
          </div>
          <div className="icon-grip">
            <Arrow
              className="icon"
              id="idArrowLeft"
              alt="Move Left"
              onClick={this.sendInput}
            />
            <select
              className="custom-select custom-select-lg"
              ref={input => {
                this.unitsMove = input;
              }}
            >
              <OptionComp />
            </select>
            <Arrow
              className="icon"
              id="idArrowRight"
              alt="Move Right"
              onClick={this.sendInput}
            />
          </div>
          <div className="icon-grid">
            <Reflect
              className="icon"
              id="idReflectY"
              alt="Reflect Y"
              onClick={this.sendInput}
            />
            <Arrow
              className="icon"
              id="idArrowDown"
              alt="Move Down"
              onClick={this.sendInput}
            />
            <Reflect
              className="icon"
              id="idReflectX"
              alt="Reflect X"
              onClick={this.sendInput}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TestMenu;
