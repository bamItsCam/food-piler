import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Papa from 'papaparse';

export default class Upload extends Component {
	constructor(props) {
		super(props);
	}

	handleImport = (event) => {
		file = event.target.files[0];
		Papa.parse(file, {
			complete(results, file) {
				// successful parse, so insert data into mongo
				results.data.forEach(function (ingredient) {
					// check if the name is a word
					if(/^[\w ]*$/.test(ingredient.ingrName)) {
						Meteor.call('ingredients.insertImportedData', ingredient);
					}
				});
			},
			error(error, file) {
				// TODO:render notif saying file.name couldn't be imported or something
			},
			header: true,
		});
		// now reset the upload form so that we can upload the same file repeatedly
		ReactDOM.findDOMNode(this.refs.upload).reset();
	}

	render() {
		return (
			<div className="file">
			  <label className="file-label">
			  	<form ref="upload">
			  		<a className="button is-info is-outlined">
							<span className="icon is-small">
								<i className="fas fa-upload"></i>
							</span>
						</a>
			    	<input className="file-input" type="file" name="foods" accept=".csv" onChange={this.handleImport} style={{display:"none"}}/>
			    </form> 
			  </label>
			</div>
		);
	}
}