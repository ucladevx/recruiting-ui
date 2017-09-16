import React from 'react';
import Config from 'config';

import Button from 'components/Button';
import Notification from 'components/Notification';

export default class LoginComponent extends React.Component {
	constructor(props) {
		super(props);
		this.user = {};
		this.handleChange = this.handleChange.bind(this);
		this.goBack = this.goBack.bind(this);
		this.register = this.register.bind(this);
	}

	componentDidMount() {
		document.title = "DevX | Register";
	}

	handleChange(e) {
		this.user[e.target.name] = e.target.value;
	}

	register(e) {
		e.preventDefault();
		this.props.register(this.user);
	}

	goBack(e) {
		e.preventDefault();
		this.props.goBack();
	}

	componentWillReceiveProps(nextProps) {
		if ((Date.now() - nextProps.lastActionAt) > 1000)
			return;

		if (nextProps.registerFailure)
			return this.notification.show('Registration Error', nextProps.error, 'error', 4000);
		if (nextProps.registerSuccess)
			return this.notification.show('Registration Successful', 'You may now log in.', 'success', 3000);
	}

	render() {
		return (
			<div>
				<Notification ref={n => this.notification = n}/>
				<div id="auth-container">
					<div id="splash"></div>
					<form onSubmit={this.register}>
						<label htmlFor="email">Email Address</label>
						<input type="text" name="email" onChange={this.handleChange} />
						<label htmlFor="password">Password</label>
						<input type="password" name="password" onChange={this.handleChange} />
						<label htmlFor="password">Confirm Password</label>
						<input type="password" name="confPassword" onChange={this.handleChange} />
						<div id="button-container">
							<Button text="Create Account" onClick={this.register} loading={this.props.registering} />
							<Button text="Back" onClick={this.goBack} />
						</div>
					</form>
				</div>
			</div>
		);
	}
}