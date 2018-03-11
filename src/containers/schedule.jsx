import React from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

import {Action} from 'reducers';

class Schedule extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		if (!this.props.authenticated)
			return this.props.logOut();
		if (this.props.admin)
			return this.props.redirectHome();
		if (this.props.match.params.id)
			this.props.getApplication(this.props.match.params.id);
	}

  render() {
    return <h1>Hello World</h1>
  }
}
