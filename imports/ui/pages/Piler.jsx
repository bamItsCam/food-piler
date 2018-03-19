import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range, createSliderWithTooltip } from 'rc-slider';
import { withTracker } from 'meteor/react-meteor-data';
import 'rc-slider/assets/index.css';
import { rnorm } from 'randgen';

import { Ingredients } from '../../api/ingredients.jsx';
import RecipeTag from '../components/RecipeTag.jsx';

import DietFilters from '../components/DietFilters.jsx';
import NavBar from '../components/Nav.jsx';


const SliderWithTooltip = createSliderWithTooltip(Slider);

class Piler extends Component {
	constructor(props) {
		super(props);
		var value = 50
		this.state = {
			dietFilters : {
				gfCheck: false,
				dfCheck: false,
				efCheck: false,
				veganCheck: false,
				veggieCheck: false,
				fishCheck: false
			},
			selectedIngrs : [],
			recipeCardVisibility : "hidden",
			notifUp : false,
			notifMessage : "",
			sliderValue: value,
			sliderColor: "rgb("+Math.floor(2.55*value)+","+Math.floor(125-value)+","+Math.floor(2.55*(100-value))+")"
		};
	}

	dietFiltersCallback = (stateFromChild) => {
		this.setState({ dietFilters : stateFromChild });
	}

	render() {
		return (
			<div>
				<NavBar/>
				<div className="container has-text-centered">
					<div className="column is-10 is-offset-1">
						<h3 className="title has-text-grey">
							We have compilers for <span style={{fontFamily:'courier'}}>&lt;code&gt;</span>, why not for <span style={{color:'turquoise'}}>food</span>?
						</h3>
						<div className="box">
							<form>
								<DietFilters
									callbackFromParent={this.dietFiltersCallback}
									dietFilters={this.state.dietFilters}
								/>
								<div className="box">
									<h3 className="subtitle has-text-grey">2: Select your <b>riskiness level</b></h3>
									<div className="columns is-centered">
										<div className="column is-5" style={{paddingTop:24}}>
											<SliderWithTooltip
												tipFormatter={this.sliderTooltipGenerator}
												value={this.state.sliderValue}
												trackStyle={{backgroundColor:this.state.sliderColor,height:10}}
												//handleStyle={{backgroundColor:this.state.sliderColor,height:20,width:20}}
												onChange={this.onSliderChange}
												onAfterChange={this.onAfterChange}
											/>
										</div>					
									</div>
								</div>
								<a className="button is-block is-info is-large" onClick={this.pileIt.bind(this)}>
									Pile It!
								</a>
							</form>
						</div>
						<div>
							{this.renderNotif()}
						</div>
						<div className="box" ref="recipeBox" style={{visibility:this.state.recipeCardVisibility}}>
							<h3 className="title has-text-grey">
								Your Pile!
							</h3>
							<div className="tile is-ancestor is-vertical">
								{this.renderRecipe()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	clearNotif() {
		this.setState({ notifUp: false });
	}

	renderNotif() {
		if (this.state.notifUp) {
			return (
				<div className="notification is-danger"> 
					{this.state.notifMessage}
	  			<button onClick={this.clearNotif.bind(this)} className="delete"></button>
				</div>
				);
			}
	}

	renderRecipe() {
		return this.state.selectedIngrs.
			map((ingredient) => (
			<RecipeTag 
				key={ingredient._id}
				ingredient={ingredient}
			/>));
	}

	pileIt() {

		this.setState({ selectedIngrs : [],recipeCardVisibility: 'hidden'});
		var slider_risk = Math.floor((this.state.sliderValue/10) + 1);
		this.clearNotif();

		// Get the current states of the dietary restriction filters.
		var current_filter_states = [
			this.state.dietFilters.gfCheck,
			this.state.dietFilters.dfCheck,
			this.state.dietFilters.efCheck,
			this.state.dietFilters.veggieCheck,
			this.state.dietFilters.veganCheck,
			this.state.dietFilters.fishCheck
			];

		// Check if all filters are unchecked.
		var unfiltered = current_filter_states.every(function(f) { return f == false; });

		// Get the set of ingredients that match the min_flex and dietary restrictions.
		var available_ingredients = this.props.ingredients.filter(
			function(ingr) {
				var ingr_states = [ingr.isGF,ingr.isDF,ingr.isEF,ingr.isVeggie,ingr.isVegan,ingr.isPesc];

				return (unfiltered || current_filter_states.every((e,i)=> e === ingr_states[i] ));
			}
		);

		// Select 5 ingredients that match the criteria.
		var selected = this.selectIngredients(slider_risk,available_ingredients,5);
		this.setState({ selectedIngrs : selected,recipeCardVisibility : "visible"});
	}

	selectIngredients(slider_risk,ingrs,n) {
		var selected = new Array(n);

		// Get a "max-riskiness"
		var rand_num = Math.floor(Math.abs(rnorm(slider_risk,1)-slider_risk));

		// Get all ingredients in the database that have a riskiness less than the max riskiness
		var viably_risky_ingrs = ingrs.filter((ingr) => ingr.ingrRisk <= (slider_risk + rand_num));
		var bases = viably_risky_ingrs.filter((ingr) => ingr.isBase);

		var current_index = 0;
 
		// If there aren't enough ingredients within the riskiness range, throw an error
		if (n > viably_risky_ingrs.length) {
			this.setState({ notifUp: true, notifMessage: "Sorry. Not enough matching ingredients in the database! :("});
			throw new RangeError(this.state.notifMessage);
			}

		// First, choose a base if riskiness isn't too high
		if (slider_risk <= 5 && bases.length > 0) {
			var ind = Math.floor(Math.random() * (bases.length-1));
			selected[0] = bases[ind];
			current_index++;
		}

		// Next, select the other ingredients
		while(current_index < n) {
			var ind = Math.floor(Math.random() * (viably_risky_ingrs.length-1));

			while(selected.includes(viably_risky_ingrs[ind])) {
				ind = Math.floor(Math.random() * (viably_risky_ingrs.length-1));
				console.log(ind);
			}

			selected[current_index] = viably_risky_ingrs[ind];

			current_index++;
		}

		return selected;
	}

	sliderTooltipGenerator(value) {
		if (value < 20) return "Playin it safe";
		else if (value < 40) return "Ok ok ok";
		else if (value < 60) return "Whoa there";
		else if (value < 80) return "Gettin frisky";
		else return "That's pretty risky";
	}

	onSliderChange = (value) => {
		var colVal = "rgb("+Math.floor(2.55*value)+","+Math.floor(125-value)+","+Math.floor(2.55*(100-value))+")";
		this.setState({ 
			sliderValue: value,
			//sliderColor: 'rgb(2.55*{{value}},50,2.55*(100-{{value}})'
			sliderColor: colVal
		 });
	}

	onAfterChange = (value) => {

	}

}

export default withTracker(() => {
	Meteor.subscribe('ingredients')
	return {
		ingredients: Ingredients.find({}, { sort: { createdAt: -1 } }).fetch()
	};
})(Piler);
