import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Topbar extends React.Component {
  render() {
    return (
      <div className="topbar">
        <div id="topbar-inner">
          <div id="logo"></div>
          { this.props.admin &&
            <div id="navigation">
              <NavLink exact to="/dashboard" activeClassName="selected"><div className="navitem">Applications</div></NavLink>
              <NavLink exact to="/dashboard/settings" activeClassName="selected"><div className="navitem">Settings</div></NavLink>
              <div className="navitem" onClick={this.props.logOut}>Logout</div>
            </div>
          }

          { !this.props.admin &&
            <div id="navigation">
              <div className="navitem" onClick={this.props.logOut}>Logout</div>
            </div>
          }
        </div>
      </div>
    );
  }
}