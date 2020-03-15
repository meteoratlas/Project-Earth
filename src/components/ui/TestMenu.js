import React, { Component } from "react";
import { ReactComponent as Arrow } from "./triangle.svg";
import OptionComp from "./selectOpt.js";
import { ReactComponent as RotateRight } from "./redo.svg";
import { ReactComponent as RotateLeft } from "./undo.svg";
import { ReactComponent as Reflect } from "./reflect.svg";
import TransTable from "./TransTable";
import ReactTooltip from "react-tooltip";
import ReactDOM from "react-dom";
import Report from "./Report.js";
import { User, DataServer } from "../../fetch/DataServer";

class TestMenu extends Component {
    constructor(props) {
        super(props);
        this.limitMove = 5;
        this.nextAvailIndex = 0; //Next available index of transTable
        this.commands = [];
        this.modalWindow = null; // for report
        this.state = {
            hidden: true
        };

        // this.data = '';
        this.fetchData = "";
        this.dataserver = new DataServer();
        this.password = "123";
        this.newCountKey = 0;

        this.authEmail = "vanee7@hotmail.com";
        this.user1 = new User(
            1,
            "New Pitsini",
            "vanee7@hotmail.com",
            3,
            [
                { command: "idArrowRight", amount: 1 },
                { command: "idArrowUp", amount: 1 }
            ],
            "03/03/2020, 01:01:32 PM"
        );
        this.user2 = new User(
            2,
            "New Pitsini",
            "vanee7@hotmail.com",
            3,
            [
                { command: "idArrowRight", amount: 1 },
                { command: "idArrowUp", amount: 1 }
            ],
            "07/01/2020, 01:09:26 AM"
        );
        this.user3 = new User(
            3,
            "Justin Cook",
            "justin.cook@gmail.com",
            1,
            [
                { command: "idArrowLeft", amount: 4 },
                { command: "idArrowUp", amount: 2 }
            ],
            "07/01/2020, 01:09:26 AM"
        );
    }

    timeout = ms => {
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
        this.setState(prev => ({
            hidden: !prev.hidden
        }));
    };

    clearTable = () => {
        for (let i = 0; i < this.limitMove; i++) {
            document.getElementsByClassName("move")[i].textContent = "";
            document.getElementsByClassName("detail")[i].textContent = "";
        }

        // this.props.resetLevel();
        this.toggleVisible();

        //reset variable
        this.commands = [];
        this.nextAvailIndex = 0;
    };

    onClickReport = () => {
        this.openWindow();
    };

    openWindow = () => {
        if (this.modalWindow && !this.modalWindow.closed) {
            // if report window already exist
            this.modalWindow.focus();
        } else {
            // Open report window
            const modalTitle = "PrintingReport";
            this.modalWindow = window.open("about:blank", modalTitle);
            let root = this.modalWindow.document.body;
            ReactDOM.render(
                <Report
                    closeWindow={this.closeWindow}
                    printReport={this.printReport}
                />,
                root
            );
        }
    };

    closeWindow = () => {
        if (this.modalWindow) {
            this.modalWindow.close();
            this.modalWindow = null;
        }
    };

    printReport = () => {
        this.modalWindow.print();
    };

    render() {
        return (
            <div id="sidebar" className={this.state.hidden ? "hidden" : "show"}>
                {/* <div id="serverMsg">hi</div> */}
                <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                    Welcome, {this.props.firstName} {this.props.lastName}
                    {/* <Facebook /> */}
                    {/* <button style={{ width: "20%" }} className="middle" onClick={this.onClick}>Log In</button> */}
                    <button
                        style={{
                            width: "20%",
                            top: "10px",
                            right: "10px",
                            position: "absolute"
                        }}
                        className="middle"
                        onClick={this.onClickReport}
                    >
                        Log Out
                    </button>
                </div>
                {/* display arrows, changed direction in ccs */}
                <div className="icon-group">
                    <div className="icon-grid">
                        <ReactTooltip />
                        <RotateRight
                            className="icon"
                            id="idRotateRight"
                            alt="Rotate Right"
                            data-tip="Rotate 90 degrees right"
                            onClick={this.addToTable}
                        />
                        <Arrow
                            className="icon"
                            id="idArrowUp"
                            alt="Move Up"
                            data-tip="Translate X units up"
                            onClick={this.addToTable}
                        />
                        <RotateLeft
                            className="icon"
                            id="idRotateLeft"
                            alt="Rotate Left"
                            data-tip="Rotate 90 degrees left"
                            onClick={this.addToTable}
                        />
                    </div>
                    <div className="icon-grid">
                        <Arrow
                            className="icon"
                            id="idArrowLeft"
                            alt="Move Left"
                            data-tip="Translate X units left"
                            onClick={this.addToTable}
                        />
                        <select
                            className="custom-select custom-select-lg"
                            ref={input => {
                                this.unitsMove = input;
                            }}
                            data-tip="Select units to translate by"
                        >
                            <OptionComp />
                        </select>
                        <Arrow
                            className="icon"
                            id="idArrowRight"
                            alt="Move Right"
                            data-tip="Translate X units right"
                            onClick={this.addToTable}
                        />
                    </div>
                    <div className="icon-grid">
                        <Reflect
                            className="icon"
                            id="idReflectY"
                            alt="Reflect Y"
                            data-tip="Reflect across Y axis"
                            onClick={this.addToTable}
                        />
                        <Arrow
                            className="icon"
                            id="idArrowDown"
                            alt="Move Down"
                            data-tip="Translate X units down"
                            onClick={this.addToTable}
                        />
                        <Reflect
                            className="icon"
                            id="idReflectX"
                            alt="Reflect X"
                            data-tip="Reflect across X axis"
                            onClick={this.addToTable}
                        />
                    </div>
                </div>

                {/* Transformation Sheet */}
                <div className="transTable">
                    <div className="wrapper1">
                        <div className="button">
                            <button onClick={this.props.resetLevel}>
                                Reset
                            </button>
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
