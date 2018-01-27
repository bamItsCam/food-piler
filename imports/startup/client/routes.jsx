import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import IngredientManager from '../../ui/components/IngredientManager.jsx';
import Piler from '../../ui/components/Piler.jsx';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
	<div>
      <Route exact path='/' component={ Piler } />
      <Route path='/admin' component={ IngredientManager } />
    </div>
  </Router>
);