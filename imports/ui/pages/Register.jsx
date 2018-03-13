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
			willRedirect: false,
			preexistingUser: null, //If null, no preexisting user. If filled with username, then that user exists
		}
		classThis = this; //this is a finicky thing. Make a reference so that we can use it in callbacks
	}

	registerUser() {
		const newUsername = document.getElementById("username").value.trim();
		const newPassword = document.getElementById("userPassword").value.trim();
		Accounts.createUser(
			{
				username: newUsername,
				password: newPassword
			},
			function(error) {
        if (error) {
        	// Username already exists
        	classThis.setPreexistingUser(newUsername);
          console.log("there was an error: " + error.reason);
        } else { 
        	console.log("redirecting...")
          classThis.setPreexistingUser(null);
          //TODO: popup notif after redirect to home saying "Logged in!", or create user page that lets you change pwd or delete
        };
      }
    );		
	}

	setPreexistingUser(user) {
		classThis.setState({preexistingUser : user});
	}

	clearNotif() {
		classThis.setPreexistingUser(null);
	}

	renderUserExistsNotif() {
		if (this.state.preexistingUser != null) return (
				<div className="notification is-warning">
				  <button onClick={this.clearNotif.bind(this)} className="delete"></button>
				  The user '{this.state.preexistingUser}' already exists, try <a href="/login">Signing in</a>.
				</div>
			);
	}

	renderRedirectOrRegister() {
		if (Meteor.user() != null && Meteor.user().username == "admin") return (
			<Redirect to="/admin"/>
		);
		else if (Meteor.user() != null) return (
			<Redirect to="/"/>
		);
		else return (
			<div>
				<NavBar/>
				<div className="columns is-centered">
					<div className="column is-5">
						<h1>Register</h1>
						<LoginRegisterForm
							userInputClick={this.clearNotif}
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