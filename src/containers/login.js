import React from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

import {Action} from 'reducers';
import LoginComponent from 'components/Login'

class Login extends React.Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.redirectHome();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      this.props.redirectHome();
    }
  }

  render() {
    return <LoginComponent />;
  }
}

const mapStateToProps = state => {
  return {
    test: 'test'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    redirectHome: () => {
      dispatch(replace('/'));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
