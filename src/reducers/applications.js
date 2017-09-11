import Config from 'config';
import Storage from 'storage';
import Immutable from 'immutable';

import { replace } from 'react-router-redux';

/**********************************************
 ** Constants                                **
 *********************************************/

const GET_APPLICATIONS = Symbol();
const GET_APPLICATION = Symbol();
const CREATE_APPLICATION = Symbol();
const UPDATE_APPLICATION = Symbol();
const REVIEW_APPLICATION = Symbol();
const APPLICATION_ERROR = Symbol();

const initState = () => {
	return Immutable.fromJS({
		error: null,
		timestamp: null,
		application: {},
    applications: [],
		applicationCreated: false,
		applicationUpdated: false,
	});
}

/**********************************************
 ** Applications States                      **
 *********************************************/

class State {
	static GetApplications(error, applications) {
		return {
			type         : error ? APPLICATION_ERROR : GET_APPLICATIONS,
      applications : error ? [] : applications,
			error        : error || undefined,
		};
	}
	static GetApplication(error, application) {
		return {
			type         : error ? APPLICATION_ERROR : GET_APPLICATION,
      application  : error ? {} : application,
			error        : error || undefined,
		};
	}
	static CreateApplication(error) {
		return {
			type         : error ? APPLICATION_ERROR : CREATE_APPLICATION,
			error        : error || undefined,
		};
	}
	static UpdateApplication(error) {
		return {
			type         : error ? APPLICATION_ERROR : UPDATE_APPLICATION,
			error        : error || undefined,
		};
	}
}

/**********************************************
 ** Actions                                  **
 *********************************************/

const GetApplications = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(Config.apiHost + Config.routes.application.get, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
          'Authorization': `Bearer ${Storage.get('token')}`,
				},
			});

			const status = await response.status;
			const data = await response.json();

			if (!data)
				throw new Error('Empty response from server');
			if (data.error)
				throw new Error(data.error.message);

			dispatch(State.GetApplications(null, data.applications));
		} catch (err) {
			dispatch(State.GetApplications(err.message));
		}
	};
}

const GetApplication = (id) => {
	return async (dispatch) => {
		try {
			const response = await fetch(Config.apiHost + Config.routes.application.getOne + id, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
          'Authorization': `Bearer ${Storage.get('token')}`,
				},
			});

			const status = await response.status;
			const data = await response.json();

			if (!data)
				throw new Error('Empty response from server');
			if (data.error)
				throw new Error(data.error.message);

			dispatch(State.GetApplication(null, data.application));
		} catch (err) {
			dispatch(State.GetApplication(err.message));
		}
	};
}

const CreateApplication = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(Config.apiHost + Config.routes.application.create, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
          'Authorization': `Bearer ${Storage.get('token')}`,
				},
			});

			const status = await response.status;
			const data = await response.json();

			if (!data)
				throw new Error('Empty response from server');
			if (data.error)
				throw new Error(data.error.message);

			dispatch(State.CreateApplication(null));
			dispatch(GetApplications());
		} catch (err) {
			dispatch(State.CreateApplication(err.message));
		}
	};
}

const UpdateApplicationProfile = (id, profile) => {
	return async (dispatch) => {
		try {
			const response = await fetch(Config.apiHost + Config.routes.application.update + id, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
          'Authorization': `Bearer ${Storage.get('token')}`,
				},
				body: JSON.stringify({ profile })
			});

			const status = await response.status;
			const data = await response.json();

			if (!data)
				throw new Error('Empty response from server');
			if (data.error)
				throw new Error(data.error.message);

			dispatch(State.UpdateApplication(null));
		} catch (err) {
			dispatch(State.UpdateApplication(err.message));
		}
	};
}

/**********************************************
 ** Applications Reducer                     **
 *********************************************/

const Applications = (state=initState(), action) => {
	switch (action.type) {
		case GET_APPLICATIONS:
			return state.withMutations(val => {
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('applications', action.applications);
				val.set('applicationUpdated', false);
				val.set('applicationCreated', false);
			});

		case GET_APPLICATION:
			return state.withMutations(val => {
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('application', action.application);
				val.set('applicationUpdated', false);
				val.set('applicationCreated', false);
			});
		
		case CREATE_APPLICATION:
			return state.withMutations(val => {
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('applicationUpdated', false);
				val.set('applicationCreated', true);
			});

		case UPDATE_APPLICATION:
			return state.withMutations(val => {
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('applicationUpdated', true);
				val.set('applicationCreated', false);
			});

		case APPLICATION_ERROR:
			return state.withMutations(val => {
				val.set('error', action.error);
				val.set('timestamp', Date.now());
				val.set('applicationUpdated', false);
				val.set('applicationCreated', false);
			});

		default:
			return state;
	}
}

export {
	Applications, GetApplications, GetApplication, CreateApplication, UpdateApplicationProfile
}
