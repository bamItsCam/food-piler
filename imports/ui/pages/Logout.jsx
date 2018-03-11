import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class Logout extends Component {
	constructor(props) {
		super(props);
		Meteor.logout();
	}

	render() {
		return(<Redirect to="/"/>);
	}
}