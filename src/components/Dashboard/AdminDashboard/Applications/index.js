import React from 'react';

import Notification from 'components/Notification';
import ViewApplication from './viewApplication';
import ApplicationList from './applicationList';

export default class Applications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      application: {},
    };

    this.showApplication = this.showApplication.bind(this);
    this.hideApplication = this.hideApplication.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  showApplication(application) {
    this.setState({
      showing: true,
      application: application,
    });
  }

  hideApplication() {
    this.setState({ showing: false });
  }

  handleError(props) {
    if ((Date.now() - props.applicationsLastAction) > 1000)
      return;

    if (props.applicationsError)
      return this.notification.show('Application Error', props.applicationsError, 'error', 4000);
    if (props.applicationReviewSuccess)
      return this.notification.show('Application Updated', 'Application updated successfully', 'success', 3000);
  }

  componentDidMount() {
    this.handleError(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleError(nextProps);
  }

  render() {
    const pendingApplications = this.props.applications.filter(a => a.status === 'SUBMITTED');
    const acceptedApplications = this.props.applications.filter(a => a.status === 'ACCEPTED');
    const rejectedApplications = this.props.applications.filter(a => a.status === 'REJECTED');

    return (
      <div id="content">
        <Notification ref={n => this.notification = n} />

        <ViewApplication
          showing={this.state.showing}
          application={this.state.application}
          hideApplication={this.hideApplication}
          reviewApplication={this.props.reviewApplication}
          rejectApplication={this.props.rejectApplication}
          acceptApplication={this.props.acceptApplication} />

        <ApplicationList
          title="Pending Applications"
          applications={pendingApplications}
          showApplication={this.showApplication} />

        <ApplicationList
          title="Accepted Applications"
          applications={acceptedApplications}
          showApplication={this.showApplication} />

        <ApplicationList
          title="Rejected Applications"
          applications={rejectedApplications}
          showApplication={this.showApplication} />        
      </div>
    );
  }
}