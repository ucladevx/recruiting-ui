import React from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

import Topbar from 'components/Topbar';

import {Action} from 'reducers';
import CheckboxInput from 'components/Application/elements/checkboxInput';
import profile from 'config/profile';
import Button from 'components/Button';

class Schedule extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
	}


  render() {
    let times = [];
    for(let i = 0; i < profile.interviewTimes.length; i++) {
      times.push(<p>{profile.interviewTimes[i]}</p>);
      times.push(<input type="checkbox" value={profile.interviewTimes[i]}/>);
    }

    return <div id="content">
			<Topbar />
      <h1>Schedule Interview</h1>
      <h3>Please select what times you are available for an interview.</h3>
      <p>We've decided to make the interview mostly behavioral. We may ask minor technical questions, but the majority of it will be focused on your passion for the club as well as past experiences, so don't worry about practicing leet code/hacker rank questions! Make sure to come prepared to talk about your resume, internships, and projects.</p>
      <p>Interviews will be appproximately 20 mins with 15 mins being the interview and 5 mins being some time for you to ask us questions. Interviews will take place online through Google Hangouts. The invites will be sent to you approximately 10 mins before the interview.</p>

      <div className="card card-wide profile-card">
        <form className="app-form">
          <label className="input-title">Interview Times</label><br />
          {times}
          <CheckboxInput name="times" title="Monday" options={profile.interviewTimes} originalValue={[]} onClick={profile.interviewTimes} review />
        </form>
      </div>

      <Button text="Submit" style="green" />

    </div>;
  }
}

export default Schedule
