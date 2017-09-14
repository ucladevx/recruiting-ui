import React from 'react';
import {Pie, Line, defaults} from 'react-chartjs-2';

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
    const top  = window.pageYOffset || document.documentElement.scrollTop,
          left = window.pageXOffset || document.documentElement.scrollLeft;
    this.setState({
      showing: true,
      application: application,
      scrollPos: { top, left },
    });
  }

  hideApplication() {
    console.log(this.state.scrollPos);
    window.scrollTo(this.state.scrollPos.left, this.state.scrollPos.top);
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
    const applicationsAvailable = (pendingApplications.length > 0 || acceptedApplications.length > 0 || rejectedApplications.length > 0);

    const data = {
      datasets: [{
        data: [15, 12, 2, 1],
        backgroundColor: ['#80D8FF', '#B9F6CA', '#FF9E80', '#FFE57F'],
      }],
      labels: [
        'Male',
        'Female',
        'Non-binary',
        'Other',
      ]
    };

    const data2 = {
      datasets: [{
        data: [10, 15, 15, 5],
        backgroundColor: ['#80D8FF', '#B9F6CA', '#FF9E80', '#FFE57F'],
      }],
      labels: [
        'Freshman',
        'Sophomore',
        'Junior',
        'Senior'
      ]
    };

    const data3 = {
      datasets: [{
        data: [5, 10, 20, 5],
        backgroundColor: ['#80D8FF', '#B9F6CA', '#FF9E80', '#FFE57F'],
      }],
      labels: [
        'Full Stack',
        'Frontend',
        'Backend',
        'Design',
      ]
    };

    const data4 = {
      labels: ['9/15', '9/16', '9/17', '9/18', '9/19', '9/20', '9/21'],
      datasets: [{
        label: 'Applications Submitted',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(75,192,192,1)',
        pointHoverBorderWidth: 3,
        pointRadius: 3,
        pointHitRadius: 10,
        data: [35, 23, 8, 16, 4, 6, 18],
      }]
    };

    const options = {
      title: {
        display: true,
        text: 'Gender',
        fontFamily: '"Roboto"',
      },
      legend: {
        display: false,
        position: 'bottom',
      },
      responsive: true,
    };

    const options2 = {
      title: {
        display: true,
        text: 'Year',
        fontFamily: '"Roboto"',
      },
      legend: {
        display: false,
        position: 'bottom',
      },
      responsive: true,
    };

    const options3 = {
      title: {
        display: true,
        text: 'Stack Preference',
        fontFamily: '"Roboto"',
      },
      legend: {
        display: false,
        position: 'bottom',
      },
      responsive: true,
    };

    const options4 = {
      title: {
        display: true,
        text: 'Applications Submitted',
        fontFamily: '"Roboto"',
      },
      legend: {
        display: false,
        position: 'bottom',
      },
      responsive: true,
    }

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

        {!applicationsAvailable && 
          <p className="info">No applications</p>
        }

        {applicationsAvailable && 
          <div>
            <h1>Application Statistics</h1>
            <div className="app-stats-container">
              <div className="app-stats">
                <Pie data={data} options={options} height={300} />
              </div>
              <div className="app-stats">
                <Pie data={data2} options={options2} height={300} />
              </div>
              <div className="app-stats">
                <Pie data={data3} options={options3} height={300} />
              </div>
            </div>
            <div className="app-stats-container">
              <div className="app-stats-long">
                <Line data={data4} options={options4} height={300} width={900}/>
              </div>
            </div>

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
        }
      </div>
    );
  }
}