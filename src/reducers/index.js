import {createStore, combineReducers, applyMiddleware} from 'redux';
import {routerReducer, routerMiddleware, push} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import {Auth, LoginUser, LogoutUser} from './auth';
import {Seasons, GetSeasons, DeleteSeason} from './seasons';
import {Applications, GetApplications, GetApplication, CreateApplication, UpdateApplicationProfile} from './applications';

const history = createHistory();
const routing = routerMiddleware(history);

const store = createStore(
	combineReducers({
		Auth,
		Seasons,
		Applications,
		router: routerReducer,
	}),
	applyMiddleware(routing, thunk)
);

const Action = {
	LoginUser, LogoutUser,
	GetSeasons, DeleteSeason,
	GetApplications, GetApplication, CreateApplication, UpdateApplicationProfile
};

export {
	store, history, Action,
}
