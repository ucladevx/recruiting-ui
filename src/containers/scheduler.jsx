import React from 'react';
import {connect} from 'react-redux';
import {Action} from 'reducers';
import SchedulerComponent from 'components/Schedule';
import Topbar from 'components/Topbar';
import Button from 'components/Button';

class Scheduler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availability: []
    }
    this.setValue = this.setValue.bind(this);
  }

  convertToDateArray(rawDateArr) {
    let convertedDateArr = [];
    /* Function to convert ["10:00 AM", "10:30 AM", ...]
      into [<Date Object>, <Date Object>, ...]
    */
    return convertedDateArr;
  }

  submit() {
    /* this is the actual function that will run when submit is run */
    /* TODO: still need to transition back to home page, notification, and disengage schedule interview button */
    //this.props.scheduleInterview(this.props.match.params.id, convertToDateArray(this.state.availability.slice()));
  }

  setValue(key, value) {
    this.setState(prev => {
      return { availability: value };
    });
  }

  render() {
    return(
      <div id="content">
        <Topbar/>
        <SchedulerComponent setValue={this.setValue} availability={this.state.availability}/>
        <div className="button-section button-section-right">
          <Button text="Submit" style="green" onClick={this.submit} loading={this.props.applicationUpdating}/>
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
