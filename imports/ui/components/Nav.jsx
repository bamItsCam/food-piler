import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router';

export default class NavBar extends Component {
	constructor(props) {
		super(props);

		this.state = { currentUser: undefined };
	}

	componentDidMount() {
    Tracker.autorun(() => {
    	// make sure the navbar exists before setting its state
    	if (this.refs.navBar) {
      	this.setState({ currentUser: Meteor.user() });
    	}
    });
  }

	render() {
		return (
			<nav ref="navBar" className="navbar is-light topNav">
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
							{this.renderAdminButton()}
							<div className="field navbar-item ">
								{this.renderLoginOrLogoutButton()}
							</div>
						</div>
					</div>
				</div>
			</nav>
		);
	}

	renderAdminButton() {
		if (this.state.currentUser != null && this.state.currentUser.username == "admin") return (
			<a className="navbar-item" href="/admin">
				Admin
			</a>
		);
	}

	renderLoginOrLogoutButton() {
		if(this.state.currentUser == null) return (
			<a className="button is-small is-info" href="/login"> 
        <span className="icon"> 
          <i className="fa fa-user"></i> 
        </span>
        <span>Login</span>
      </a> 
		);
		else return (
			<div>
				<span>
					Hello {this.state.currentUser.username}!
				</span>
				<a className="button is-small is-info" href="/logout"> 
	        <span className="icon"> 
	          <i className="fa fa-user"></i> 
	        </span>
	        <span>Logout</span>
	      </a>
	     </div>
		);
	}
}