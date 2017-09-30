import React from 'react';
import Highlight from 'react-highlight';

import Config from 'config';
import Button from 'components/Button';
import Topbar from 'components/Topbar';
import Loader from 'components/Loader';

import TextInput from './elements/textInput';
import SelectInput from './elements/selectInput';
import CheckboxInput from './elements/checkboxInput';

export default class ViewApplication extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		window.scroll(0, 0);
	}

	render() {
		if (this.props.applicationGetting || !this.props.profile)
			return <div style={{margin:'auto'}}><Loader style="dark" /></div>;

		const notes = this.props.application.notes;

		return (
			<div className="cards">
				{ (!this.props.admin && this.props.submitted) &&
					<div className="card card-wide profile-card">
						<h1>Application Feedback</h1>
						{ !notes && <p className="review">None</p> }
						{ notes && <p className="review">{notes}</p> }
					</div>
				}

				{ (!this.props.admin && !this.props.submitted) &&
					<div className="card card-wide profile-card">
						<h1>Review & Submit</h1>
						<p>Make sure all of the information here is correct. You can go back and revise it if it isn't. If it is, submit the application and you'll hear back within a couple of days!</p>
					</div>
				}

				<div className="card card-wide profile-card">
					<h1>Personal Information</h1>
					<form className="app-form">
						<label className="input-title">Name</label><br />
						<p className="review">{this.props.profile.firstName} {this.props.profile.lastName}</p><br />

						<label className="input-title">Major</label><br />
						<p className="review">{this.props.profile.major}</p><br />

						<label className="input-title">Race</label><br />
						<p className="review">{this.props.profile.race}</p><br />

						<label className="input-title">Gender</label><br />
						<p className="review">{this.props.profile.gender}</p><br />

						<label className="input-title">Year</label><br />
						<p className="review">{this.props.profile.year}</p><br />

						<label className="input-title">T-Shirt Size</label><br />
						<p className="review">{this.props.profile.tshirt}</p><br />

						<label className="input-title">Resume Link</label><br />
						{ this.props.profile.resume && <p className="review"><a target="_BLANK" href={this.props.profile.resume}>{this.props.profile.resume}</a></p> }
						{ !this.props.profile.resume && <p className="review">None</p> }
						<br />

						<label className="input-title">LinkedIn</label><br />
						{ this.props.profile.linkedin && <p className="review"><a target="_BLANK" href={this.props.profile.linkedin}>{this.props.profile.linkedin}</a></p> }
						{ !this.props.profile.linkedin && <p className="review">None</p> }
						<br />

						<label className="input-title">GitHub</label><br />
						{ this.props.profile.github && <p className="review"><a target="_BLANK" href={this.props.profile.github}>{this.props.profile.github}</a></p> }
						{ !this.props.profile.github && <p className="review">None</p> }
						<br />

						<label className="input-title">Personal Website</label><br />
						{ this.props.profile.website && <p className="review"><a target="_BLANK" href={this.props.profile.website}>{this.props.profile.website}</a></p> }
						{ !this.props.profile.website && <p className="review">None</p> }
						<br />
					</form>
				</div>

				<div className="card card-wide profile-card">
					<h1>Technical Information</h1>
					<form className="app-form">
						<label className="input-title">Role Preference</label><br />
						<p className="review">{this.props.profile.rolePreference}</p><br />

						<CheckboxInput name="languages" title="Languages" options={this.props.profile.languages} originalValue={this.props.profile.languages} review />
						<CheckboxInput name="backendTechnologies" title="Backend Technologies" options={this.props.profile.backendTechnologies} originalValue={this.props.profile.backendTechnologies} review />
						<CheckboxInput name="frontendTechnologies" title="Frontend Technologies" options={this.props.profile.frontendTechnologies} originalValue={this.props.profile.frontendTechnologies} review />
						<CheckboxInput name="otherFrameworksTools" title="Other Frameworks/Tools" options={this.props.profile.otherFrameworksTools} originalValue={this.props.profile.otherFrameworksTools} review />

						<CheckboxInput name="mobileTechnologies" title="Mobile Technologies" options={this.props.profile.mobileTechnologies} originalValue={this.props.profile.mobileTechnologies} review />
						<CheckboxInput name="deploymentPlatforms" title="Deployment Platforms" options={this.props.profile.deploymentPlatforms} originalValue={this.props.profile.deploymentPlatforms} review />
						<CheckboxInput name="databases" title="Databases" options={this.props.profile.databases} originalValue={this.props.profile.databases} review />

						<CheckboxInput name="designTypes" title="Design Types" options={this.props.profile.designTypes} originalValue={this.props.profile.designTypes} review />
						<CheckboxInput name="designTools" title="Design Tools" options={this.props.profile.designTools} originalValue={this.props.profile.designTools} review />
					</form>
				</div>

				<div className="card card-wide profile-card">
					<h1>Essay Questions</h1>
					<form className="app-form">
					{(Config.essays[this.props.profile.rolePreference] || []).map(essay =>
						<div key={essay.name}>
							<label className="input-title">{essay.title}</label>
							{ this.props.profile[essay.name] && <p className="review">{this.props.profile[essay.name]}</p> }
							{ !this.props.profile[essay.name] && <p className="review"><i>No response</i></p> }
						</div>
					)}
					</form>
				</div>

				{ /* <div className="card card-wide profile-card">
					<h1>Challenges</h1>
					<form className="app-form">
					{(Config.challenges[this.props.profile.rolePreference] || []).map(challenge =>
						<div key={challenge.name}>
							<label className="input-title">{challenge.title}</label><br />
							{ !this.props.profile[challenge.name] && <p className="review"><i>No response</i></p> }
							{ !challenge.written && this.props.profile[challenge.name] && <p className="review">{this.props.profile[challenge.name+'Language']}</p> }
							{ !challenge.written && this.props.profile[challenge.name] && <Highlight>{this.props.profile[challenge.name]}</Highlight> }
							{ challenge.written && this.props.profile[challenge.name] && <p className="review">{this.props.profile[challenge.name]}</p> }
						</div>
					)}
					</form>
				</div> */ }
			</div>
		);
	}
}