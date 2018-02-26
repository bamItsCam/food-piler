import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class LoginRegisterForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			// submitAction is a function passed in by the parent. This action will either be a login or register command
			// submitButtonLabel will also be passed in from the parent
			<div>
				<div className="field">
					<p className="control has-icons-left has-icons-right">
						<input onClick={this.props.usernameClick} className="input is-success" type="text" ref="newUsername" placeholder="Username"/>
						<span className="icon is-small is-left">
							<i className="fas fa-user"></i>
						</span>
					</p>
				</div>
				<div className="field">
					<p className="control has-icons-left">
						<input className="input" type="password" ref="newPassword" 	placeholder="Password"/>
						<span className="icon is-small is-left">
							<i className="fas fa-lock"></i>
						</span>
					</p>
				</div>
				<div className="field">
					<p className="control">
						<a className="button is-success" onClick={this.props.submitAction.bind(this)}>
							{this.props.submitButtonLabel}
						</a>
					</p>
				</div>
			</div>
		);
	}
}