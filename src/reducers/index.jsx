import {createStore, combineReducers, applyMiddleware} from 'redux';
import {routerReducer, routerMiddleware, push} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import {Auth, LoginUser, LogoutUser, RegisterUser} from './auth';
import {Seasons, GetSeasons, DeleteSeason} from './seasons';
import {Applications, GetApplications, GetApplication, CreateApplication, UpdateApplicationProfile, SubmitApplication, RejectApplication, AcceptApplication, AcceptForInterview, ReviewApplication} from './applications';

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
	LoginUser, LogoutUser, RegisterUser,
	GetSeasons, DeleteSeason,
	GetApplications, GetApplication, CreateApplication, UpdateApplicationProfile, SubmitApplication, RejectApplication, ReviewApplication, AcceptApplication, AcceptForInterview,
};

export {
	store, history, Action,
}
