import React from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

import {Action} from 'reducers';
import LoginComponent from 'components/Login'

class Login extends React.Component {
	componentWillMount() {
		if (this.props.authenticated) {
			this.props.redirectHome();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.authenticated) {
			this.props.redirectHome();
		}
	}

	render() {
		return <LoginComponent {...this.props} />;
	}
}

const mapStateToProps = state => {
	return {
		error: state.Auth.get('error'),
		timestamp: state.Auth.get('timestamp'),
		authenticated: state.Auth.get('authenticated'),

		authing: state.Auth.get('authing'),
		authFailure: state.Auth.get('authFailure'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		redirectHome: () => {
			dispatch(replace('/dashboard'));
		},
		logIn: (email, password) => {
			dispatch(Action.LoginUser(email, password));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
