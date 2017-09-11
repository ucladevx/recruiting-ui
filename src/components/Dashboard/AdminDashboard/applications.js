import React from 'react';

export default class Applications extends React.Component {
  render() {
    const pendingApplications = this.props.applications.filter(a => a.status === 'SUBMITTED');
    const acceptedApplications = this.props.applications.filter(a => a.status === 'ACCEPTED');
    const rejectedApplications = this.props.applications.filter(a => a.status === 'REJECTED');

    return (
      <div id="content">
        <h1>Pending Applications <span className="app-count">({pendingApplications.length})</span></h1>
        <h1>Accepted Applications <span className="app-count">({acceptedApplications.length})</span></h1>
        <h1>Rejected Applications <span className="app-count">({rejectedApplications.length})</span></h1>
      </div>
    );
  }
}