import React from 'react';

import AppTopbar from './appTopbar';
import Topbar from './topbar';

export default class TopbarComponent extends React.Component {
  render() {
    const admin = this.props.admin;
    const appTopbar = this.props.application;

    if (appTopbar)
      return <AppTopbar admin={admin} pages={this.props.pages} currentPage={this.props.currentPage} />
    return <Topbar admin={admin} />
  }
}