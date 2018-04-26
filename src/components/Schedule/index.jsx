import React from 'react';
import Config from 'config';

import Notification from 'components/Notification';

import CheckboxInput from 'components/Application/elements/checkboxInput';

export default class Scheduler extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="cards">
        <div className="card card-wide profile-card">
          <h1>Schedule an Interview</h1>
          <p>Congratulations on making it to this phase of the DevX interview process! In this next phase, you will be meeting with a few current DevX members to further discuss you qualifications. Please let us know when you are free below!</p>
          <form className="app-form">
            <CheckboxInput name="availability" originalValue={this.props.availability} title="Availability" onChange={this.props.setValue} desc="Please mark the times you would be available for a 30-minutes interview." options={Config.profile.interviewTimes}/>
          </form>
        </div>
      </div>
    );
  }
}
