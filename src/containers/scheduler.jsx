import React from 'react';
import {connect} from 'react-redux';
import {Action} from 'reducers';
import SchedulerComponent from 'components/Schedule';
import Topbar from 'components/Topbar';
import Button from 'components/Button';
import Config from 'config';
import Notification from 'components/Notification';
import {replace} from 'react-router-redux';

function getDayName(dateStr) {
  let d = new Date(dateStr);
  let dayNum = d.getDay();
  if(dayNum == 0) return 'Sunday';
  else if(dayNum == 1) return 'Monday';
  else if(dayNum == 2) return 'Tuesday';
  else if(dayNum == 3) return 'Wednesday';
  else if(dayNum == 4) return 'Thursday';
  else if(dayNum == 5) return 'Friday';
  else if(dayNum == 6) return 'Saturday';
}

function convertToDateArray(dayOfWeek, rawDateArr) {
  if(rawDateArr.length == 0) return [];
  let convertedDateArr = [];
  rawDateArr.map((time, i) => {
    let dateStr = dayOfWeek + " " + rawDateArr[i];
    let d = new Date(dateStr);
    convertedDateArr.push(d);
  });
  return convertedDateArr;
}

class Scheduler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: []
    }
    this.setValue = this.setValue.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  submit() {
    let monday = convertToDateArray(Config.schedule.interviewDays[0], this.state.Monday);
    let tuesday = convertToDateArray(Config.schedule.interviewDays[1], this.state.Tuesday);
    let wednesday = convertToDateArray(Config.schedule.interviewDays[2], this.state.Wednesday);
    let thursday = convertToDateArray(Config.schedule.interviewDays[3], this.state.Thursday);
    let friday = convertToDateArray(Config.schedule.interviewDays[4], this.state.Friday);
    let final = monday.concat(tuesday.concat(wednesday.concat(thursday.concat(friday))));
    /* TODO: still need to transition back to home page, notification, and disengage schedule interview button */
    this.notification.show("Interview availability updated", "Interview availability save successfully", 'success', 3000);
    this.props.scheduleInterview(this.props.match.params.id, final);
    this.props.redirectHome();
  }

  setValue(key, value) {
    this.setState(prev => {
      let newState = Object.assign({}, this.state);
      newState[key] = value;
      return newState;
    });
  }

  render() {
    return(
      <div id="content">
				<Notification ref={n => this.notification = n} />
        <Topbar/>
        <div className="cards">
          <div className="card card-wide profile-card">
            <h1>Schedule an Interview</h1>
            <p>Congratulations on making it to this phase of the DevX interview process! In this next phase, you will be meeting with a few current DevX members to further discuss you qualifications. Please let us know when you are free below!</p>
            {
              Config.schedule.interviewDays.map((day, i) => {
                let dayName = getDayName(Config.schedule.interviewDays[i]);
                return <SchedulerComponent key={i} day={dayName} setValue={this.setValue} availability={this.state[dayName]}/>
              })
            }
          </div>
        </div>
        <div className="button-section button-section-right">
          <Button text="Submit" style="green" onClick={this.submit} />
        </div>
      </div>
    );
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
    },
    redirectHome: () => {
      dispatch(replace('/'));
    }
  }
}

/*
const mapStateToProps = state => {
  return {
    admin: state.Auth.get('isAdmin'),
		authenticated: state.Auth.get('authenticated'),
    availability: state.Applications.get('application').availability || [],
		applicationUpdating: state.Applications.get('applicationUpdating'),
		applicationUpdateSuccess: state.Applications.get('applicationUpdateSuccess'),
		applicationUpdateFailure: state.Applications.get('applicationUpdateFailure'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
		logOut: () => {
			dispatch(Action.LogoutUser());
		},
		redirectHome: () => {
			dispatch(replace('/'));
		},
		getApplication: (id) => {
			dispatch(Action.GetApplication(id));
		},
    scheduleInterview: (id, availability) => {
      dispatch(Action.ScheduleInterview(id, availability));
    }
  }
}
*/

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
