import React from 'react';
import { Switch, Route, Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import IngredientManager from '../../ui/components/IngredientManager.jsx';
import Piler from '../../ui/components/Piler.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
	<Router history={browserHistory}>
		<Switch>
			<Route exact path="/" component={ Piler }/>
			<Route path="/admin" component={ IngredientManager }/>
			<Route component={NotFound}/>
		</Switch>
	</Router>
);