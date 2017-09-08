import React from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
import {history} from 'history';

import ApplicationComponent from 'components/Application';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.saveAndExit = this.saveAndExit.bind(this);
  }

  saveAndExit(profile) {
    // TODO: save profile
    this.props.history.push('/dashboard');
  }

  render() { 
    return <ApplicationComponent admin={this.props.admin} saveAndExit={this.saveAndExit} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Application);
