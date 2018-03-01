import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Redirect } from 'react-router';

import LoginRegisterForm from '../components/LoginRegisterForm.jsx';
import NavBar from '../components/Nav.jsx';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submittedUser: null,
		}
		classThis = this; //this is a finicky thing. Make a reference so that we can use it in callbacks
	}

	loginUser() {
		const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
		const userPassword = ReactDOM.findDOMNode(this.refs.userPassword).value.trim();
		Meteor.loginWithPassword(username, userPassword,
			function(error) {
        if (error) {
        	// user submitted wasn't found
        	classThis.setSubmittedUser(username);
          console.log("there was an error: " + error.reason);
        } else { 
        	console.log("redirecting...")
        	classThis.setSubmittedUser(null);
          //TODO: popup notif after redirect to home saying "Logged in!", or create user page that lets you change pwd or delete
        };
      }
    );
	}

	setSubmittedUser(user) {
		classThis.setState({submittedUser : user});
	}

	clearNotif() {
		classThis.setSubmittedUser(null);
	}

	renderLoginErrorNotif() {
		if (this.state.submittedUser != null) return (
				<div className="notification is-warning">
				  <button onClick={this.clearNotif.bind(this)} className="delete"></button>
				  Whoops, couldn't login with that username and password, try <a href="/register">making an account</a>.
				</div>
			);
	}

	renderRedirectOrLogin() {
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
						<h1>Login</h1>
						<LoginRegisterForm
							usernameClick={this.clearNotif}
							submitButtonLabel="Login"
							submitAction={this.loginUser}
						/>
						<p>Don't have an account? <a href="/register">Sign up</a> here</p>
						{this.renderLoginErrorNotif()}
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
				{classThis.renderRedirectOrLogin()}
			</div>
		);
	}
}