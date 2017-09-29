import React from 'react';

import Config from 'config';
import Button from 'components/Button';
import Topbar from 'components/Topbar';

import TextAreaInput from '../elements/textAreaInput';

export default class ProfilePage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		window.scroll(0, 0);
	}

	render() {
		return (
			<div className="cards">
				<div className="card card-wide profile-card">
					<h1>Essay Questions</h1>
					<p>These questions will help us determine your fit for DevX. Try to keep your answers complete yet succinct. Since you selected <b>{this.props.profile.rolePreference}</b>, we've modified your questions to better suit your preferences. Fields marked <span className="required-field">*</span> are required.</p>

					<form className="app-form">
						{ Config.essays[this.props.profile.rolePreference].map(essay => <TextAreaInput required={essay.required} originalValue={this.props.profile[essay.name]} name={essay.name} key={essay.name} title={essay.title} desc={essay.desc} onChange={this.props.setValue} />) }
					</form>
				</div>
			</div>
		);
	}
}