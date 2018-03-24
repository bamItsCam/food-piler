import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range, createSliderWithTooltip } from 'rc-slider';
import { withTracker } from 'meteor/react-meteor-data';
import 'rc-slider/assets/index.css';

import { Ingredients } from '../../api/ingredients.jsx';

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
					</div>
				</div>
			</div>
		);
	}

	pileIt() {
		// Generate a minimum flexibility for all ingredients based on the riskiness slider value.
		var min_flex = this.state.sliderValue/10;

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

				return ingr.ingrFlex >= min_flex &&
					(unfiltered || current_filter_states.every((e,i)=> e === ingr_states[i] ));
			}
		);

		// Select 5 ingredients that match the criteria.
		var selected = this.selectIngredients(available_ingredients,5);
		console.log(selected);
	}

	selectIngredients(ingrs,n) {
		var selected = new Array(n);
		var len = ingrs.length; 
		var taken = new Array(len);
		if (n > len)
				throw new RangeError("Not enough matching ingredients in the database!");
		while (n--) {
				var x = Math.floor(Math.random() * len);
				selected[n] = ingrs[x in taken ? taken[x] : x];
				taken[x] = --len in taken ? taken[len] : len;
		}
		return selected;;
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
	Meteor.subscribe('ingredients');
	return {
		ingredients: Ingredients.find({}, { sort: { createdAt: -1 } }).fetch()
	};
})(Piler);
