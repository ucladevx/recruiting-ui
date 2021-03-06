import React from 'react';
import {NavLink} from 'react-router-dom';

import Button from 'components/Button';

export default class ApplicationCard extends React.Component {
  render() {
    const { seasonName, status, id } = this.props.application;
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
        <div className={`card-item ${(inProgress || submitted || rejected) ? 'in-progress' : 'completed'}`}>
          <div className="item-icon"><i className={`fa ${(inProgress || submitted || rejected) ? 'fa-warning' : 'fa-check'}`}></i></div>
          { (inProgress || submitted) && <div className="item-text">Application not reviewed</div> }
          { (accepted) && <div className="item-text">Application accepted!</div> }
          { (rejected) && <div className="item-text">Feedback available</div> }

        </div>
        <div className="button-section">
          { rejected && <NavLink to={`/view/${id}`}><Button small text="View Feedback" /></NavLink> }
          { accepted && <NavLink to={`/view/${id}`}><Button small text="View Feedback" /></NavLink> }
          { submitted && <NavLink to={`/view/${id}`}><Button small text="View Application" /></NavLink> }
          { inProgress && <NavLink to={`/application/${id}`}><Button small text="Continue Application" /></NavLink> }
        </div>
      </div>
    );
  }
}