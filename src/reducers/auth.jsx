import Config from 'config';
import Storage from 'storage';
import Immutable from 'immutable';

import { replace } from 'react-router-redux';

/**********************************************
 ** Constants                                **
 *********************************************/

const AUTH_INIT = Symbol();
const AUTH_SUCCESS = Symbol();
const AUTH_FAILURE = Symbol();

const REGISTER_INIT = Symbol();
const REGISTER_SUCCESS = Symbol();
const REGISTER_FAILURE = Symbol();

const UNAUTH_USER = Symbol();

const initState = () => {
	const token = Storage.get('token');
	return Immutable.fromJS({
		error: null,
		timestamp: null,
		authenticated: !!token,
		isAdmin: !!token && tokenIsAdmin(token),

		authing: false,
		authSuccess: false,
		authFailure: false,

		registering: false,
		registerSuccess: false,
		registerFailure: false,
	});
}

const resetFlags = (val) => {
	const flags = [
		'authing',
		'authSuccess',
		'authFailure',
		'registering',
		'registerSuccess',
		'registerFailure',
	];
	flags.forEach(flag => val.set(flag, false));
}

/**********************************************
 ** Helper Functions                         **
 *********************************************/

const tokenGetClaims = token => {
	if (!token)
		return {};
	const tokenArray = token.split('.');
	if(tokenArray.length !== 3)
		return {};
	return JSON.parse(window.atob(tokenArray[1].replace('-', '+').replace('_', '/')));
};

const tokenIsAdmin = token => !!tokenGetClaims(token).admin;

/**********************************************
 ** Auth States                              **
 *********************************************/

class State {
	static InitAction(type) {
		return { type };
	}
	static Auth(error, token) {
		return {
			type    : error ? AUTH_FAILURE : AUTH_SUCCESS,
			isAdmin : error ? undefined : tokenIsAdmin(token),
			error   : error || undefined,
		};
	}
	static Register(error) {
		return {
			type    : error ? REGISTER_FAILURE : REGISTER_SUCCESS,
			error   : error || undefined,
		};
	}
	static UnAuth(error) {
		return {
			type: UNAUTH_USER,
		};
	}
}

/**********************************************
 ** Actions                                  **
 *********************************************/

const LoginUser = (email, password) => {
	return async (dispatch) => {
		dispatch(State.InitAction(AUTH_INIT));

		try {
			const response = await fetch(Config.apiHost + Config.routes.auth.login, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password }),
			});

			const status = await response.status;
			const data = await response.json();

			if (!data)
				throw new Error('Empty response from server');
			if (data.error)
				throw new Error(data.error.message);

			Storage.set('token', data.token);
			dispatch(State.Auth(null, data.token));
		} catch (err) {
			dispatch(State.Auth(err.message));
		}
	};
}

const RegisterUser = (user) => {
	return async (dispatch) => {
		dispatch(State.InitAction(REGISTER_INIT));

		try {
			const response = await fetch(Config.apiHost + Config.routes.auth.register, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ user }),
			});

			const status = await response.status;
			const data = await response.json();

			if (!data)
				throw new Error('Empty response from server');
			if (data.error)
				throw new Error(data.error.message);

			dispatch(State.Register(null));
		} catch (err) {
			dispatch(State.Register(err.message));
		}
	};
}

const LogoutUser = (error) => {
	return async (dispatch) => {
		dispatch(State.UnAuth());
		Storage.remove('token');
		dispatch(replace('/login'));
	}
}

/**********************************************
 ** Auth Reducer                             **
 *********************************************/

const Auth = (state=initState(), action) => {
	switch (action.type) {
		/**
		 * Init actions
		 */
		case AUTH_INIT:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('authing', true);
			});
		case REGISTER_INIT:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('registering', true);
			});

		/**
		 * Failure actions
		 */
		case AUTH_FAILURE:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', action.error);
				val.set('timestamp', Date.now());
				val.set('authFailure', true);
			});
		case REGISTER_FAILURE:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', action.error);
				val.set('timestamp', Date.now());
				val.set('registerFailure', true);
			});

		/**
		 * Success actions
		 */
		case AUTH_SUCCESS:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('authenticated', true);
				val.set('authSuccess', true);
				val.set('isAdmin', action.isAdmin);
			});
		case REGISTER_SUCCESS:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('registerSuccess', true);
			});
		case UNAUTH_USER:
			return state.withMutations(val => {
				val.set('authenticated', false);
				val.set('isAdmin', false);
			});

		default:
			return state;
	}
}

export {
	Auth, LoginUser, LogoutUser, RegisterUser
}
