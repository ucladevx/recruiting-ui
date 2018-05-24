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
        <form className="app-form">
          <CheckboxInput name={this.props.day} originalValue={this.props.availability} title={this.props.day} onChange={this.props.setValue} desc="Please mark the times you would be available for a 30-minute interview." options={Config.schedule.interviewTimes}/>
        </form>
    );
  }
 
}


