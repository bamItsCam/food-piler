import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import IngredientTag from './IngredientTag.js';
import { Ingredients } from '../../api/ingredients.js';
import Account from './Account.jsx'

// App component - represents the whole app
class IngredientManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gfCheck: false,
			dfCheck: false,
			efCheck: false,
			veganCheck: false,
			veggieCheck: false,
			fishCheck: false,
		};
	}

	toggleCheck(varName) {
		const current_state = this.state[varName];
		this.setState({[varName] : !current_state});
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>Admin</h1>
				</header>
				<Account/>
				<div className="box">
					<div className="columns is-centered">
						<div className="tags">
							<div className={this.state.gfCheck ? "tag is-medium is-primary" : "tag is-medium is-light"}>
								<input type="checkbox" ref="BadGluten" onClick={this.toggleCheck.bind(this,'gfCheck')}></input>
								<p>Gluten-free</p>
							</div>
							<div className={this.state.dfGrey ? "tag is-medium is-primary" : "tag is-medium is-light"}>
								<input type="checkbox" ref="BadDairy" onClick={this.toggleCheck.bind(this,'dfCheck')}></input>
								<p>Dairy-free</p>
							</div>
							<div className={this.state.efGrey ? "tag is-medium is-primary" : "tag is-medium is-light"}>
								<input type="checkbox" ref="BadEgg" onClick={this.toggleCheck.bind(this,'efCheck')}></input>
								<p>Egg-free</p>
							</div>
							<div className={this.state.veganGrey ? "tag is-medium is-primary" : "tag is-medium is-light"}>
								<input type="checkbox" ref="SuperVeggie" onClick={this.toggleCheck.bind(this,'veganCheck')}></input>
								<p>Vegan</p>
							</div>
							<div className={this.state.veggieGrey ? "tag is-medium is-primary" : "tag is-medium is-light"}>
								<input type="checkbox" ref="Veggie" onClick={this.toggleCheck.bind(this,'veggieCheck')}></input>
								<p>Vegetarian</p>
							</div>
							<div className={this.state.fishGrey ? "tag is-medium is-primary" : "tag is-medium is-light"}>
								<input type="checkbox" ref="Fishy" onClick={this.toggleCheck.bind(this,'fishCheck')}></input>
								<p>Pescetarian</p>
							</div>
						</div>
					</div>
				</div>
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

	isFiltered(ingredient) {
		return ((this.state.gfCheck && ingredient.isGF) ||
				(this.state.dfCheck && ingredient.isDF) ||
				(this.state.efCheck && ingredient.isEF) ||
				(this.state.veganCheck && ingredient.isVegan) ||
				(this.state.veggieCheck && ingredient.isVege) ||
				(this.state.fishCheck && ingredient.isPesc)) || (
					!this.state.gfCheck && !this.state.dfCheck && !this.state.efCheck &&
						!this.state.veganCheck && !this.state.veggieCheck && !this.state.fishCheck);
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
