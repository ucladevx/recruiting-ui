import React from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

import Topbar from 'components/Topbar';

import {Action} from 'reducers';
import CheckboxInput from 'components/Application/elements/checkboxInput';
import profile from 'config/profile';
import Button from 'components/Button';

import './schedule_style.scss'

class Schedule extends React.Component {
	constructor(props) {
		super(props);

    this.scheduleInterview = this.scheduleInterview.bind(this);
	}

	componentWillMount() {
	}

  scheduleInterview() {
    let a = new Date(1520931727000);
    let b = new Date(1523610127000);
    let c = new Date(1526202127000);
    // TODO: Actually gather checkform data and build a real Date() array
    let chosenTimes = [a, b, c];
    this.props.scheduleInterview(this.props.match.params.id, chosenTimes);
  }

  render() {
    // BEGIN HACK - generate checkboxes
    let times = [];
    for(let i = 0; i < profile.interviewTimes.length; i++) {
      times.push(<div>
        <p>{profile.interviewTimes[i]}</p>
        <label className="container">
          <input type="checkbox" value={profile.interviewTimes[i]}/>
          <span className="checkmark"></span>
        </label>
        </div>);
    }

    return <div id="content">
			<Topbar />
      <h1>Schedule Interview</h1>
      <h3>Please select what times you are available for an interview.</h3>
      <p>We've decided to make the interview mostly behavioral. We may ask minor technical questions, but the majority of it will be focused on your passion for the club as well as past experiences, so don't worry about practicing leet code/hacker rank questions! Make sure to come prepared to talk about your resume, internships, and projects.</p>
      <p>Interviews will be approximately 20 mins with 15 mins being the interview and 5 mins being some time for you to ask us questions; interviews will take place online through Google Hangouts. The invites will be sent to you approximately 10 mins before the interview.</p>

      <div className="card card-wide profile-card">
        <form className="app-form">
          <label className="input-title">Interview Times</label><br />
          <div class="column">
            {times} 
          </div>
        </form>
      </div>

      <Button text="Submit" style="green" onClick={this.scheduleInterview}/>

    </div>;
  }
}

const mapStateToProps = state => {
  return {
    schedulingInterview: state.Applications.get('scheduleInterview'),
    schedulingInterviewSuccess: state.Applications.get('schedulingInterviewSuccess'),
    schedulingInterviewFailure: state.Applications.get('schedulingInterviewFailure')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    scheduleInterview: (id, times) => {
      dispatch(Action.ScheduleInterview(id, times));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
