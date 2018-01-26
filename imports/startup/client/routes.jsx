import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import IngredientManager from '../../ui/components/IngredientManager.jsx';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
	<div>
      <Route path="/admin" component={ IngredientManager } />
    </div>
  </Router>
);