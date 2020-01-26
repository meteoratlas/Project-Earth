import React, { Component } from "react";

export default class OptionComp extends Component {
	render() {
		// populates arrays of values for the options
		let num = [];
		for (let i = 0; i <= 10; i++) {
			num.push(i);
		}	
		
		return (
			// create the options in the array num above
			num.map((value, index) => (
			<option className="input" key={value}>
				{value}
			</option>
			))
			
		);
	}
}