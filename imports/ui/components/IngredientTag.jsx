import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
 
export default class IngredientTag extends Component {
	
	render() {
		return this.renderOrEditField();
	}
	
	renderOrEditField() {
		if( this.props.ingredient.editing ) {
			// if this is the row we should be editing, then return the input boxes
			return (
				<tr>
					<td>
						<div className="field is-grouped">
							<a className="button is-success" onClick={this.submitIngrText.bind(this)}>
								<span className="icon is-small">
									<i className="fas fa-check"></i>
								</span>
							</a>
							<a className="button is-dark is-outlined" onClick={this.cancelEdit.bind(this)}>
								<span className="icon is-small">
									<i className="fas fa-ban"></i>
								</span>
							</a>
						</div>
					</td>
					<td><input className="input" type="text" onKeyDown={this.handleSubmitWithEnter.bind(this)} ref="ingrNameInline" defaultValue={this.props.ingredient.ingrName}/></td>
					<td><input className="input" type="text" onKeyDown={this.handleSubmitWithEnter.bind(this)} ref="ingrDescInline" defaultValue={this.props.ingredient.ingrDesc}/></td>
					<td><input className="input" type="text" onKeyDown={this.handleSubmitWithEnter.bind(this)} ref="ingrSpicyInline" defaultValue={this.props.ingredient.ingrSpicy}/></td>
					<td><input className="input" type="text" onKeyDown={this.handleSubmitWithEnter.bind(this)} ref="ingrSweetInline" defaultValue={this.props.ingredient.ingrSweet}/></td>
					<td><input className="input" type="text" onKeyDown={this.handleSubmitWithEnter.bind(this)} ref="ingrSaltyInline" defaultValue={this.props.ingredient.ingrSalty}/></td>
					<td><input className="input" type="text" onKeyDown={this.handleSubmitWithEnter.bind(this)} ref="ingrFlexInline" defaultValue={this.props.ingredient.ingrFlex}/></td>
					<td>
						<input
						type="checkbox"
						readOnly
						checked={!!this.props.ingredient.isBase}
						onClick={this.toggleCheck.bind(this, 'isBase', !this.props.ingredient.isBase)}
						/>
					</td>
					<td>
						<input
						type="checkbox"
						readOnly
						checked={!!this.props.ingredient.isFiller}
						onClick={this.toggleCheck.bind(this, 'isFiller', !this.props.ingredient.isFiller)}
						/>
					</td>
					<td>
						<input
						type="checkbox"
						readOnly
						checked={!!this.props.ingredient.isTopping}
						onClick={this.toggleCheck.bind(this, 'isTopping', !this.props.ingredient.isTopping)}
						/>
					</td>
					<td>
						<input
						type="checkbox"
						readOnly
						checked={!!this.props.ingredient.isVeggie}
						onClick={this.toggleCheck.bind(this, 'isVeggie', !this.props.ingredient.isVeggie)}
						/>
					</td>
					<td>
						<input
						type="checkbox"
						readOnly
						checked={!!this.props.ingredient.isVegan}
						onClick={this.toggleCheck.bind(this, 'isVegan', !this.props.ingredient.isVegan)}
						/>
					</td>
					<td>
						<input
						type="checkbox"
						readOnly
						checked={!!this.props.ingredient.isPesc}
						onClick={this.toggleCheck.bind(this, 'isPesc', !this.props.ingredient.isPesc)}
						/>
					</td>
					<td>
						<input
						type="checkbox"
						readOnly
						checked={!!this.props.ingredient.isGF}
						onClick={this.toggleCheck.bind(this, 'isGF', !this.props.ingredient.isGF)}
						/>
					</td>
					<td>
						<input
						type="checkbox"
						readOnly
						checked={!!this.props.ingredient.isDF}
						onClick={this.toggleCheck.bind(this, 'isDF', !this.props.ingredient.isDF)}
						/>
					</td>
					<td>
						<input
						type="checkbox"
						readOnly
						checked={!!this.props.ingredient.isEF}
						onClick={this.toggleCheck.bind(this, 'isEF', !this.props.ingredient.isEF)}
						/>
					</td>
					<td>
						<a className="button is-danger is-outlined" onClick={this.deleteIngr.bind(this)}>
							<span className="icon is-small">
								<i className="fas fa-times"></i>
							</span>
						</a>
					</td>
				</tr>
			);
		}
		else {
			// simply render the table row
			return (
				<tr>
					<td>
						<a className="button is-info is-outlined" onClick={this.editIngr.bind(this)}>
							<span className="icon is-small">
								<i className="fas fa-edit"></i>
							</span>
						</a>
					</td>
					<td>{this.props.ingredient.ingrName}</td>
					<td>{this.props.ingredient.ingrDesc}</td>
					<td>{this.props.ingredient.ingrSpicy}</td>
					<td>{this.props.ingredient.ingrSweet}</td>
					<td>{this.props.ingredient.ingrSalty}</td>
					<td>{this.props.ingredient.ingrFlex}</td>
					<td>{(this.props.ingredient.isBase) ? 'yes' : 'no'}</td>
					<td>{(this.props.ingredient.isFiller) ? 'yes' : 'no'}</td>
					<td>{(this.props.ingredient.isTopping) ? 'yes' : 'no'}</td>
					<td>{(this.props.ingredient.isVeggie) ? 'yes' : 'no'}</td>
					<td>{(this.props.ingredient.isVegan) ? 'yes' : 'no'}</td>
					<td>{(this.props.ingredient.isPesc) ? 'yes' : 'no'}</td>
					<td>{(this.props.ingredient.isGF) ? 'yes' : 'no'}</td>
					<td>{(this.props.ingredient.isDF) ? 'yes' : 'no'}</td>
					<td>{(this.props.ingredient.isEF) ? 'yes' : 'no'}</td>
					<td>
						<a className="button is-danger is-outlined" onClick={this.deleteIngr.bind(this)}>
							<span className="icon is-small">
								<i className="fas fa-times"></i>
							</span>
						</a>
					</td>
				</tr>
			);
		}
	}

	handleSubmitWithEnter(event) {
		// if keypress was enter key, submit
		if( event.keyCode === 13 ) {
			this.submitIngrText();
		}
	}

	toggleCheck(checkboxName, newCheckboxState) {
		Meteor.call('ingredients.toggleCheck', this.props.ingredient._id, checkboxName, newCheckboxState);
	}

	submitIngrText() {
		// Note that this function does not handle checkbox submits, those are handled after each
		// check/uncheck since it would be unintuitive for those to require an additional action to save
		// their state. This can be changed if not preferred
		const ingrName = ReactDOM.findDOMNode(this.refs.ingrNameInline).value.trim();
		const ingrDesc = ReactDOM.findDOMNode(this.refs.ingrDescInline).value.trim();
		const ingrSpicy = ReactDOM.findDOMNode(this.refs.ingrSpicyInline).value.trim();
		const ingrSweet = ReactDOM.findDOMNode(this.refs.ingrSweetInline).value.trim();
		const ingrSalty = ReactDOM.findDOMNode(this.refs.ingrSaltyInline).value.trim();
		const ingrFlex = ReactDOM.findDOMNode(this.refs.ingrFlexInline).value.trim();

		Meteor.call('ingredients.submitIngrText', this.props.ingredient._id, ingrName, ingrDesc, ingrSpicy, ingrSweet, ingrSalty, ingrFlex);
	}

	deleteIngr() {
		Meteor.call('ingredients.deleteIngr', this.props.ingredient._id);
	}
	editIngr() {
		Meteor.call('ingredients.toggleEditIngr', this.props.ingredient._id, true);
	}
	cancelEdit() {
		Meteor.call('ingredients.toggleEditIngr', this.props.ingredient._id, false);
	}
}