//403 page tbd
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Forbidden extends Component {

	render() {
		console.log("Forbidden!");
		// Just render a placeholder container that will be filled in
		return(
			<div className="container">
				<header>
					403
				</header>
					<h1>403</h1>
			</div>
		);
	}
}