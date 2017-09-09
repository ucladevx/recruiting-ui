import 'babel-polyfill';
import 'main.scss';

import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {render} from 'react-dom';

import {store, history} from 'reducers';

import Login from 'containers/login'
import Dashboard from 'containers/dashboard';
import Application from 'containers/application';
import requireAuth from 'containers/requireAuth';

class App extends React.Component {
	render() {
		return (
      <Provider store={store}>
        <ConnectedRouter onUpdate={() => window.scrollTo(0, 0)} history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={requireAuth(Dashboard)} />
            <Route path="/application" component={requireAuth(withRouter(({history}) => <Application history={history} />))} />
            <Redirect to="/login" />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
	}
}

render(<App />, document.getElementById('mount'));
