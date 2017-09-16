import React from 'react';

import Config from 'config';
import Button from 'components/Button';
import Topbar from 'components/Topbar';

import TextInput from '../elements/textInput';
import SelectInput from '../elements/selectInput';
import CheckboxInput from '../elements/checkboxInput';

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
					<h1>Personal Information</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis. Maecenas eu aliquam lorem. Donec eleifend odio arcu, at fringilla purus pharetra vitae. Donec eleifend, erat sed cursus euismod, mauris magna tincidunt est, sed hendrerit sem tellus id ex. In varius ullamcorper dolor varius ultrices. In quis euismod massa, id faucibus lacus. Donec rutrum tempus mi, ac pellentesque arcu scelerisque in. Maecenas vehicula massa at neque pharetra, non semper risus fringilla. Nunc vulputate erat nec blandit pretium. Nulla ac fringilla nisi. Nam venenatis ultricies lacus, id ullamcorper neque accumsan vitae. Curabitur a odio eget arcu blandit pellentesque sit amet eu tortor.</p>
					<form className="app-form">
						<TextInput name="firstName" title="First Name" originalValue={this.props.profile.firstName} onChange={this.props.setValue} />
						<TextInput name="lastName" title="Last Name" originalValue={this.props.profile.lastName} onChange={this.props.setValue} />
						<TextInput name="major" title="Major" originalValue={this.props.profile.major} onChange={this.props.setValue} />
						<SelectInput name="year" title="Year" originalValue={this.props.profile.year} options={Config.profile.years} onChange={this.props.setValue} />
						<SelectInput name="gender" title="Gender" originalValue={this.props.profile.gender} options={Config.profile.genders} onChange={this.props.setValue} />
						<SelectInput name="tshirt" title="T-Shirt Size" originalValue={this.props.profile.tshirt} options={Config.profile.tshirtSizes} onChange={this.props.setValue} />
					</form>
				</div>

				<div className="card card-wide profile-card">
					<h1>Technical Information</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis. Maecenas eu aliquam lorem. Donec eleifend odio arcu, at fringilla purus pharetra vitae. Donec eleifend, erat sed cursus euismod, mauris magna tincidunt est, sed hendrerit sem tellus id ex. In varius ullamcorper dolor varius ultrices. In quis euismod massa, id faucibus lacus. Donec rutrum tempus mi, ac pellentesque arcu scelerisque in. Maecenas vehicula massa at neque pharetra, non semper risus fringilla. Nunc vulputate erat nec blandit pretium. Nulla ac fringilla nisi. Nam venenatis ultricies lacus, id ullamcorper neque accumsan vitae. Curabitur a odio eget arcu blandit pellentesque sit amet eu tortor.</p>
					<form className="app-form">
						<SelectInput name="rolePreference" title="Role Preference" originalValue={this.props.profile.rolePreference} options={Config.profile.rolePreferences} desc="Which role are you most interested in applying for?" onChange={this.props.setValue} />
						<CheckboxInput name="languages" title="Languages" originalValue={this.props.profile.languages} options={Config.profile.languages} desc="Select all languages that you're comfortable with." onChange={this.props.setValue} />
						<CheckboxInput name="backendTechnologies" title="Backend Technologies" originalValue={this.props.profile.backendTechnologies} options={Config.profile.backendTechnologies} desc="Select all backend technologies that you've worked with (if applicable)" onChange={this.props.setValue} />
						<CheckboxInput name="frontendTechnologies" title="Frontend Technologies" originalValue={this.props.profile.frontendTechnologies} options={Config.profile.frontendTechnologies} desc="Select all frontend technologies that you've worked with (if applicable)" onChange={this.props.setValue} />
						<CheckboxInput name="otherFrameworksTools" title="Other Frameworks/Tools" originalValue={this.props.profile.otherFrameworksTools} options={Config.profile.otherFrameworksTools} desc="Select all other frameworks/tools that you've worked with (if any)" onChange={this.props.setValue} />

						<CheckboxInput name="mobileTechnologies" title="Mobile Technologies" originalValue={this.props.profile.mobileTechnologies} options={Config.profile.mobileTechnologies} desc="Select all mobile technologies that you've worked with (if any)" onChange={this.props.setValue} />
						<CheckboxInput name="deploymentPlatforms" title="Deployment Platforms" originalValue={this.props.profile.deploymentPlatforms} options={Config.profile.deploymentPlatforms} desc="Select all deployment platforms that you've deployed on (if any)" onChange={this.props.setValue} />
						<CheckboxInput name="databases" title="Databases" originalValue={this.props.profile.databases} options={Config.profile.databases} desc="Select all databases that you've worked with (if any)" onChange={this.props.setValue} />

						<CheckboxInput name="designTypes" title="Design Types" originalValue={this.props.profile.designTypes} options={Config.profile.designTypes} desc="Select all types of design that you've worked on (if applicable)" onChange={this.props.setValue} />
						<CheckboxInput name="designTools" title="Design Tools" originalValue={this.props.profile.designTools} options={Config.profile.designTools} desc="Select all design tools that you've worked with (if applicable)" onChange={this.props.setValue} />
					</form>
				</div>
			</div>
		);
	}
}