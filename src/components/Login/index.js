import React from 'react';
import Config from 'config';

import Button from 'components/Button';

export default class LoginComponent extends React.Component {
	componentDidMount() {
		document.title = "DevX | Login";
	}

	render() {
		return (
			<div id="auth-container">
				<div id="splash"></div>
				<form>
					<label htmlFor="email">Email Address</label>
					<input type="text" name="email" />
					<label htmlFor="password">Password</label>
					<input type="password" name="password" />
					<div id="button-container">
						<Button text="Sign In" onClick={this.props.logIn} />
						<Button text="Create Account" />
					</div>
				</form>
			</div>
		);
	}
}