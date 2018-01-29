import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import IngredientTag from './IngredientTag.js';
import { Ingredients } from '../../api/ingredients.js';
import Account from './Account.jsx'




// App component - represents the whole app
class IngredientManager extends Component {
	render() {
		return (
			<div className="container">
				<header>
					<h1>Admin</h1>
				</header>
				<Account/>
				<table className="table is-hoverable">
					<thead>
						{this.renderTableHeadFoot(true)}
					</thead>
					<tbody>
						{this.renderIngredients()}
					</tbody>
					<tfoot>
						{this.renderTableHeadFoot(false)}
					</tfoot>
				</table>
			</div>
		);
	}

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
			isBase: false,
			isFiller: false,
			isTopping: false,
			isVege: false,
			isVegan: false,
			isGF: false,
			editing: true,
			ownerId: Meteor.userId(),
			username: Meteor.user().username,
			createdAt: new Date(),
		});
	}

	renderAddButton() {
		return (
			<a className="button is-success" onClick={this.addNewBlankIngredient.bind(this)}>
				<span className="icon is-small">
					<i className="fas fa-plus"></i>
				</span>
			</a>
		)
	}

	renderTableHeadFoot(isHead) {
		return (
			<tr>
				<th className="table-two-buttons">{(isHead) ? this.renderAddButton() : ''}</th>
				<th className="table-name">Name</th>
				<th className="table-desc">Description</th>
				<th className="table-number">Spicy</th>
				<th className="table-number">Sweet</th>
				<th className="table-number">Salty</th>
				<th className="table-number"><abbr title="Flexibility">Flex</abbr></th>
				<th className="table-bool">Base</th>
				<th className="table-bool"><abbr title="Filler">Fill</abbr></th>
				<th className="table-bool"><abbr title="Topping">Top</abbr></th>
				<th className="table-bool"><abbr title="Vegetarian">Vege</abbr></th>
				<th className="table-bool"><abbr title="Vegan">Veg</abbr></th>
				<th className="table-bool"><abbr title="Gluten Free">GF</abbr></th>
				<th className="table-one-button"></th>
			</tr>
			)
	}
}

export default withTracker(() => {
	return {
		ingredients: Ingredients.find({}, { sort: { createdAt: -1 } }).fetch(),
		currentUser: Meteor.user(),
	};
})(IngredientManager);
