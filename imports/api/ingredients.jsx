import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const Ingredients = new Mongo.Collection('ingredients');

if(Meteor.isServer) {
	Meteor.publish('adminIngredients', function adminIngredientsPublication() {
		return Ingredients.find({ownerId: this.userId});
	})

	Meteor.publish('ingredients', function ingredientsPublication() {
		return Ingredients.find();
	})
}

Meteor.methods({
	'ingredients.toggleCheck'(ingredientId, checkboxName, newCheckboxState) {
		check(ingredientId, String);
		check(checkboxName, String);
		check(newCheckboxState, Boolean);

		ingrForUserCheck = Ingredients.findOne(ingredientId);
		if(Meteor.userId() == null || Meteor.userId() != ingrForUserCheck.ownerId) {
			throw new Meteor.Error('not-authorized');
		}

		Ingredients.update(ingredientId, {
			$set: {
				// because we need to use the var checkboxName, and not the string 'checkboxName', use []
				[checkboxName]: newCheckboxState,
			}
		});
	},
	'ingredients.submitIngrText'(ingredientId, ingrName, ingrDesc, ingrFlex) {
		check(ingredientId, String);
		check(ingrName, String);
		check(ingrDesc, String);
		check(ingrFlex, String);

		ingrForUserCheck = Ingredients.findOne(ingredientId);
		if(Meteor.userId() == null || Meteor.userId() != ingrForUserCheck.ownerId) {
			throw new Meteor.Error('not-authorized');
		}

		Ingredients.update(ingredientId, {
			$set: {
				ingrName: ingrName,
				ingrDesc: ingrDesc,
				ingrFlex: ingrFlex,
				editing: false,
			}
		});
	},
	'ingredients.deleteIngr'(ingredientId) {
		check(ingredientId, String);

		ingrForUserCheck = Ingredients.findOne(ingredientId);
		if(Meteor.userId() == null || Meteor.userId() != ingrForUserCheck.ownerId) {
			throw new Meteor.Error('not-authorized');
		}

		Ingredients.remove(ingredientId);
	},
	'ingredients.toggleEditIngr'(ingredientId, editingState) {
		check(ingredientId, String);
		check(editingState, Boolean);

		ingrForUserCheck = Ingredients.findOne(ingredientId);
		if(Meteor.userId() == null || Meteor.userId() != ingrForUserCheck.ownerId) {
			throw new Meteor.Error('not-authorized');
		}

		Ingredients.update(ingredientId, {	
			$set: {
				editing: editingState,
			}
		});
	},

	// note that "admin" must be hard coded here since there is no guarantee that a previous ingredient
	// that is owned by admin exists, so no check can be used by polling the mongo db for an existing username/id
	'ingredients.addNewBlankIngredient'() {
		if(Meteor.user() == null || Meteor.user().username != "admin") {
			throw new Meteor.Error('not-authorized');
		}
		Ingredients.insert({
			ingrName: '',
			ingrDesc: '',
			ingrFlex: '',
			isBase: false,
			isFiller: false,
			isTopping: false,
			isVeggie: false,
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
	},

	'ingredients.insertImportedData'(i) {
		if(Meteor.user() == null || Meteor.user().username != "admin") {
			throw new Meteor.Error('not-authorized');
		}

		existingIngr = Ingredients.findOne(i.ingrName);
		Ingredients.insert({
			ingrName: i.ingrName,
			ingrDesc: i.ingrDesc,
			ingrFlex: i.ingrFlex,
			isBase: (i.isBase.toLowerCase() == 'true'),
			isFiller: (i.isFiller.toLowerCase() == 'true'),
			isTopping: (i.isTopping.toLowerCase() == 'true'),
			isVeggie: (i.isVeggie.toLowerCase() == 'true'),
			isVegan: (i.isVegan.toLowerCase() == 'true'),
			isGF: (i.isGF.toLowerCase() == 'true'),
			isDF: (i.isDF.toLowerCase() == 'true'),
			isEF: (i.isEF.toLowerCase() == 'true'),
			isPesc: (i.isPesc.toLowerCase() == 'true'),
			editing: false,
			ownerId: Meteor.userId(),
			username: Meteor.user().username,
			createdAt: new Date(),
		});
	}
})