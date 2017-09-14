import Config from 'config';
import Storage from 'storage';
import Immutable from 'immutable';

import moment from 'moment';
import { replace } from 'react-router-redux';

/**********************************************
 ** Constants                                **
 *********************************************/

const GET_SEASONS_INIT = Symbol();
const GET_SEASONS_SUCCESS = Symbol();
const GET_SEASONS_FAILURE = Symbol();

const PUT_SEASON_INIT = Symbol();
const PUT_SEASON_SUCCESS = Symbol();
const PUT_SEASON_FAILURE = Symbol();

const DELETE_SEASON_INIT = Symbol();
const DELETE_SEASON_SUCCESS = Symbol();
const DELETE_SEASON_FAILURE = Symbol();

const initState = () => {
	return Immutable.fromJS({
		error: null,
		timestamp: null,
		seasons: [],

		seasonsGetting: false,
		seasonsGetSuccess: false,
		seasonsGetFailure: false,

		seasonPutting: false,
		seasonPutSuccess: false,
		seasonPutFailure: false,

		seasonDeleting: false,
		seasonDeleteSuccess: false,
		seasonDeleteFailure: false,
	});
}

const resetFlags = (val) => {
	const flags = [
		'seasonsGetting',
		'seasonsGetSuccess',
		'seasonsGetFailure',
		'seasonPutting',
		'seasonPutSuccess',
		'seasonPutFailure',
		'seasonDeleting',
		'seasonDeleteSuccess',
		'seasonDeleteFailure',
	];
	flags.forEach(flag => val.set(flag, false));
}

/**********************************************
 ** Seasons States                           **
 *********************************************/

class State {
	static InitAction(type) {
		return { type };
	}
	static GetSeasons(error, seasons) {
		return {
			type    : error ? GET_SEASONS_FAILURE : GET_SEASONS_SUCCESS,
      seasons : error ? [] : seasons,
			error   : error || undefined,
		};
	}
  static DeleteSeason(error) {
    return {
			type    : error ? DELETE_SEASON_FAILURE : DELETE_SEASON_SUCCESS,
			error   : error || undefined,
		};
  }
}

/**********************************************
 ** Actions                                  **
 *********************************************/

const GetSeasons = () => {
	return async (dispatch) => {
		dispatch(State.InitAction(GET_SEASONS_INIT));

		try {
			const response = await fetch(Config.apiHost + Config.routes.season.get, {
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
      
      const seasons = data.seasons.map(season => {
        season.startDate = moment(season.startDate);
        season.endDate = moment(season.endDate);
        return season;
      });

			dispatch(State.GetSeasons(null, seasons));
		} catch (err) {
			dispatch(State.GetSeasons(err.message));
		}
	};
}

const DeleteSeason = (id) => {
	return async (dispatch) => {
		dispatch(State.InitAction(DELETE_SEASON_INIT));

		try {
			const response = await fetch(Config.apiHost + Config.routes.season.delete + id, {
				method: 'DELETE',
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

			dispatch(State.DeleteSeason());
      dispatch(GetSeasons());
		} catch (err) {
			dispatch(State.GetSeasons(err.message));
		}
	};
}

/**********************************************
 ** Seasons Reducer                          **
 *********************************************/

const Seasons = (state=initState(), action) => {
	switch (action.type) {
		/**
		 * Init actions
		 */
		case GET_SEASONS_INIT:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('seasonsGetting', true);
			});
		case DELETE_SEASON_INIT:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('seasonDeleting', true);
			});

		/**
		 * Failure actions
		 */
		case GET_SEASONS_FAILURE:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', action.error);
				val.set('timestamp', Date.now());
				val.set('seasonsGetFailure', true);
			});
		case DELETE_SEASON_FAILURE:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', action.error);
				val.set('timestamp', Date.now());
				val.set('seasonDeleteFailure', true);
			});

		/**
		 * Success actions
		 */
		case GET_SEASONS_SUCCESS:
			return state.withMutations(val => {
				resetFlags(val);
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('seasons', action.seasons);
				val.set('seasonsGetSuccess', true);
			});

		case DELETE_SEASON_SUCCESS:
			return state.withMutations(val => {
				val.set('error', null);
        val.set('seasonDeleted', true);
				val.set('timestamp', Date.now());
				val.set('seasonDeleteSuccess', false);
			});

		default:
			return state;
	}
}

export {
	Seasons, GetSeasons, DeleteSeason
}
