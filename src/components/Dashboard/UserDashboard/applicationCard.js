import React from 'react';

import Button from 'components/Button';

export default class ApplicationCard extends React.Component {
  render() {
    const { seasonName, status } = this.props.application;
    const inProgress = status === 'IN_PROGRESS';
    const submitted = status === 'SUBMITTED';
    const rejected = status === 'REJECTED';
    const accepted = status === 'ACCEPTED';

    return (
      <div className="card">
        <h2>{seasonName}</h2>
        <div className={`card-item ${inProgress ? 'in-progress' : 'completed'}`}>
          <div className="item-icon"><i className={`fa ${inProgress ? 'fa-warning' : 'fa-check'}`}></i></div>
          <div className="item-text">Profile {inProgress ? 'in progress' : 'completed'}</div>
        </div>
        <div className={`card-item ${inProgress ? 'in-progress' : 'completed'}`}>
          <div className="item-icon"><i className={`fa ${inProgress ? 'fa-warning' : 'fa-check'}`}></i></div>
          <div className="item-text">Application {inProgress ? 'not submitted' : 'submitted'}</div>
        </div>
        <div className={`card-item ${(inProgress || submitted) ? 'in-progress' : 'completed'}`}>
          <div className="item-icon"><i className={`fa ${(inProgress || submitted) ? 'fa-warning' : 'fa-check'}`}></i></div>
          <div className="item-text">Application {(inProgress || submitted) ? 'not reviewed' : 'reviewed'}</div>
        </div>
        <div className="button-section">
          { rejected && <Button small text="View Feedback" /> }
          { accepted && <Button small text="View Feedback" /> }
          { inProgress && <Button small text="Continue Application" /> }
        </div>
      </div>
    );
  }
}