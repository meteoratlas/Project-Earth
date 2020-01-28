import React, { Component } from "react";
// import { ReactComponent as Arrow } from "./triangle.svg";

class TransTable extends Component {
    createTable = () => {
        let table = [];
        for (let i = 0; i < this.props.limitMove; i++) {
            table.push(
                <div className="box middle move" key={"move" + i}></div>
            );
            table.push(<div className="box detail" key={"detail" + i}></div>);
        }
        return table;
    };

    render() {
        return <div className="eachRow">{this.createTable()}</div>;
    }
}

export default TransTable;
