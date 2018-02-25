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
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}

	pileIt() {
		
	}

	sliderTooltipGenerator(value) {
		console.log("I'm hit! "+value);
		if (value < 20) return "Playin it safe";
		else if (value < 40) return "Ok ok ok";
		else if (value < 60) return "Whoa there";
		else if (value < 80) return "Gettin frisky";
		else return "That's pretty risky";
	}

	onSliderChange = (value) => {
		var colVal = "rgb("+Math.floor(2.55*value)+","+Math.floor(125-value)+","+Math.floor(2.55*(100-value))+")";
		console.log("color: "+colVal);
		this.setState({ 
			sliderValue: value,
			//sliderColor: 'rgb(2.55*{{value}},50,2.55*(100-{{value}})'
			sliderColor: colVal
		 });
	}

	onAfterChange = (value) => {
		console.log("After change: "+value); //eslint-disable-line
	}

}

export default withTracker(() => {
	return {
		ingredients: Ingredients.find({}, { sort: { createdAt: -1 } }).fetch(),
	};
})(Piler);
