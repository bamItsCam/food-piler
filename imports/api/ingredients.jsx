import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const Ingredients = new Mongo.Collection('ingredients');

if(Meteor.isServer) {
	Meteor.publish('ingredients', function ingredientsPublication() {
		return Ingredients.find();
	})
}

Meteor.methods({
	'ingredients.toggleCheck'(ingredientId, checkboxName, newCheckboxState) {
		check(ingredientId, String);
		check(checkboxName, String);
		check(newCheckboxState, Boolean);

		if(Meteor.user() == null || Meteor.user().username != "admin") {
			throw new Meteor.Error('not-authorized');
		}

		Ingredients.update(ingredientId, {
			$set: {
				// because we need to use the var checkboxName, and not the string 'checkboxName', use []
				[checkboxName]: newCheckboxState,
			}
		});
	},
	'ingredients.submitIngrText'(ingredientId, ingrName, ingrDesc, ingrSpicy, ingrSweet, ingrSalty, ingrFlex) {
		check(ingredientId, String);
		check(ingrName, String);
		check(ingrDesc, String);
		check(ingrSpicy, String);
		check(ingrSweet, String);
		check(ingrSalty, String);
		check(ingrFlex, String);

		if(Meteor.user() == null || Meteor.user().username != "admin") {
			throw new Meteor.Error('not-authorized');
		}

		Ingredients.update(ingredientId, {
			$set: {
				ingrName: ingrName,
				ingrDesc: ingrDesc,
				ingrSpicy: ingrSpicy,
				ingrSweet: ingrSweet,
				ingrSalty: ingrSalty,
				ingrFlex: ingrFlex,
				editing: false,
			}
		});
	},
	'ingredients.deleteIngr'(ingredientId) {
		check(ingredientId, String);

		if(Meteor.user() == null || Meteor.user().username != "admin") {
			throw new Meteor.Error('not-authorized');
		}

		Ingredients.remove(ingredientId);
	},
	'ingredients.toggleEditIngr'(ingredientId, editingState) {
		check(ingredientId, String);
		check(editingState, Boolean);

		if(Meteor.user() == null || Meteor.user().username != "admin") {
			throw new Meteor.Error('not-authorized');
		}

		Ingredients.update(ingredientId, {	
			$set: {
				editing: editingState,
			}
		});
	},
	'ingredients.addNewBlankIngredient'() {
		if(Meteor.user() == null || Meteor.user().username != "admin") {
			throw new Meteor.Error('not-authorized');
		}
		Ingredients.insert({
			ingrName: '',
			ingrDesc: '',
			ingrSpicy: '',
			ingrSweet: '',
			ingrSalty: '',
			ingrFlex: '',
			isBase: false,
			isFiller: false,
			isTopping: false,
			isVege: false,
			isVegan: false,
			isGF: false,
			isDF: false,
			isEF: false,
			isPesc: false,
			editing: true,
			ownerId: Meteor.userId(),
			username: Meteor.user().username,
			createdAt: new Date(),
		});
	}
})