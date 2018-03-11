import React, { Component } from 'react';
import { Switch, Route, Router, withRouter, Redirect } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import createBrowserHistory from 'history/createBrowserHistory';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'

import Admin from '../../ui/pages/Admin.jsx';
import Piler from '../../ui/pages/Piler.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';
import Forbidden from '../../ui/pages/Forbidden.jsx'
import Register from '../../ui/pages/Register.jsx';
import Login from '../../ui/pages/Login.jsx';
import Logout from '../../ui/pages/Logout.jsx';


const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
	<Router history={browserHistory}>
		<Switch>
			<Route exact path="/" component={ Piler }/>
      <Route path="/admin" component={requireAuth(Admin, "admin")}/>
      <Route path="/register" component={ Register }/>
      <Route path="/login" component={ Login }/>
      <Route path="/logout" component={ Logout }/>
			<Route component={ NotFound }/>
		</Switch>
	</Router>
);

export function requireAuth(Component, user) {

  class AuthenticatedComponent extends Component {

    constructor(props) {
      super(props);

      this.state = { currentUser: undefined };
      classThis = this
    }

    componentDidMount() {
      Tracker.autorun(() => {
        classThis.setState({ currentUser: Meteor.user() });
      });
    }

    render() {
      if (this.state.currentUser != null && this.state.currentUser.username == user) return(<Component/>);
      else {
        return(<Forbidden/>);
      }
    }
  }
  return withRouter(AuthenticatedComponent);
}