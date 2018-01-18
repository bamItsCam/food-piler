import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IngredientTag from './IngredientTag.js';

import { withTracker } from 'meteor/react-meteor-data';
import { Ingredients } from '../api/ingredients.js';



// App component - represents the whole app
class IngredientManager extends Component {
	handleSubmit(event) {
		event.preventDefault();

		//const ingredientForm = ReactDOM.finDOMNode(this.refs.ingredientForm);
		//const ingName = ingredientForm.findDOMNode(this.refs.ingName).value.trim();
		const ingrName = ReactDOM.findDOMNode(this.refs.ingrName).value.trim();
		const ingrDesc = ReactDOM.findDOMNode(this.refs.ingrDesc).value.trim();
		const ingrSpicy = ReactDOM.findDOMNode(this.refs.ingrSpicy).value.trim();
		const ingrSweet = ReactDOM.findDOMNode(this.refs.ingrSweet).value.trim();
		const ingrSalty = ReactDOM.findDOMNode(this.refs.ingrSalty).value.trim();
		const ingrFlex = ReactDOM.findDOMNode(this.refs.ingrFlex).value.trim();

		Ingredients.insert({
			ingrName,
			ingrDesc,
			ingrSpicy,
			ingrSweet,
			ingrSalty,
			ingrFlex,
			createdAt: new Date(),
		});

		// Clear the form
		ReactDOM.findDOMNode(this.refs.ingrName).value = '';
		ReactDOM.findDOMNode(this.refs.ingrDesc).value = '';
		ReactDOM.findDOMNode(this.refs.ingrSpicy).value = '';
		ReactDOM.findDOMNode(this.refs.ingrSweet).value = '';
		ReactDOM.findDOMNode(this.refs.ingrSalty).value = '';
		ReactDOM.findDOMNode(this.refs.ingrFlex).value = '';
	}

	renderIngredients() {
		return this.props.ingredients.map((ingredient) => (
			<IngredientTag 
				key={ingredient._id}
				ingredient={ingredient}
			/>
		));
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>Pile</h1>
				</header>
				<form ref="ingredientForm" className="new-ingredient" onSubmit={this.handleSubmit.bind(this)}>
					<input type="text" ref="ingrName" placeholder="name of new ingredient"/>
					<input type="text" ref="ingrDesc" placeholder="this is a description!" />
					<input type="text" ref="ingrSpicy" placeholder="Spicyness (1-10)" />
					<input type="text" ref="ingrSweet" placeholder="Sweetness (1-10)" />
					<input type="text" ref="ingrSalty" placeholder="Saltiness (1-10)" />
					<input type="text" ref="ingrFlex" placeholder="Flexibility (1-10)" />
					<input name="Add" type="submit" value="Add" />
				</form>

				<table className="ingredients-table">
					<thead>
						<tr>
							<th>Delete</th>
							<th>Edit</th>
							<th>Name</th>
							<th>Description</th>
							<th>Spicy</th>
							<th>Sweet</th>
							<th>Salty</th>
							<th>Flexibility</th>
						</tr>
					</thead>
					<tbody>
						{this.renderIngredients()}
					</tbody>
				</table>
			</div>
			);
	}

}

export default withTracker(() => {
	return {
		ingredients: Ingredients.find({}).fetch(),
	};
})(IngredientManager);