import React from 'react';
import {NavLink} from 'react-router-dom';
import Config from 'config';

import Button from 'components/Button';
import Notification from 'components/Notification';

export default class LoginComponent extends React.Component {
	constructor(props) {
		super(props);
		this.user = {};
		this.handleChange = this.handleChange.bind(this);
		this.logIn = this.logIn.bind(this);
	}

	componentDidMount() {
		document.title = "DevX | Login";
	}

	handleChange(e) {
		this.user[e.target.name] = e.target.value;
	}

	logIn(e) {
		e.preventDefault();
		this.props.logIn(this.user.email, this.user.password);
	}

	componentWillReceiveProps(nextProps) {
		if ((Date.now() - nextProps.lastActionAt) > 1000)
			return;
		if (nextProps.authFailure)
			return this.notification.show('Authentication Error', nextProps.error, 'error', 4000);
	}

	render() {
		return (
			<div>
				<Notification ref={n => this.notification = n}/>
				<div id="auth-container">
					<div id="splash"></div>
					<form>
						<label htmlFor="email">Email Address</label>
						<input type="text" name="email" onChange={this.handleChange} />
						<label htmlFor="password">Password</label>
						<input type="password" name="password" onChange={this.handleChange} />
						<div id="button-container">
							<Button text="Sign In" onClick={this.logIn} loading={this.props.authing} />
							<NavLink to="/register"><Button text="Register" /></NavLink>
						</div>
					</form>
				</div>
			</div>
		);
	}
}