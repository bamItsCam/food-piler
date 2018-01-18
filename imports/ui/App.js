import React, { Component } from 'react';

import Ingredient from './Ingredient.js';

// App component - represents the whole app
export default class App extends Component {
getIngredients() {
	return [
		{ _id: 1, text: 'Banana' },
		{ _id: 2, text: 'Jellybean' },
		{ _id: 3, text: 'Soy sauce' },
		{ _id: 4, text: 'Spinach' },
		{ _id: 5, text: 'Brown rice' },
		{ _id: 6, text: 'Chocolate sauce' },
		];
	}

randomIntFromInterval(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
	}

findObjectByKey(array, key, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i][key] === value) {
			return array[i];
			}
		}
	return null;
	}

generateIngredients() {
	var ingr = this.getIngredients();
	var selected_ingr = [];
	for (i = 0; i < 3; i++) {
		var rand_id = this.randomIntFromInterval(1,ingr.length);
		var rand_ingr = this.findObjectByKey(ingr, '_id', rand_id);
		selected_ingr.push(rand_ingr);
		}
	return selected_ingr.map((ingr) => (
		<Ingredient key={ingr._id} ingr={ingr} />));
	}

render() {
	return (
		<div className="container">
		<header>
			<h1>Pile</h1>
		</header>
		<ul>
			{this.generateIngredients()}
		</ul>
		</div>);
	}
}

