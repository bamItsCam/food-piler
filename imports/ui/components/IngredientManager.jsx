import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


import { Ingredients } from '../../api/ingredients.jsx';
import Account from './Account.jsx'
import IngredientTag from './IngredientTag.jsx';
import DietFilters from './DietFilters.jsx';

// App component - represents the whole app
class IngredientManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dietFilters : null
      };
  }

	render() {
		return (
			<div className="container">
				<header>
					<h1>Admin</h1>
				</header>
				<Account/>
				<DietFilters callbackFromParent={this.dietFiltersCallback}/>
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

  dietFiltersCallback = (stateFromChild) => {
        this.setState({ dietFilters: stateFromChild });
  }

	isFiltered(ingredient) {
		return ((this.state.dietFilters.gfCheck && ingredient.isGF) ||
				(this.state.dietFilters.dfCheck && ingredient.isDF) ||
				(this.state.dietFilters.efCheck && ingredient.isEF) ||
				(this.state.dietFilters.veganCheck && ingredient.isVegan) ||
				(this.state.dietFilters.veggieCheck && ingredient.isVege) ||
				(this.state.dietFilters.fishCheck && ingredient.isPesc)) ||
				(!this.state.dietFilters.gfCheck && !this.state.dietFilters.dfCheck &&
          !this.state.dietFilters.efCheck && !this.state.dietFilters.veganCheck &&
          !this.state.dietFilters.veggieCheck && !this.state.dietFilters.fishCheck);
	}

	renderIngredients() {
		return this.props.ingredients.
			filter(i => this.isFiltered(i)).
			map((ingredient) => (
			<IngredientTag 
				key={ingredient._id}
				ingredient={ingredient}
			/>));
	}

	addNewBlankIngredient() {
		Meteor.call('ingredients.addNewBlankIngredient');
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
	Meteor.subscribe('ingredients');
	return {
		ingredients: Ingredients.find({}, { sort: { createdAt: -1 } }).fetch(),
		currentUser: Meteor.user(),
	};
})(IngredientManager);
