import React from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

import Topbar from 'components/Topbar';

import {Action} from 'reducers';

class Schedule extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
	}

  render() {
    return <div id="content">
			<Topbar />
    </div>;
  }
}

export default Schedule
