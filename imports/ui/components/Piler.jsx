import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';
import NavBar from './Nav.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { Ingredients } from '../../api/ingredients.js';
import 'rc-slider/assets/index.css';

class Piler extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gfGrey: true,
			dfGrey: true,
			efGrey: true,
			veganGrey: true,
			veggieGrey: true,
			fishGrey: true,
		};
	}

	toggleCheck(varName) {
		const current_state = this.state[varName];
		this.setState({[varName] : !current_state});
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
								<div className="box">
									<h3 className="subtitle has-text-grey">1: Select your <b>dietary preferences</b></h3><br></br>
									<div className="columns is-centered">
										<div className="tags">
											<div className={this.state.gfGrey ? "tag is-medium is-light" : "tag is-medium is-primary"}>
												<input type="checkbox" ref="BadGluten" onClick={this.toggleCheck.bind(this,'gfGrey')}></input>
												<p>Gluten-free</p>
											</div>
											<div className={this.state.dfGrey ? "tag is-medium is-light" : "tag is-medium is-primary"}>
												<input type="checkbox" ref="BadDairy" onClick={this.toggleCheck.bind(this,'dfGrey')}></input>
												<p>Dairy-free</p>
											</div>
											<div className={this.state.efGrey ? "tag is-medium is-light" : "tag is-medium is-primary"}>
												<input type="checkbox" ref="BadEgg" onClick={this.toggleCheck.bind(this,'efGrey')}></input>
												<p>Egg-free</p>
											</div>
											<div className={this.state.veganGrey ? "tag is-medium is-light" : "tag is-medium is-primary"}>
												<input type="checkbox" ref="SuperVeggie" onClick={this.toggleCheck.bind(this,'veganGrey')}></input>
												<p>Vegan</p>
											</div>
											<div className={this.state.veggieGrey ? "tag is-medium is-light" : "tag is-medium is-primary"}>
												<input type="checkbox" ref="Veggie" onClick={this.toggleCheck.bind(this,'veggieGrey')}></input>
												<p>Vegetarian</p>
											</div>
											<div className={this.state.fishGrey ? "tag is-medium is-light" : "tag is-medium is-primary"}>
												<input type="checkbox" ref="Fishy" onClick={this.toggleCheck.bind(this,'fishGrey')}></input>
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
			</div>
		);
	}

}

export default withTracker(() => {
	return {
		ingredients: Ingredients.find({}, { sort: { createdAt: -1 } }).fetch(),
	};
})(Piler);
