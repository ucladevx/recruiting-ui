import React from 'react';

import UserDashboard from './userDashboard';

export default class Dashboard extends React.Component {
  componentDidMount() {
    document.title = "DevX | Dashboard";
  }
  
  render() {
    const admin = this.props.admin;
    if (!admin)
      return <UserDashboard createApplication={this.props.createApplication} />
    return null;
  }
}