import React from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

import {Action} from 'reducers';
import RegisterComponent from 'components/Register';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.goBack = this.goBack.bind(this);
	}

	goBack() {
		this.props.history.goBack();
	}

	componentWillMount() {
		if (this.props.authenticated)
			return this.props.redirectHome();
	}

	render() {
		return <RegisterComponent goBack={this.goBack} {...this.props} />;
	}
}

const mapStateToProps = state => {
	return {
		authenticated: state.Auth.get('authenticated'),
		error: state.Auth.get('error'),
		lastActionAt: state.Auth.get('timestamp'),

		registering: state.Auth.get('registering'),
		registerSuccess: state.Auth.get('registerSuccess'),
		registerFailure: state.Auth.get('registerFailure'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		redirectHome: () => {
			dispatch(replace('/'));
		},
		register: (user) => {
			dispatch(Action.RegisterUser(user));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
