import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.jsx';
import '../imports/startup/client/accounts-config.jsx';

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById('render-target'));
});

/*
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {Router, Route} from 'react-router';
 
import App from '../imports/ui/App.js';
import IngredientManager from '../imports/ui/IngredientManager.js';

Meteor.startup(() => {
	//render(<App />, document.getElementById('render-target'));
	render(<IngredientManager />, document.getElementById('render-target'));

});
*/
