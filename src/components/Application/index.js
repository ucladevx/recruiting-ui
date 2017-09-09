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

    this.profile = {};
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
    };

    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.saveAndExit = this.saveAndExit.bind(this);
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
        return <ProfilePage profile={this.profile} setValue={this.setValue} />;
      case PAGE_ESSAYS:
        return <EssaysPage profile={this.profile} setValue={this.setValue} />;
      case PAGE_CHALLENGES:
        return <ChallengesPage profile={this.profile} setValue={this.setValue} />;
      case PAGE_REVIEW:
        return <ReviewPage profile={this.profile} />
      default:
        return null;
    }
  }

  submit() {
    this.props.submitApplication(this.profile);
  }

  saveAndExit() {
    this.props.saveAndExit(this.profile);
  }

  setValue(key, value) {
    this.profile[key] = value;
  }

  validate() {
    if (this.state.currentPage === PAGE_PROFILE) {
      if (!this.profile.firstName)
        return 'First name cannot be empty';
      if (!this.profile.lastName)
        return 'Last name cannot be empty';
      if (!this.profile.major)
        return 'Major cannot be empty';
      if (!this.profile.year)
        return 'You must select your year';
      if (!this.profile.gender)
        return 'You must select your gender';
      if (!this.profile.tshirt)
        return 'You must select your T-shirt size';
      if (!this.profile.rolePreference)
        return 'You must select your role preference';
    }
    if (this.state.currentPage === PAGE_ESSAYS) {
      for (const essay of Config.essays.essays) {
        if (!this.profile[essay.name] || !this.profile[essay.name].trim())
          return 'You must respond to all of the essays';
      }
    }
    if (this.state.currentPage === PAGE_CHALLENGES) {
      for (const challenge of Config.challenges.challenges) {
        if (!this.profile[challenge.name] || !this.profile[challenge.name].trim())
          return 'You must respond to all of the challenges';
        if (!this.profile[challenge.name+'Language'])
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
    switch (this.state.currentPage) {
      case PAGE_ESSAYS:
        return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_PROFILE }));
      case PAGE_CHALLENGES:
        return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_ESSAYS }));
      case PAGE_REVIEW:
        return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_CHALLENGES }));
    }
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div id="content">
        <Notification ref={n => this.notification = n} />
        <Topbar application pages={this.pages} currentPage={this.symbolToPageIndex[this.state.currentPage]} />
        { this.getCurrentPage() }

        <div className="button-section button-section-right">
          <Button text="Save and Exit" onClick={ this.saveAndExit } />
          { !(this.state.currentPage === PAGE_PROFILE) &&
              <Button text="Back" onClick={ this.back } /> }
          { !(this.state.currentPage === PAGE_REVIEW) && 
              <Button text="Continue" onClick={ this.continue } /> }
          { (this.state.currentPage === PAGE_REVIEW) &&
              <Button text="Submit Application" onClick={ this.submit } /> }
        </div><br /><br /><br />
      </div>
    );
  }
}