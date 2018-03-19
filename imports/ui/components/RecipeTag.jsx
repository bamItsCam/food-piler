import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
 
export default class RecipeTag extends Component {
	
	render() {
		return this.renderRecipeTile();
	}
	
	renderRecipeTile() {
		return (
			<div className="tile is-parent">
				<div className="tile is-child"><span className="has-text-grey"><b>{this.props.ingredient.ingrName}:</b> {this.props.ingredient.ingrDesc}</span></div>
			</div>
		);
	}
}