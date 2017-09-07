import React from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

import DashboardComponent from 'components/Dashboard';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.createApplication = this.createApplication.bind(this);
  }

  createApplication() {
    // TODO: actually do something to create an application
    this.props.history.push('/application');
  }

  render() { 
    return <DashboardComponent admin={this.props.admin} createApplication={this.createApplication} />;
  }
}

const mapStateToProps = state => {
  return {
    admin: false,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
