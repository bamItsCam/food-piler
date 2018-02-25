import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';
import NavBar from './Nav.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { Ingredients } from '../../api/ingredients.jsx';
import 'rc-slider/assets/index.css';
import DietFilters from './DietFilters.jsx';

class Piler extends Component {
	constructor(props) {
		super(props);
    this.state = {
        dietFilters : {
					gfCheck: false,
					dfCheck: false,
					efCheck: false,
					veganCheck: false,
					veggieCheck: false,
					fishCheck: false
				},
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
									dietFilters={this.state.dietFilters}/>
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
									<a className="button is-block is-info is-large">Pile it!</a>
								</div>
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
