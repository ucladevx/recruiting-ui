import 'babel-polyfill';
import 'main.scss';

import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {render} from 'react-dom';

import {store, history} from 'reducers';

import Login from 'containers/login'
import requireAuth from 'containers/requireAuth';

class App extends React.Component {
	render() {
		return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route path="/login" component={Login} />
              <Redirect to="/login" />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
	}
}

render(<App />, document.getElementById('mount'));
