import React from 'react';

import Button from 'components/Button';
import Topbar from 'components/Topbar';

import ProfilePage from './profilePage';
import EssaysPage from './essaysPage';
import ChallengesPage from './challengesPage';

const PAGE_PROFILE = Symbol();
const PAGE_ESSAYS = Symbol();
const PAGE_CHALLENGES = Symbol();
// const PAGE_REVIEW = Symbol();

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.pages = ['Profile', 'Essays', 'Challenges'];
    this.symbolToPageIndex = {
      [PAGE_PROFILE]: 0,
      [PAGE_ESSAYS]: 1,
      [PAGE_CHALLENGES]: 2,
    };

    this.state = {
      currentPage: PAGE_PROFILE,
    };

    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.saveAndExit = this.saveAndExit.bind(this);
    this.continue = this.continue.bind(this);
  }

  getCurrentPage() {
    switch (this.state.currentPage) {
      case PAGE_PROFILE:
        return <ProfilePage />;
      case PAGE_ESSAYS:
        return <EssaysPage />;
      case PAGE_CHALLENGES:
        return <ChallengesPage />;
      default:
        return null;
    }
  }

  saveAndExit() {
    this.props.saveAndExit();
  }

  continue() {
    switch (this.state.currentPage) {
      case PAGE_PROFILE:
        return this.setState(prev => Object.assign({}, prev, { currentPage: PAGE_ESSAYS }));
      case PAGE_ESSAYS:
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
          <Button text="Continue" onClick={ this.continue } />
        </div><br /><br /><br />
      </div>
    );
  }
}