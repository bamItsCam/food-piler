import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class DietFilters extends Component {
	constructor(props) {
		super(props);
		this.state = {
      gfCheck: this.props.dietFilters.gfCheck,
      dfCheck: this.props.dietFilters.dfCheck,
      efCheck: this.props.dietFilters.efCheck,
      veggieCheck: this.props.dietFilters.veggieCheck,
      veganCheck: this.props.dietFilters.veganCheck,
      fishCheck: this.props.dietFilters.fishCheck,
		};
	}

  toggleCheck(varName) {
    var current_state = this.state[varName];
    var current_state_block = this.state;
    current_state_block[varName] = !current_state;
    this.props.callbackFromParent(current_state_block);

    this.setState({[varName] : !current_state});
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
              <div className={this.state.dfCheck ? "tag is-medium is-primary" : "tag is-medium is-light"}>
                <input type="checkbox" ref="BadDairy" onClick={this.toggleCheck.bind(this,'dfCheck')}></input>
                <p>Dairy-free</p>
              </div>
              <div className={this.state.efCheck ? "tag is-medium is-primary" : "tag is-medium is-light"}>
                <input type="checkbox" ref="BadEgg" onClick={this.toggleCheck.bind(this,'efCheck')}></input>
                <p>Egg-free</p>
              </div>
              <div className={this.state.veganCheck ? "tag is-medium is-primary" : "tag is-medium is-light"}>
                <input type="checkbox" ref="SuperVeggie" onClick={this.toggleCheck.bind(this,'veganCheck')}></input>
                <p>Vegan</p>
              </div>
              <div className={this.state.veggieCheck ? "tag is-medium is-primary" : "tag is-medium is-light"}>
                <input type="checkbox" ref="Veggie" onClick={this.toggleCheck.bind(this,'veggieCheck')}></input>
                <p>Vegetarian</p>
              </div>
              <div className={this.state.fishCheck ? "tag is-medium is-primary" : "tag is-medium is-light"}>
                <input type="checkbox" ref="Fishy" onClick={this.toggleCheck.bind(this,'fishCheck')}></input>
                <p>Pescetarian</p>
              </div>
            </div>
          </div>
        </div>
        );
  }
}