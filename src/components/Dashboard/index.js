import React from 'react';

import UserDashboard from 'components/Dashboard/UserDashboard';
import AdminDashboard from 'components/Dashboard/AdminDashboard';

export default class Dashboard extends React.Component {
  componentDidMount() {
    document.title = "DevX | Dashboard";
  }
  
  render() {
    if (this.props.admin) {
      return <AdminDashboard {...this.props} />
    }
    return <UserDashboard {...this.props} />
  }
}