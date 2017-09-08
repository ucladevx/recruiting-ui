import React from 'react';

import Button from 'components/Button';
import Topbar from 'components/Topbar';

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

  saveAndExit() {
    this.props.saveAndExit();
  }

  setValue(key, value) {
    this.profile[key] = value;
  }

  continue() {
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
        <Topbar application pages={this.pages} currentPage={this.symbolToPageIndex[this.state.currentPage]} />
        { this.getCurrentPage() }

        <div className="button-section button-section-right">
          <Button text="Save and Exit" onClick={ this.saveAndExit } />
          { !(this.state.currentPage === PAGE_PROFILE) &&
              <Button text="Back" onClick={ this.back } /> }
          <Button text="Continue" onClick={ this.continue } />
        </div><br /><br /><br />
      </div>
    );
  }
}