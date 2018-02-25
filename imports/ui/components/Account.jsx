import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
 
export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles : {
        textDecoration:'none',
        color: 'white',
        fontWeight:'bold'
        }
      };
  }

  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }


  render() {
    // Just render a placeholder container that will be filled in
    return (<span style={this.state.styles}ref="container"/>);
  }
}