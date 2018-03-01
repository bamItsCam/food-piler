import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class NavBar extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<nav className="navbar is-light topNav">
				<div className="container">
					<div id="topNav" className="navbar-menu">
						<div className="navbar-start">
							<a className="navbar-item" href="/">
								Start Pilin'
							</a>
							<a className="navbar-item" href="/">
								About
							</a>
						</div>
						<div className="navbar-end">
							<div className="field navbar-item ">
								{this.renderLoginOrLogoutButton()}
							</div>
						</div>
					</div>
				</div>
			</nav>
		);
	}

	showAdminNav() {
		if (Meteor.user() != null && Meteor.user().username == "admin") return (
			<a className="navbar-item" href="/admin">
				Admin
			</a>
		);
	}

	renderLoginOrLogoutButton() {
		console.log(Meteor.userId());
		if(Meteor.userId() == null) return (
			<a className="button is-small is-info" href="/login"> 
        <span className="icon"> 
          <i className="fa fa-user"></i> 
        </span>
        <span>Login</span>
      </a> 
		);
		else return (
			<a className="button is-small is-info" onClick={this.logout.bind(this)}> 
        <span className="icon"> 
          <i className="fa fa-user"></i> 
        </span>
        <span>Logout</span>
      </a> 
		);
	}
	
	logout() {
		Meteor.logout(
			function(error) {
        if (error) {
        	// user submitted wasn't found
          console.log("there was an error: " + error.reason);
        } else { 
        	console.log("user has been logged out")
        	this.props.history.push("/");
          //TODO: popup notif after redirect to home saying "Logged in!", or create user page that lets you change pwd or delete
        };
      }
    );		
	}
}