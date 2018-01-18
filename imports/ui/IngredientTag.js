import React, { Component } from 'react';
import { Ingredients } from '../api/ingredients.js';
 
export default class IngredientTag extends Component {
  render() {
    return (
      <tr>
      	<td><button onClick={this.deleteIngr.bind(this)}>Delete</button></td>
      	<td><button onClick={this.editIngr.bind(this)}>Edit</button></td>
      	<td>{this.props.ingredient.ingrName}</td>
      	<td>{this.props.ingredient.ingrDesc}</td>
      	<td>{this.props.ingredient.ingrSpicy}</td>
      	<td>{this.props.ingredient.ingrSweet}</td>
      	<td>{this.props.ingredient.ingrSalty}</td>
      	<td>{this.props.ingredient.ingrFlex}</td>
      </tr>
    );
  }

  deleteIngr() {
  	Ingredients.remove(this.props.ingredient._id);
  }
  editIngr() {
  	// ????? https://themeteorchef.com/tutorials/click-to-edit-fields-in-react
  }
}
