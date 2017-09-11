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
		this.props.getApplication(this.props.match.params.id);
	}

	render() { 
		return <ApplicationComponent
		         redirectHome={this.props.redirectHome}
		         updateApplicationProfile={this.props.updateApplicationProfile}

		         profile={this.props.profile}
						 applicationId={this.props.match.params.id}
						 applicationsError={this.props.applicationsError}
						 applicationsLastAction={this.props.applicationsLastAction} 
						 
						 applicationUpdated={this.props.applicationUpdated} />;
	}
}

const mapStateToProps = state => {
	return {
		admin: state.Auth.get('isAdmin'),
		authenticated: state.Auth.get('authenticated'),
		
		profile: state.Applications.get('application').profile || {},
		applicationsError: state.Applications.get('error'),
		applicationsLastAction: state.Applications.get('timestamp'),

		applicationUpdated: state.Applications.get('applicationUpdated')
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
