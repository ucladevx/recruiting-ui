import React from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

import {Action} from 'reducers';
import DashboardComponent from 'components/Dashboard';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		if (!this.props.authenticated)
			return this.props.logOut();
		this.props.getApplications();
		if (this.props.admin) {
			this.props.getSeasons();
		}
	}

	render() {
		return <DashboardComponent {...this.props} />;
	}
}

const mapStateToProps = state => {
	return {
		admin: state.Auth.get('isAdmin'),
		authenticated: state.Auth.get('authenticated'),

		application: state.Applications.get('application'),
		applications: state.Applications.get('applications'),
		applicationsError: state.Applications.get('error'),
		applicationsLastAction: state.Applications.get('timestamp'),

		seasons: state.Seasons.get('seasons'),
		seasonsError: state.Seasons.get('error'),
		seasonsLastAction: state.Seasons.get('timestamp'),

		seasonsGetting: state.Seasons.get('seasonsGetting'),
		seasonsGetSuccess: state.Seasons.get('seasonsGetSuccess'),
		seasonsGetFailure: state.Seasons.get('seasonsGetFailure'),

		seasonDeleting: state.Seasons.get('seasonDeleting'),
		seasonDeleteSuccess: state.Seasons.get('seasonDeleteSuccess'),
		seasonDeleteFailure: state.Seasons.get('seasonDeleteFailure'),

		applicationSubmitSuccess: state.Applications.get('applicationSubmitSuccess'),

		applicationCreating: state.Applications.get('applicationCreating'),
		applicationCreateSuccess: state.Applications.get('applicationCreateSuccess'),
		applicationCreateFailure: state.Applications.get('applicationCreateFailure'),

		applicationReviewing: state.Applications.get('applicationReviewing'),
		applicationReviewSuccess: state.Applications.get('applicationReviewSuccess'),
		applicationReviewFailure: state.Applications.get('applicationReviewFailure'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logOut: () => {
			dispatch(Action.LogoutUser());
		},
		redirectHome: () => {
			dispatch(replace('/'));
		},
		createApplication: () => {
			dispatch(Action.CreateApplication());
		},
		reviewApplication: (id, application) => {
			dispatch(Action.ReviewApplication(id, application));
		},
		acceptApplication: (id, application) => {
			dispatch(Action.AcceptApplication(id, application));
		},
		rejectApplication: (id, application) => {
			dispatch(Action.RejectApplication(id, application));
		},
		getApplication: (id) => {
			dispatch(Action.GetApplication(id));
		},
		getApplications: () => {
			dispatch(Action.GetApplications());
		},
		getSeasons: () => {
			dispatch(Action.GetSeasons());
		},
		deleteSeason: (id) => {
			dispatch(Action.DeleteSeason(id));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
