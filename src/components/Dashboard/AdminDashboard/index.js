import React from 'react';
import {Route} from 'react-router-dom';

import Topbar from 'components/Topbar';

import Applications from './Applications';
import Settings from './Settings';

export default class AdminDashboard extends React.Component {
  render() {
    return (
      <div>
        <Topbar admin logOut={this.props.logOut} />
        <Route exact path={`${this.props.match.url}`} component={() => 
          <Applications {...this.props} />
        } />
        <Route path={`${this.props.match.url}/settings`} component={() => 
          <Settings {...this.props} />
        } />
      </div>
    );
  }
}