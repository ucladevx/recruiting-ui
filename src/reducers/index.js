import {createStore, combineReducers, applyMiddleware} from 'redux';
import {routerReducer, routerMiddleware, push} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import {Auth, LoginUser, LogoutUser} from './auth';

const history = createHistory();
const routing = routerMiddleware(history);

const store = createStore(
  combineReducers({
    Auth,
    router: routerReducer,
  }),
  applyMiddleware(routing, thunk)
);

const Action = {
  LoginUser, LogoutUser
};

export {
  store, history, Action,
}
