import React, { Component } from 'react';
import { Switch, Route, Router, withRouter } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Meteor } from 'meteor/meteor';

import Admin from '../../ui/pages/Admin.jsx';
import Piler from '../../ui/pages/Piler.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';
import Forbidden from '../../ui/pages/Forbidden.jsx'
import Register from '../../ui/pages/Register.jsx'

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
	<Router history={browserHistory}>
		<Switch>
			<Route exact path="/" component={ Piler }/>
      <Route path="/admin" component={requireAuth(Admin, "admin")}/>
      <Route path="/register" component={ Register }/>    
			<Route component={ NotFound }/>
		</Switch>
	</Router>
);

export default function requireAuth(Component, user) {

  class AuthenticatedComponent extends Component {

    render() {
      return (Meteor.user() != null && Meteor.user().username == "admin")
        ? <Component/>
        : <Forbidden/>;
    }

  }

  return withRouter(AuthenticatedComponent);
}