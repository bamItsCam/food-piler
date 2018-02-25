import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class DietFilters extends Component {
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

    this.props.callbackFromParent(this.state);
	}

  toggleCheck(varName) {
    const current_state = this.state[varName];
    this.setState({[varName] : !current_state});
    
    this.props.callbackFromParent(this.state);
  }

  render() {
    return (
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
        );
  }
}