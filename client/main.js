import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.js';
import IngredientManager from '../imports/ui/IngredientManager.js';

 
Meteor.startup(() => {
  //render(<App />, document.getElementById('render-target'));
  render(<IngredientManager />, document.getElementById('render-target'));

});
