import 'babel-polyfill';
import 'whatwg-fetch';
import 'main.scss';
import 'highlight.js/styles/atom-one-light.css';

import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {render} from 'react-dom';

import {store, history} from 'reducers';

import Login from 'containers/login'
import Register from 'containers/register';
import Dashboard from 'containers/dashboard';
import Application from 'containers/application';
import requireAuth from 'containers/requireAuth';
import Schedule from 'containers/schedule'

/**
 * WARNING: begin hack
 */

Number.prototype.map = function(fn) {
	const results = [];
	for (let i = 0; i < this.valueOf(); i++)
		results.push(fn(i + 1));
	return results;
}

/**
 * END HACK
 */

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter onUpdate={() => window.scrollTo(0, 0)} history={history}>
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/dashboard" component={requireAuth(Dashboard)} />
						<Route path="/review/:id" component={requireAuth(Dashboard)} />
						<Route path="/view/:id" component={requireAuth(Application)} />
						<Route path="/schedule/:id" component={requireAuth(Schedule)} />
						<Route path="/application/:id" component={requireAuth(Application)} />
						<Redirect to="/login" />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
	}
}

render(<App />, document.getElementById('mount'));
