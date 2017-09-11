import React from 'react';
import {Route} from 'react-router-dom';

import Topbar from 'components/Topbar';
import Button from 'components/Button';

import Applications from './applications';
import Settings from './settings';

export default class AdminDashboard extends React.Component {
  render() {
    return (
      <div>
        <Topbar admin />
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