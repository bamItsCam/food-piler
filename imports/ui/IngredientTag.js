import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Ingredients } from '../api/ingredients.js';

export default class IngredientTag extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editingId: null,
		};
	}

	render() {
		return this.renderOrEditField( this.props.ingredient );
	}

	renderOrEditField( ingredient ) {
		if( this.state.editingId === ingredient._id) {
			// if this is the row we should be editing, then return the input boxes
			console.log("editing!");

			return (
				<tr>
					<td><button onClick={this.cancelEdit.bind(this)}>Cancel</button></td>
					<td><input type="text" onKeyDown={this.handleEditSubmit.bind(this)} ref="ingrNameInline" defaultValue={ingredient.ingrName}/></td>
					<td><input type="text" onKeyDown={this.handleEditSubmit.bind(this)} ref="ingrDescInline" defaultValue={ingredient.ingrDesc}/></td>
					<td><input type="text" onKeyDown={this.handleEditSubmit.bind(this)} ref="ingrSpicyInline" defaultValue={ingredient.ingrSpicy}/></td>
					<td><input type="text" onKeyDown={this.handleEditSubmit.bind(this)} ref="ingrSweetInline" defaultValue={ingredient.ingrSweet}/></td>
					<td><input type="text" onKeyDown={this.handleEditSubmit.bind(this)} ref="ingrSaltyInline" defaultValue={ingredient.ingrSalty}/></td>
					<td><input type="text" onKeyDown={this.handleEditSubmit.bind(this)} ref="ingrFlexInline" defaultValue={ingredient.ingrFlex}/></td>
					<td><button onClick={this.deleteIngr.bind(this)}>Delete</button></td>
				</tr>
			);
		}
		else {
			// simply render the table row
			return (
				<tr>
					<td><button onClick={this.editIngr.bind(this, ingredient._id )}>Edit</button></td>
					<td>{ingredient.ingrName}</td>
					<td>{ingredient.ingrDesc}</td>
					<td>{ingredient.ingrSpicy}</td>
					<td>{ingredient.ingrSweet}</td>
					<td>{ingredient.ingrSalty}</td>
					<td>{ingredient.ingrFlex}</td>
					<td><button onClick={this.deleteIngr.bind(this)}>Delete</button></td>
				</tr>
			);
		}
	}

	handleEditSubmit(event) {
		if( event.keyCode === 13 ) {
			const ingrName = ReactDOM.findDOMNode(this.refs.ingrNameInline).value.trim();
			const ingrDesc = ReactDOM.findDOMNode(this.refs.ingrDescInline).value.trim();
			const ingrSpicy = ReactDOM.findDOMNode(this.refs.ingrSpicyInline).value.trim();
			const ingrSweet = ReactDOM.findDOMNode(this.refs.ingrSweetInline).value.trim();
			const ingrSalty = ReactDOM.findDOMNode(this.refs.ingrSaltyInline).value.trim();
			const ingrFlex = ReactDOM.findDOMNode(this.refs.ingrFlexInline).value.trim();

			Ingredients.update(this.state.editingId, {
				$set: {
					ingrName: ingrName,
					ingrDesc: ingrDesc,
					ingrSpicy: ingrSpicy,
					ingrSweet: ingrSweet,
					ingrSalty: ingrSalty,
					ingrFlex: ingrFlex,
				}
			});

			this.setState({
				editingId: null,
			});
		}
	}

	deleteIngr() {
		Ingredients.remove(this.props.ingredient._id);
	}

	editIngr( ingredientId ) {
		// ????? https://themeteorchef.com/tutorials/click-to-edit-fields-in-react
		this.setState({
			editingId: ingredientId,
		});
	}

	cancelEdit() {
		this.setState({
			editingId: null,
		});
	}
}
