import React, { Component } from "react";
import { ReactComponent as Arrow } from "./triangle.svg";
import OptionComp from "./selectOpt.js";
import { ReactComponent as RotateRight } from "./redo.svg";
import { ReactComponent as RotateLeft } from "./undo.svg";
import { ReactComponent as Reflect } from "./reflect.svg";
import TransTable from "./TransTable";

class TestMenu extends Component {
    constructor(props) {
        super(props);
        this.limitMove = 5;
        this.nextAvailIndex = 0; //Next available index of transTable
        this.commands = [];
        this.state = {
            hidden: true
        };
    }

    timeout = ms => {
        console.log("timeout loop");
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    sendInput = async e => {
        for (const each of this.commands) {
            if (each.command === "idArrowUp") this.props.moves(0, each.amount);
            if (each.command === "idArrowDown")
                this.props.moves(0, -each.amount);
            if (each.command === "idArrowLeft")
                this.props.moves(-each.amount, 0);
            if (each.command === "idArrowRight")
                this.props.moves(each.amount, 0);
            if (each.command === "idRotateRight") this.props.rotates(90, 0, 0);
            if (each.command === "idRotateLeft") this.props.rotates(-90, 0, 0);
            if (each.command === "idReflectY") this.props.reflects(1, 0, 0);
            if (each.command === "idReflectX") this.props.reflects(0, 1, 0);
            await this.timeout(800);
        }
    };

    addToTable = e => {
        let command, detail;

        if (e.target.id === "") return;

        // if table is full
        if (this.nextAvailIndex === this.limitMove)
            return alert("Cannot add more moves to the table.");

        // if table still have row available
        if (this.nextAvailIndex < this.limitMove) {
            // store the command in array
            this.commands.push({
                command: e.target.id,
                amount: Number(this.unitsMove.value)
            });

            detail = this.unitsMove.value + " position(s)";
            if (e.target.id === "idArrowUp") command = "Move Up";
            if (e.target.id === "idArrowDown") command = "Move Down";
            if (e.target.id === "idArrowLeft") command = "Move Left";
            if (e.target.id === "idArrowRight") command = "Move Right";

            if (e.target.id === "idRotateRight") {
                command = "Rotate Right";
                detail = "90 degrees";
            }

            if (e.target.id === "idRotateLeft") {
                command = "Rotate Left";
                detail = "90 degrees";
            }

            if (e.target.id === "idReflectY") {
                command = "Reflection";
                detail = "Y Axis";
            }

            if (e.target.id === "idReflectX") {
                command = "Reflection";
                detail = "X Axis";
            }

            document.getElementsByClassName("move")[
                this.nextAvailIndex
            ].textContent = command;
            document.getElementsByClassName("detail")[
                this.nextAvailIndex
            ].textContent = detail;

            this.nextAvailIndex++;
        }
    };

    toggleVisible = () => {
        console.log("toggle");
        this.setState(prev => ({
            hidden: !prev.hidden
        }));
    };

    clearTable = () => {
        for (let i = 0; i < this.limitMove; i++) {
            document.getElementsByClassName("move")[i].textContent = "";
            document.getElementsByClassName("detail")[i].textContent = "";
        }

        //reset variable
        this.commands = [];
        this.nextAvailIndex = 0;
    };

    render() {
        return (
            // <div id="sidebar" className={this.props.hidden ? "hidden" : ""}>
            <div id="sidebar" className={this.state.hidden ? "hidden" : "show"}>
                {/* display arrows, changed direction in ccs */}
                <div className="icon-group">
                    <div className="icon-grid">
                        <RotateRight
                            className="icon"
                            id="idRotateRight"
                            alt="Rotate Right"
                            // onClick={this.sendInput}
                            onClick={this.addToTable}
                        />
                        <Arrow
                            className="icon"
                            id="idArrowUp"
                            alt="Move Up"
                            onClick={this.addToTable}
                        />
                        <RotateLeft
                            className="icon"
                            id="idRotateLeft"
                            alt="Rotate Left"
                            onClick={this.addToTable}
                        />
                    </div>
                    <div className="icon-grid">
                        <Arrow
                            className="icon"
                            id="idArrowLeft"
                            alt="Move Left"
                            onClick={this.addToTable}
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
                            onClick={this.addToTable}
                        />
                    </div>
                    <div className="icon-grid">
                        <Reflect
                            className="icon"
                            id="idReflectY"
                            alt="Reflect Y"
                            onClick={this.addToTable}
                        />
                        <Arrow
                            className="icon"
                            id="idArrowDown"
                            alt="Move Down"
                            onClick={this.addToTable}
                        />
                        <Reflect
                            className="icon"
                            id="idReflectX"
                            alt="Reflect X"
                            onClick={this.addToTable}
                        />
                    </div>
                </div>

                {/* Transformation Sheet */}
                <div className="transTable">
                    <div className="wrapper">
                        <div className="button">
                            <button onClick={this.clearTable}>Clear</button>
                            <button onClick={this.sendInput}>Play All</button>
                        </div>
                        <div className="header">
                            <div className="middle">Move</div>
                            <div className="middle">Details</div>
                        </div>
                        <TransTable limitMove={this.limitMove} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TestMenu;
