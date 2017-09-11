import Config from 'config';
import Storage from 'storage';
import Immutable from 'immutable';

import moment from 'moment';
import { replace } from 'react-router-redux';

/**********************************************
 ** Constants                                **
 *********************************************/

const GET_SEASONS = Symbol();
const PUT_SEASON = Symbol();
const DELETE_SEASON = Symbol();
const SEASONS_ERROR = Symbol();

const initState = () => {
	return Immutable.fromJS({
		error: null,
		timestamp: null,
    seasonDeleted: false,
		seasons: [],
	});
}

/**********************************************
 ** Seasons States                           **
 *********************************************/

class State {
	static GetSeasons(error, seasons) {
		return {
			type    : error ? SEASONS_ERROR : GET_SEASONS,
      seasons : error ? [] : seasons,
			error   : error || undefined,
		};
	}
  static DeleteSeason(error) {
    return {
			type    : error ? SEASONS_ERROR : DELETE_SEASON,
			error   : error || undefined,
		};
  }
}

/**********************************************
 ** Actions                                  **
 *********************************************/

const GetSeasons = () => {
	return async (dispatch) => {
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
		case GET_SEASONS:
			return state.withMutations(val => {
				val.set('error', null);
				val.set('timestamp', Date.now());
				val.set('seasons', action.seasons);
			});

		case DELETE_SEASON:
			return state.withMutations(val => {
				val.set('error', null);
        val.set('seasonDeleted', true);
				val.set('timestamp', Date.now());
			});

		case SEASONS_ERROR:
			return state.withMutations(val => {
				val.set('error', action.error);
				val.set('timestamp', Date.now());
			});

		default:
			return state;
	}
}

export {
	Seasons, GetSeasons, DeleteSeason
}
