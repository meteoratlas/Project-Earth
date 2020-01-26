import React, { Component } from "react";
import {ReactComponent as Arrow} from "./triangle.svg";
import OptionComp from "./selectOpt.js"

class TestMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // <div id="sidebar" className={this.props.hidden ? "hidden" : ""}>
      <div id="sidebar" className="sidebar">
        <h3>Translate</h3>

        {/* display arrows, changed direction in ccs */}
        <div className="icon-group">
        <Arrow className="icon" id="idArrowUp" alt="Move Up" onClick={this.props.moveUp}/>
        <div className="icon-grip">
          <Arrow className="icon" id="idArrowLeft" alt="Move Left" onClick={this.props.moveLeft}/>
          <select className="custom-select custom-select-lg">
            <OptionComp />
          </select>
          <Arrow className="icon" id="idArrowRight" alt="Move Right" onClick={this.props.moveRight}/>
        </div>
        <Arrow className="icon" id="idArrowDown" alt="Move Down" onClick={this.props.moveDown}/>
      </div>
        {/* <button className="btn btn-primary" onClick={this.props.moveUp}>
          Up
        </button>

        <button className="btn btn-primary" onClick={this.props.moveDown}>
          Down
        </button>
        <button className="btn btn-primary" onClick={this.props.moveLeft}>
          Left
        </button>

        <button className="btn btn-primary" onClick={this.props.moveRight}>
          Right
        </button> */}

        
        <h3>Rotate</h3>
        <button className="btn btn-primary" onClick={this.props.rotL}>
          90 Left
        </button>
        <button className="btn btn-primary" onClick={this.props.rotR}>
          90 Right
        </button>
        <h3>Reflect</h3>
        <button className="btn btn-primary" onClick={this.props.reflectX}>
          Vertical
        </button>
        <button className="btn btn-primary" onClick={this.props.reflectY}>
          Horizontal
        </button>
      </div>
      
    );
  }
}

export default TestMenu;
