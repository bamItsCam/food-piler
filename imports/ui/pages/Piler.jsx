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
			recipeCardVisibility : "hidden", // Yo abbi, why not push this logic to the render function? Why use css to hide?
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
												// handle styling not yet supported with tooltip sliders
												//handleStyle={{backgroundColor:this.state.sliderColor,height:20,width:20}}
												onChange={this.onSliderChange}
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
		return this.state.selectedIngrs.map((ingredient) => (
			<RecipeTag 
				key={ingredient._id}
				ingredient={ingredient}
			/>
		));
	}

	pileIt() {

		this.setState({ 
			selectedIngrs : [],
			recipeCardVisibility: 'hidden'
		});
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
		var isUnfiltered = current_filter_states.every( isChecked => { return !isChecked; });
		console.log(isUnfiltered);

		// Get the set of ingredients that match the min_flex and dietary restrictions.
		var dietComplientIngrs = this.props.ingredients.filter( ingr => {
			var ingr_states = [ingr.isGF,ingr.isDF,ingr.isEF,ingr.isVeggie,ingr.isVegan,ingr.isPesc];
			return (isUnfiltered || current_filter_states.every((e,i)=> e === ingr_states[i] ));
		});

		// Select 5 ingredients that match the criteria.
		var selected = this.selectIngredients(this.state.sliderValue,dietComplientIngrs,5);
		this.setState({ 
			selectedIngrs : selected,
			recipeCardVisibility : "visible"
		});
	}

	selectIngredients(sliderVal,ingrs,ingrNum) {
		var selected = new Array(ingrNum);
		var minRiskinessOffset = 10;

		// if slider is too low, bump it up to the minimum
		sliderVal = (sliderVal < minRiskinessOffset) ? minRiskinessOffset : sliderVal;

		var variableRisk = Math.floor(Math.abs(rnorm(sliderVal,3)-sliderVal)) + minRiskinessOffset/2;

		// Get all ingredients in the database that have a riskiness less than the max riskiness
		var maxRisk = sliderVal + variableRisk
		console.log("max: " + maxRisk);
		var viably_risky_ingrs = ingrs.filter((ingr) => ingr.ingrRisk <= (maxRisk));
		var bases = viably_risky_ingrs.filter((ingr) => ingr.isBase);
		//var filler = viably_risky_ingrs.filter((ingr) => ingr.isFiller);

		var addedIngrCount = 0;
 
		// If there aren't enough ingredients within the riskiness range, throw an error
		if (ingrNum > viably_risky_ingrs.length) {
			this.setState({ notifUp: true, notifMessage: "Sorry. Not enough matching ingredients in the database! :("});
			throw new RangeError(this.state.notifMessage);
			}

		// Alow only 1 base if riskiness is under 50
		if (sliderVal <= 50 && bases.length > 0) {
			var ind = Math.floor(Math.random() * (bases.length-1));
			selected[0] = bases[ind];
			addedIngrCount++;
			//viably_risky_ingrs = viably_risky_ingrs.filter( ingr => !ingr.isBase);
		}

		// ALlow only 1 filler if riskiness is under 50
		// TODO

		// Next, select the other ingredients (yes, this isn't super efficient)
		while(addedIngrCount < ingrNum) {
			var ind = Math.floor(Math.random() * (viably_risky_ingrs.length-1));

			while(selected.includes(viably_risky_ingrs[ind])) {
				ind = Math.floor(Math.random() * (viably_risky_ingrs.length-1));
			}

			selected[addedIngrCount] = viably_risky_ingrs[ind];

			addedIngrCount++;
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
			sliderColor: colVal
		 });
	}
}

export default withTracker(() => {
	Meteor.subscribe('ingredients');
	return {
		ingredients: Ingredients.find({}, { sort: { createdAt: -1 } }).fetch()
	};
})(Piler);
