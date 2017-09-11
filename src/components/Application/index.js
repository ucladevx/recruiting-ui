import React from 'react';
import Config from 'config';

import Button from 'components/Button';
import Topbar from 'components/Topbar';
import Notification from 'components/Notification';

import ProfilePage from './profilePage';
import EssaysPage from './essaysPage';
import ChallengesPage from './challengesPage';
import ReviewPage from './review';

const PAGE_PROFILE = Symbol();
const PAGE_ESSAYS = Symbol();
const PAGE_CHALLENGES = Symbol();
const PAGE_REVIEW = Symbol();

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.pages = ['Profile', 'Essays', 'Challenges'];
    this.symbolToPageIndex = {
      [PAGE_PROFILE]: 0,
      [PAGE_ESSAYS]: 1,
      [PAGE_CHALLENGES]: 2,
      [PAGE_REVIEW]: 3,
    };
    this.symbolToPageTitle = {
      [PAGE_PROFILE]: 'Profile',
      [PAGE_ESSAYS]: 'Essays',
      [PAGE_CHALLENGES]: 'Challenges',
      [PAGE_REVIEW]: 'Review and Submit',
    };
    this.state = {
      currentPage: PAGE_PROFILE,
      profile: this.props.profile
    };

    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.handleError = this.handleError.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
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
      case PAGE_REVIEW:
        return <ReviewPage profile={this.state.profile} />
      default:
        return null;
    }
  }

  submit() {
    this.props.submitApplication(this.state.profile);
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

  validate() {
    if (this.state.currentPage === PAGE_PROFILE) {
      if (!this.state.profile.firstName)
        return 'First name cannot be empty';
      if (!this.state.profile.lastName)
        return 'Last name cannot be empty';
      if (!this.state.profile.major)
        return 'Major cannot be empty';
      if (!this.state.profile.year)
        return 'You must select your year';
      if (!this.state.profile.gender)
        return 'You must select your gender';
      if (!this.state.profile.tshirt)
        return 'You must select your T-shirt size';
      if (!this.state.profile.rolePreference)
        return 'You must select your role preference';
    }
    if (this.state.currentPage === PAGE_ESSAYS) {
      for (const essay of Config.essays.essays) {
        if (!this.state.profile[essay.name] || !this.state.profile[essay.name].trim())
          return 'You must respond to all of the essays';
      }
    }
    if (this.state.currentPage === PAGE_CHALLENGES) {
      for (const challenge of Config.challenges.challenges) {
        if (!this.state.profile[challenge.name] || !this.state.profile[challenge.name].trim())
          return 'You must respond to all of the challenges';
        if (!this.state.profile[challenge.name+'Language'])
          return 'You must select the language for your response';
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
    this.saveProfile();
    switch (this.state.currentPage) {
      case PAGE_PROFILE:
        return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_ESSAYS }));
      case PAGE_ESSAYS:
        return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_CHALLENGES }));
      case PAGE_CHALLENGES:
        return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_REVIEW }));
    }
  }

  back() {
    this.saveProfile();
    switch (this.state.currentPage) {
      case PAGE_ESSAYS:
        return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_PROFILE }));
      case PAGE_CHALLENGES:
        return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_ESSAYS }));
      case PAGE_REVIEW:
        return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_CHALLENGES }));
    }
  }

  handleError(props) {
    if (props.applicationsError && (Date.now() - props.applicationsLastAction < 1000))
      return this.props.redirectHome();
    if (props.applicationUpdated && (Date.now() - props.applicationsLastAction < 1000))
      return this.notification.show('Application Saved', 'Application saved successfully', 'success', 3000);
  }

  componentWillReceiveProps(nextProps) {
    this.handleError(nextProps);
    if (Object.keys(this.state.profile).length === 0) {
      this.setState(prev => Object.assign({}, prev, { profile: nextProps.profile }));
    }
  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.handleError(this.props);
  }

  render() {
    return (
      <div id="content">
        <Notification ref={n => this.notification = n} />
        <Topbar application pages={this.pages} currentPage={this.symbolToPageIndex[this.state.currentPage]} />
        { this.getCurrentPage() }

        <div className="button-section button-section-right">
          <Button text="Save Application" onClick={ this.saveProfile } />
          { !(this.state.currentPage === PAGE_PROFILE) &&
              <Button text="Back" onClick={ this.back } /> }
          { !(this.state.currentPage === PAGE_REVIEW) && 
              <Button text="Continue" onClick={ this.continue } /> }
          { (this.state.currentPage === PAGE_REVIEW) &&
              <Button text="Submit Application" style="green" onClick={ this.submit } /> }
        </div><br /><br /><br />
      </div>
    );
  }
}