import React from 'react';
import { Switch, Route, Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Admin from '../../ui/pages/Admin.jsx';
import Piler from '../../ui/pages/Piler.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
	<Router history={browserHistory}>
		<Switch>
			<Route exact path="/" component={ Piler }/>
			<Route path="/admin" component={ Admin }/>
			<Route component={ NotFound }/>
		</Switch>
	</Router>
);