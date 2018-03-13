import Config from 'config';
import Storage from 'storage';
import Immutable from 'immutable';
import {LogoutUser} from './auth';

import { replace } from 'react-router-redux';

/**********************************************
 ** Constants                                **
 *********************************************/

const GET_APPLICATION_INIT = Symbol();
const GET_APPLICATIONS_INIT = Symbol();
const GET_APPLICATION_SUCCESS = Symbol();
const GET_APPLICATIONS_SUCCESS = Symbol();
const GET_APPLICATION_FAILURE = Symbol();
const GET_APPLICATIONS_FAILURE = Symbol();

const CREATE_APPLICATION_INIT = Symbol();
const CREATE_APPLICATION_SUCCESS = Symbol();
const CREATE_APPLICATION_FAILURE = Symbol();

const UPDATE_APPLICATION_INIT = Symbol();
const UPDATE_APPLICATION_SUCCESS = Symbol();
const UPDATE_APPLICATION_FAILURE = Symbol();

const SUBMIT_APPLICATION_INIT = Symbol();
const SUBMIT_APPLICATION_SUCCESS = Symbol();
const SUBMIT_APPLICATION_FAILURE = Symbol();

const REVIEW_APPLICATION_INIT = Symbol();
const REVIEW_APPLICATION_SUCCESS = Symbol();
const REVIEW_APPLICATION_FAILURE = Symbol();

const SCHEDULE_INTERVIEW_INIT = Symbol();
const SCHEDULE_INTERVIEW_SUCCESS = Symbol();
const SCHEDULE_INTERVIEW_FAILURE = Symbol();

const initState = () => {
	return Immutable.fromJS({
		error: null,
		timestamp: null,
		application: {},
		applications: [],

		applicationGetting: false,
		applicationGetSuccess: false,
		applicationGetFailure: false,

		applicationCreating: false,
		applicationCreateSuccess: false,
		applicationCreateFailure: false,

		applicationUpdating: false,
		applicationUpdateSuccess: false,
		applicationUpdateFailure: false,

		applicationReviewing: false,
		applicationReviewSuccess: false,
		applicationReviewFailure: false,

		applicationSubmitting: false,
		applicationSubmitSuccess: false,
		applicationSubmitFailure: false,

		schedulingInterview: false,
		schedulingInterviewSuccess: false,
		schedulingInterviewFailure: false,
	});
}

const resetFlags = val => {
	const flags = [
		'applicationGetting',
		'applicationGetSuccess',
		'applicationGetFailure',
		'applicationCreating',
		'applicationCreateSuccess',
		'applicationCreateFailure',
		'applicationUpdating',
		'applicationUpdateSuccess',
		'applicationUpdateFailure',
		'applicationReviewing',
		'applicationReviewSuccess',
		'applicationReviewFailure',
		'applicationSubmitting',
		'applicationSubmitSuccess',
		'applicationSubmitFailure'
		'schedulingInterview',
		'schedulingInterviewSuccess',
		'schedulingInterviewFailure',
	];
	flags.forEach(flag => val.set(flag, false));
}

/**********************************************
 ** Applications States                      **
 *********************************************/

class State {
	static InitAction(type) {
		return { type };
	}
	static GetApplications(error, applications) {
		return {
			type         : error ? GET_APPLICATIONS_FAILURE : GET_APPLICATIONS_SUCCESS,
			applications : error ? [] : applications,
			error        : error || undefined,
		};
	}
	static GetApplication(error, application) {
		return {
			type         : error ? GET_APPLICATION_FAILURE : GET_APPLICATION_SUCCESS,
			application  : error ? {} : application,
			error        : error || undefined,
		};
	}
	static CreateApplication(error) {
		return {
			type         : error ? CREATE_APPLICATION_FAILURE : CREATE_APPLICATION_SUCCESS,
			error        : error || undefined,
		};
	}
	static UpdateApplication(error) {
		return {
			type         : error ? UPDATE_APPLICATION_FAILURE : UPDATE_APPLICATION_SUCCESS,
			error        : error || undefined,
		};
	}
	static SubmitApplication(error) {
		return {
			type         : error ? SUBMIT_APPLICATION_FAILURE : SUBMIT_APPLICATION_SUCCESS,
			error        : error || undefined,
		};
	}
	static ReviewApplication(error, application) {
		return {
			type         : error ? REVIEW_APPLICATION_FAILURE : REVIEW_APPLICATION_SUCCESS,
			application  : error ? {} : application,
			error        : error || undefined,
		};
	}
	static ScheduleInterview(error) {
		return {
			type         : error ? SCHEDULE_INTERVIEW_FAILURE : SCHEDULE_INTERVIEW_SUCCESS,
			error        : error || undefined,
		};
	}
}

/**********************************************
 ** Actions                                  **
 *********************************************/

const GetApplications = () => {
	return async (dispatch) => {
		dispatch(State.InitAction(GET_APPLICATIONS_INIT));

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

			if (status === 401)
				return dispatch(LogoutUser());

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
		dispatch(State.InitAction(GET_APPLICATION_INIT));

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

			if (status === 401)
				return dispatch(LogoutUser());

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
		dispatch(State.InitAction(CREATE_APPLICATION_INIT));

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

			if (status === 401)
				return dispatch(LogoutUser());

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
		dispatch(State.InitAction(UPDATE_APPLICATION_INIT));

		try {
			const response = await fetch(Config.apiHost + Config.routes.application.update(id), {
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

			if (status === 401)
				return dispatch(LogoutUser());

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

const SubmitApplication = (id) => {
	return async (dispatch) => {
		dispatch(State.InitAction(SUBMIT_APPLICATION_INIT));

		try {
			const response = await fetch(Config.apiHost + Config.routes.application.submit(id), {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${Storage.get('token')}`,
				},
			});

			const status = await response.status;
			const data = await response.json();

			if (status === 401)
				return dispatch(LogoutUser());

			if (!data)
				throw new Error('Empty response from server');
			if (data.error)
				throw new Error(data.error.message);

			dispatch(State.SubmitApplication(null));
		} catch (err) {
			dispatch(State.SubmitApplication(err.message));
		}
	};
}

const ScheduleInterview = (id, times) => {
	return async (dispatch) => {
		dispatch(State.InitAction(SCHEDULE_INTERVIEW_INIT));

		try {
			const response = await fetch(Config.apiHost + Config.routes.application.schedule(id), {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${Storage.get('token')}`,
				},
				body: JSON.stringify({ availability: times })
			});

			const status = await response.status;
			const data = await response.json();

			if (status === 401)
				return dispatch(LogoutUser());

			if (!data)
				throw new Error('Empty response from server');
			if (data.error)
				throw new Error(data.error.message);

			dispatch(State.ScheduleInterview(null));
		} catch (err) {
			dispatch(State.ScheduleInterview(err.message));
		}
	};
}

const ReviewApplication = (id, application) => {
	return async (dispatch) => {
		dispatch(State.InitAction(REVIEW_APPLICATION_INIT));

		try {
			const response = await fetch(Config.apiHost + Config.routes.application.review(id), {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${Storage.get('token')}`,
				},
				body: JSON.stringify({ application })
			});

			const status = await response.status;
			const data = await response.json();

			if (status === 401)
				return dispatch(LogoutUser());

			if (!data)
				throw new Error('Empty response from server');
			if (data.error)
				throw new Error(data.error.message);

			dispatch(State.ReviewApplication(null, data.application));
		} catch (err) {
			dispatch(State.ReviewApplication(err.message));
		}
	};
}

const AcceptApplication = (id, application) => {
	const applicationInfo = Object.assign({}, application, { status: 'ACCEPTED' });
	return ReviewApplication(id, applicationInfo);
}

const AcceptForInterview = (id) => {
	const applicationInfo = { status: 'SCHEDULE_INTERVIEW' };
	return ReviewApplication(id, applicationInfo);
}

const RejectApplication = (id, application) => {
	const applicationInfo = Object.assign({}, application, { status: 'REJECTED' });
	return ReviewApplication(id, applicationInfo);
}

/**********************************************
 ** Applications Reducer                     **
 *********************************************/

const Applications = (state=initState(), action) => {
	switch (action.type) {
		/**
		 * Init actions
		 */
		case GET_APPLICATION_INIT:
		case GET_APPLICATIONS_INIT:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('applicationGetting', true);
			});
		case CREATE_APPLICATION_INIT:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('applicationCreating', true);
			});
		case UPDATE_APPLICATION_INIT:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('applicationUpdating', true);
			});
		case SUBMIT_APPLICATION_INIT:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('applicationSubmitting', true);
			});
		case REVIEW_APPLICATION_INIT:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('applicationReviewing', true);
			});
		case SCHEDULE_INTERVIEW_INIT:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('schedulingInterview', true);
			});

		/**
		 * Failure actions
		 */
		case GET_APPLICATION_FAILURE:
		case GET_APPLICATIONS_FAILURE:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', action.error);
				val.set('timestamp', Date.now());
				val.set('applicationGetFailure', true);
			})
		case CREATE_APPLICATION_FAILURE:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', action.error);
				val.set('timestamp', Date.now());
				val.set('applicationCreateFailure', true);
			})
		case UPDATE_APPLICATION_FAILURE:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', action.error);
				val.set('timestamp', Date.now());
				val.set('applicationUpdateFailure', true);
			})
		case SUBMIT_APPLICATION_FAILURE:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', action.error);
				val.set('timestamp', Date.now());
				val.set('applicationSubmitFailure', true);
			})
		case REVIEW_APPLICATION_FAILURE:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', action.error);
				val.set('timestamp', Date.now());
				val.set('applicationReviewFailure', true);
			})
		case SCHEDULE_INTERVIEW_FAILURE:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', action.error);
				val.set('timestamp', Date.now());
				val.set('schedulingInterviewFailure', true);
			})

		/**
		 * Success actions
		 */
		case GET_APPLICATION_SUCCESS:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('application', action.application);
				val.set('applicationGetSuccess', true);
			})
		case GET_APPLICATIONS_SUCCESS:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('applications', action.applications);
				val.set('applicationGetSuccess', true);
			})
		case CREATE_APPLICATION_SUCCESS:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('applicationCreateSuccess', true);
			})
		case UPDATE_APPLICATION_SUCCESS:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('applicationUpdateSuccess', true);
			})
		case SUBMIT_APPLICATION_SUCCESS:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('applicationSubmitSuccess', true);
			})
		case REVIEW_APPLICATION_SUCCESS:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('application', action.application);
				val.set('applicationReviewSuccess', true);
			})
		case SCHEDULE_INTERVIEW_SUCCESS:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('schedulingInterviewSuccess', true);
			})

		/**
		 * Fall through for actions not related to applications
		 */
		default:
			return state;
	}
}

export {
	Applications, GetApplications, GetApplication,
	CreateApplication, UpdateApplicationProfile, SubmitApplication,
	ReviewApplication, AcceptApplication, AcceptForInterview, RejectApplication,
}
