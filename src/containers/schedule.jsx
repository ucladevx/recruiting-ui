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
      <h1>Schedule Interview</h1>
      <h3>Please select what times you are available for an interview.</h3>
      <p>We've decided to make the interview mostly behavioral. We may ask minor technical questions, but the majority of it will be focused on your passion for the club as well as past experiences, so don't worry about practicing leet code/hacker rank questions! Make sure to come prepared to talk about your resume, internships, and projects.</p>
      <p>Interviews will be approximately 20 mins with 15 mins being the interview and 5 mins being some time for you to ask us questions. Interviews will take place online through Google Hangouts. The invites will be sent to you approximately 10 mins before the interview.</p>

    </div>;
  }
}

export default Schedule
