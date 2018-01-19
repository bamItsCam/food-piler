import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IngredientTag from './IngredientTag.js';

import { withTracker } from 'meteor/react-meteor-data';
import { Ingredients } from '../api/ingredients.js';



// App component - represents the whole app
class IngredientManager extends Component {

	renderIngredients() {
		return this.props.ingredients.map((ingredient) => (
			<IngredientTag 
				key={ingredient._id}
				ingredient={ingredient}
			/>
		));
	}

	addNewBlankIngredient() {
		Ingredients.insert({
			ingrName: '',
			ingrDesc: '',
			ingrSpicy: '',
			ingrSweet: '',
			ingrSalty: '',
			ingrFlex: '',
			createdAt: new Date(),
		});
		//TODO: somehow get the edit state shared between components
		// This could likely be done by adding another column to mongo called "isEditing" or something.
		// kinda clunky but can't think of another way to share state
		//IngredientTag.setState({
  		//	editingId: Ingredients.findOne({}, {sort: {DateTime: -1, limit: 1}}),
    	//});
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>Pile</h1>
				</header>
				<button onClick={this.addNewBlankIngredient.bind(this)}>Add New</button>

				<table className="ingredients-table">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Description</th>
							<th>Spicy</th>
							<th>Sweet</th>
							<th>Salty</th>
							<th>Flexibility</th>
							<th></th>
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
		ingredients: Ingredients.find({}, { sort: { createdAt: -1 } }).fetch(),
	};
})(IngredientManager);
