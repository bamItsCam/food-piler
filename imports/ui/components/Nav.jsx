import React, { Component } from 'react';
import Account from './Account.jsx'

export default class NavBar extends Component {
	render() {
		return (
			<nav className="navbar is-light topNav">
				<div className="container">
					<div id="topNav" className="navbar-menu">
						<div className="navbar-start">
							<a className="navbar-item" href="/">
								Start Pilin'
							</a>
							<a className="navbar-item" href="/admin">
								Admin
							</a>
						</div>
						<div className="navbar-end">
							<a className="navbar-item" href="/">
								About
							</a>
							<div className="navbar-item">
								<div className="field">
									<p className="control">
										<a className="button is-small is-info">
											<span className="icon">
												<i className="fa fa-user"></i>
											</span>
											<Account/>
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}