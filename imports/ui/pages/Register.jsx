import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Redirect } from 'react-router';

import LoginRegisterForm from '../components/LoginRegisterForm.jsx';
import NavBar from '../components/Nav.jsx';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToHome: false,
			preexistingUser: "", //If empty, no preexisting user. If filled with username, then that user exists
		}
		classThis = this; //this is a finicky thing. Make a reference so that we can use it in callbacks
	}

	registerUser() {
		const newUsername = ReactDOM.findDOMNode(this.refs.newUsername).value.trim();
		const newPassword = ReactDOM.findDOMNode(this.refs.newPassword).value.trim();
		Accounts.createUser(
			{
				username: newUsername,
				password: newPassword
			},
			function(error) {
        if (error) {
        	// Username already exists
        	classThis.setState({preexistingUser : newUsername});
          console.log("there was an error: " + error.reason);
        } else { 
        	console.log("redirecting...")
          classThis.setState({redirectToHome : true});
          //TODO: popup notif after redirect to home saying "Logged in!", or create user page that lets you change pwd or delete
        };
      }
    );		
	}

	setPreexistingUser(user) {
		classThis.setState({preexistingUser : user});
	}

	clearNotif() {
		classThis.setPreexistingUser("");
	}

	renderUserExistsNotif() {
		if (this.state.preexistingUser != "") return (
				<div className="notification is-info">
				  <button onClick={this.setPreexistingUser.bind(this,"")} className="delete"></button>
				  The user '{this.state.preexistingUser}' already exists, try <a href="/login">Signing in</a>.
				</div>
			);
	}

	renderRedirectOrRegister() {
		if (this.state.redirectToHome) return (
			<Redirect to="/"/>
		);
		else return (
			<div>
				<NavBar/>
				<div className="columns is-centered">
					<div className="column is-5">
						<h1>Register</h1>
						<LoginRegisterForm
							usernameClick={this.clearNotif}
							submitButtonLabel="Register"
							submitAction={this.registerUser}
						/>
						<p>Already have an account? <a href="/login">Sign in</a> here</p>
						{this.renderUserExistsNotif()}
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
				{classThis.renderRedirectOrRegister()}
			</div>
		);
	}
}