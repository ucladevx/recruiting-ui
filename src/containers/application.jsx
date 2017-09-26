import React from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

import {Action} from 'reducers';
import ApplicationComponent from 'components/Application';

class Application extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		if (!this.props.authenticated)
			return this.props.logOut();
		if (this.props.admin)
			return this.props.redirectHome();
		if (this.props.match.params.id)
			this.props.getApplication(this.props.match.params.id);
	}

	render() {
		const isReview = this.props.match.path.startsWith("/view");
		return <ApplicationComponent
						 review={isReview}
						 applicationId={this.props.match.params.id}
						 {...this.props} />;
	}
}

const mapStateToProps = state => {
	console.log("new state", state);
	return {
		admin: state.Auth.get('isAdmin'),
		authenticated: state.Auth.get('authenticated'),

		error: state.Applications.get('error'),
		application: state.Applications.get('application'),
		profile: state.Applications.get('application').profile || {},
		lastAction: state.Applications.get('timestamp'),

		applicationGetting: state.Applications.get('applicationGetting'),
		applicationGetSuccess: state.Applications.get('applicationGetSuccess'),
		applicationGetFailure: state.Applications.get('applicationGetFailure'),

		applicationUpdating: state.Applications.get('applicationUpdating'),
		applicationUpdateSuccess: state.Applications.get('applicationUpdateSuccess'),
		applicationUpdateFailure: state.Applications.get('applicationUpdateFailure'),

		applicationSubmitting: state.Applications.get('applicationSubmitting'),
		applicationSubmitSuccess: state.Applications.get('applicationSubmitSuccess'),
		applicationSubmitFailure: state.Applications.get('applicationSubmitFailure'),
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
		getApplication: (id) => {
			dispatch(Action.GetApplication(id));
		},
		updateApplicationProfile: (id, profile) => {
			dispatch(Action.UpdateApplicationProfile(id, profile));
		},
		submitApplication: (id) => {
			dispatch(Action.SubmitApplication(id));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
