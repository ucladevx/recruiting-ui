import React from 'react';
import Config from 'config';

import Button from 'components/Button';
import Topbar from 'components/Topbar';
import Notification from 'components/Notification';

import ProfilePage from './pages/profilePage';
import EssaysPage from './pages/essaysPage';
import ChallengesPage from './pages/challengesPage';
import ViewPage from './viewApplication';

const PAGE_PROFILE = Symbol();
const PAGE_ESSAYS = Symbol();
const PAGE_CHALLENGES = Symbol();
const PAGE_VIEW = Symbol();

export default class Application extends React.Component {
	constructor(props) {
		super(props);

		this.pages = ['Profile', 'Essays', 'Challenges'];
		this.symbolToPageIndex = {
			[PAGE_PROFILE]: 0,
			[PAGE_ESSAYS]: 1,
			[PAGE_CHALLENGES]: 2,
			[PAGE_VIEW]: 3,
		};
		this.pageIndexToSymbol = {
			0: PAGE_PROFILE,
			1: PAGE_ESSAYS,
			2: PAGE_CHALLENGES,
			3: PAGE_VIEW,
		};
		this.symbolToPageTitle = {
			[PAGE_PROFILE]: 'Profile',
			[PAGE_ESSAYS]: 'Essays',
			[PAGE_CHALLENGES]: 'Challenges',
			[PAGE_VIEW]: 'Review',
		};

		this.state = {
			currentPage: this.props.review ? PAGE_VIEW : PAGE_PROFILE,
			profile: this.props.profile
		};

		this.getCurrentPage = this.getCurrentPage.bind(this);
		this.handleError = this.handleError.bind(this);
		this.saveProfile = this.saveProfile.bind(this);
		this.navigateTo = this.navigateTo.bind(this);
		this.setValue = this.setValue.bind(this);
		this.continue = this.continue.bind(this);
		this.validate = this.validate.bind(this);
		this.submit = this.submit.bind(this);
		this.back = this.back.bind(this);
	}

	getCurrentPage() {
		document.title = 'DevX | ' + this.symbolToPageTitle[this.state.currentPage];
		switch (this.state.currentPage) {
			case PAGE_PROFILE:
				return <ProfilePage profile={this.state.profile} setValue={this.setValue} />;
			case PAGE_ESSAYS:
				return <EssaysPage profile={this.state.profile} setValue={this.setValue} />;
			case PAGE_CHALLENGES:
				return <ChallengesPage profile={this.state.profile} setValue={this.setValue} />;
			case PAGE_VIEW:
				return <ViewPage profile={this.state.profile} submitted={this.props.review} {...this.props} />
			default:
				return null;
		}
	}

	submit() {
		this.props.submitApplication(this.props.applicationId);
	}

	saveProfile() {
		this.props.updateApplicationProfile(this.props.applicationId, this.state.profile);
	}

	setValue(key, value) {
		this.setState(prev => {
			const newState = Object.assign({}, prev);
			newState.profile[key] = value;
			return newState;
		});
	}

	validate(page) {
		const currentPage = page || this.state.currentPage;
		if (currentPage === PAGE_PROFILE) {
			if (!this.state.profile.firstName)
				return 'First name cannot be empty';
			if (!this.state.profile.lastName)
				return 'Last name cannot be empty';
			if (!this.state.profile.major)
				return 'Major cannot be empty';
			if (!this.state.profile.race)
				return 'You must select your race.';
			if (!/^(?:https?:\/\/)?[^\.][\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.state.profile.resume))
				return 'Resume Link must be a valid URL';

			if (this.state.profile.rolePreference === 'Designer' && !this.state.profile.website)
				return 'As a designer, you must submit a valid portfolio URL';

			if (this.state.profile.linkedin)
				if (!/^https?:\/\/(?:www\.)?linkedin\.com\/in\/.+/.test(this.state.profile.linkedin))
					return 'LinkedIn URL must be either empty or a valid profile URL';
			if (this.state.profile.github)
				if (!/^https?:\/\/(?:www\.)?github\.com\/.+/.test(this.state.profile.github))
					return 'GitHub URL must be either empty or a valid profile URL';
			if (this.state.profile.website)
				if (!/^(?:https?:\/\/)?[^\.][\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.state.profile.website))
					return 'Personal website URL must be either empty or a valid URL';

			if (!this.state.profile.year)
				return 'You must select your year';
			if (!this.state.profile.gender)
				return 'You must select your gender';
			if (!this.state.profile.tshirt)
				return 'You must select your T-shirt size';
			if (!this.state.profile.rolePreference)
				return 'You must select your role preference';
		}
		if (currentPage === PAGE_ESSAYS) {
			for (const essay of (Config.essays[this.state.profile.rolePreference] || [])) {
				if (essay.required && (!this.state.profile[essay.name] || !this.state.profile[essay.name].trim()))
					return `You must answer '${essay.title}'`;
			}
		}

		if (currentPage === PAGE_CHALLENGES) {
			for (const challenge of (Config.challenges[this.state.profile.rolePreference] || [])) {
				if (challenge.required) {
					if (!this.state.profile[challenge.name] || !this.state.profile[challenge.name].trim())
						return `You must answer '${challenge.title}`;
					if (!this.state.profile[challenge.name+'Language'])
						return `You must select the language for your response to '${challenge.title}'`;
				}

				if (this.state.profile[challenge.name] && !this.state.profile[challenge.name+'Language'])
					return `You must select the language for your response to '${challenge.title}'`;
			}
		}
		return null;
	}

	continue() {
		const error = this.validate();
		if (error) {
			this.notification.show('Validation Error', error, 'error', 5000);
			return;
		}
		if (!this.props.review)
			this.saveProfile();
		switch (this.state.currentPage) {
			case PAGE_PROFILE:
				return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_ESSAYS }));
			case PAGE_ESSAYS:
				return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_CHALLENGES }));
			case PAGE_CHALLENGES:
				return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_VIEW }));
		}
	}

	back() {
		if (!this.props.review)
			this.saveProfile();
		switch (this.state.currentPage) {
			case PAGE_ESSAYS:
				return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_PROFILE }));
			case PAGE_CHALLENGES:
				return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_ESSAYS }));
			case PAGE_VIEW:
				return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_CHALLENGES }));
		}
	}

	navigateTo(e, i) {
		// only allow navigation if the application is in progress
		if (this.props.review)
			return;
		e.preventDefault();
		// validate if trying to move on
		if (i > this.symbolToPageIndex[this.state.currentPage]) {
			for (let j = this.symbolToPageIndex[this.state.currentPage]; j < i; j++) {
				const error = this.validate(this.pageIndexToSymbol[j]);
				if (error) {
					this.setState(prev => Object.assign({}, prev, { currentPage: this.pageIndexToSymbol[j] }));
					this.notification.show('Validation Error', error, 'error', 5000);
					return;
				}
			}
		}

		this.setState(prev => Object.assign({}, prev, { currentPage: this.pageIndexToSymbol[i] }));
		this.saveProfile();
	}

	handleError(props) {
		if ((Date.now() - props.lastAction) > 1000)
			return;

		if (props.applicationUpdateFailure)
			return this.notification.show('Application Save Failed', props.error, 'error', 4000);
		if (props.applicationUpdateSuccess)
			return this.notification.show('Application Saved', 'Application saved successfully', 'success', 3000);
		if (props.applicationSubmitFailure)
			return this.notification.show('Application Submit Failed', props.error, 'error', 4000);
		if (props.applicationSubmitSuccess)
			return this.props.redirectHome();
		}

	componentWillReceiveProps(nextProps) {
		this.handleError(nextProps);
		this.setState(prev => {
			const newState = Object.assign({}, prev);
			newState.profile = nextProps.profile;
			return newState;
		});
	}

	componentDidMount() {
		window.scrollTo(0,0);
		this.handleError(this.props);
	}

	componentWillUnmount() {
		this.setState(prev => {
			const newState = Object.assign({}, prev);
			newState.profile = {};
			return newState;
		})
	}

	render() {
		return (
			<div id="content">
				<Notification ref={n => this.notification = n} />
				<Topbar application pages={this.pages} currentPage={this.symbolToPageIndex[this.state.currentPage]} clickDot={this.navigateTo} />
				{ this.getCurrentPage() }

				{ !this.props.review &&
					<div className="button-section button-section-right">
						<Button text="Save Application" onClick={ this.saveProfile } loading={this.props.applicationUpdating} />
						{ !(this.state.currentPage === PAGE_PROFILE) &&
								<Button text="Back" onClick={ this.back } /> }
						{ !(this.state.currentPage === PAGE_VIEW) &&
								<Button text="Continue" onClick={ this.continue } /> }
						{ (this.state.currentPage === PAGE_VIEW) &&
								<Button text="Submit Application" style="green" onClick={ this.submit } loading={this.props.applicationSubmitting}/> }
					</div>
				}
			</div>
		);
	}
}