import React from 'react';

import Config from 'config';
import Button from 'components/Button';
import Topbar from 'components/Topbar';

import TextAreaInput from '../elements/textAreaInput';
import SelectInput from '../elements/selectInput';
import CodeInput from '../elements/codeInput';

export default class ProfilePage extends React.Component {
	constructor(props) {
		super(props);
	}

	changeHandler(e) {
		const { name, value } = e.target;
		this.props.onChange(name, value);
		this.setState(prev => Object.assign({}, prev, { value }));
	}

	componentDidMount() {
		window.scroll(0, 0);
	}

	render() {
		const challenges = Config.challenges[this.props.profile.rolePreference];
		return (
			<div className="cards">
				{ challenges.length > 0 &&
					<div className="card card-wide profile-card">
						<h1>Technical Challenges</h1>
						<p>The following challenge(s) will give you the opportunity to showcase your potential. We are not looking for one perfect solution or for you to be an expert in any particular language or coding style. Rather, we are looking to see how you approach and solve a particular problem. You are free to pick any language you are comfortable with in order to craft a solution. You can pick and choose whichever challenges you feel best reflect your abilities. Since our applicant pool has a diverse set of skills, we created a diverse set of challenges. <b>We do not expect all candidates to be able to solve all of these problems.</b></p>
						<p>It is acceptable to consult any external reference to complete these challenges except, of course, the solution. However, be sure to show off your creativity and problem-solving skills when developing your solution! Completing these challenges will only add to your application, not detract from it, so please complete it to the best of your ability.</p>
						<p>Since you selected <b>{this.props.profile.rolePreference}</b>, we've modified your challenges to better suit your skills. Fields marked <span className="required-field">*</span> are required.</p>
					</div>
				}
				{ challenges.length === 0 &&
					<div className="card card-wide profile-card">
						<h1>Hooray! No challenges!</h1>
						<p>Congratulations. As a <b>{this.props.profile.rolePreference}</b>, you don't have to complete any coding challenges! You can move on.</p>
					</div>
				}
				{ challenges.map(challenge =>
					<div className="card card-wide profile-card" key={challenge.name}>
						<form className="app-form">
							<h1>{challenge.title}{ challenge.required && <span className="required-field">*</span> }</h1>
							<p dangerouslySetInnerHTML={{ __html: challenge.desc }}></p>

							{ !challenge.written &&
								<div>
									<CodeInput originalValue={this.props.profile[challenge.name]} name={challenge.name} example={challenge.example} onChange={this.props.setValue} />
									<SelectInput originalValue={this.props.profile[challenge.name + 'Language']} name={challenge.name + 'Language'} title="Language" options={Config.challenges.languages} onChange={this.props.setValue} />
								</div>
							}

							{ challenge.written &&
								<textarea name={challenge.name} value={this.props.profile[challenge.name]} onChange={this.changeHandler.bind(this)}></textarea>
							}
						</form>
					</div>
				)}
			</div>
		);
	}
}