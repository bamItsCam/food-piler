import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';
import { withTracker } from 'meteor/react-meteor-data';
import { Ingredients } from '../../api/ingredients.js';
import 'rc-slider/assets/index.css';

class Piler extends Component {

	render() {
		return (
			<div className="container has-text-centered">
				<div className="column is-10 is-offset-1">
					<h3 className="title has-text-grey">
						We have compilers for <span style={{fontFamily:'courier'}}>&lt;code&gt;</span>, why not for <span style={{color:'turquoise'}}>food</span>?
					</h3>
					<div className="box">
						<form>
							<div className="box">
								<h3 className="subtitle has-text-grey">1: Select your <b>dietary preferences</b></h3><br></br>
								<div className="columns is-centered">
									<div className="tags">
										<div className="tag is-medium">
											<input type="checkbox" ref="BadGluten"></input>
											<p>Gluten-free</p>
										</div>
										<div className="tag is-medium">
											<input type="checkbox" ref="BadDairy"></input>
											<p>Dairy-free</p>
										</div>
										<div className="tag is-medium">
											<input type="checkbox" ref="BadEggs"></input>
											<p>Egg-free</p>
										</div>
										<div className="tag is-medium">
											<input type="checkbox" ref="SuperVeggie"></input>
											<p>Vegan</p>
										</div>
										<div className="tag is-medium">
											<input type="checkbox" ref="Veggie"></input>
											<p>Vegetarian</p>
										</div>
										<div className="tag is-medium">
											<input type="checkbox" ref="Fishy"></input>
											<p>Pescetarian</p>
										</div>
									</div>
								</div>
							</div>
							<div className="box">
								<h3 className="subtitle has-text-grey">2: Select your <b>riskiness level</b></h3>
								<div className="columns is-centered">
									<div className="column is-5">
										<Slider
											trackStyle={{backgroundColor:'turquoise',height:10}}
											handleStyle={{borderColor:'turquoise',height:20,width:20}}
											railStyle={{height:10}}/>
										</div>
								</div>
							</div>
							<a className="button is-block is-info is-large">Pile it!</a>
						</form>
					</div>
				</div>
			</div>
		);
	}

}

export default withTracker(() => {
	return {
		ingredients: Ingredients.find({}, { sort: { createdAt: -1 } }).fetch(),
	};
})(Piler);
