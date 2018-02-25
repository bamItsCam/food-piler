import React, { Component } from 'react';
import Account from './Account.jsx'

export default class NavBar extends Component {
	render() {
		return (
			<nav class="navbar is-light topNav">
				<div class="container">
					<div class="navbar-brand">
						<a class="navbar-item" href="/">
							FoodPiler
						</a>
					</div>

					<div id="topNav" class="navbar-menu">
						<div class="navbar-start">
							<a class="navbar-item" href="/piler">
								Start Pilin'
							</a>
							<a class="navbar-item" href="/admin">
								Admin
							</a>
						</div>
						<div class="navbar-end">
							<a class="navbar-item" href="/">
								About
							</a>
							<div class="navbar-item">
								<div class="field">
									<p class="control">
										<a class="button is-small is-info">
											<span class="icon">
												<i class="fa fa-user"></i>
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