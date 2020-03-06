import React, { Component } from "react";
// import ReactDOM from "react-dom";
export default class Report extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button onClick={this.props.printReport} style={{ margin: '10px 5px' }}>Print report</button> 
                <button onClick={this.props.closeWindow} style={{ margin: '10px 5px' }}>Close</button>

                <h1>Hello</h1>
                Welcome printReport
            </div>
        );
    }
}