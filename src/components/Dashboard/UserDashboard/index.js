import React from 'react';

import Topbar from 'components/Topbar';
import Button from 'components/Button';
import Notification from 'components/Notification';

import ApplicationCard from './applicationCard';

export default class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleError = this.handleError.bind(this);
  }

  handleError(props) {
    if (props.applicationsError && (Date.now() - props.applicationsLastAction < 1000))
      return this.notification.show('Applications Error', props.applicationsError, 'error', 4000);
    if (props.applicationCreated && (Date.now() - props.applicationsLastAction < 1000))
      return this.notification.show('Application Created', 'Application created successfully. You can now edit it.', 'success', 3000);
  }

  componentDidMount() {
    this.handleError(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleError(nextProps);
  }

  render() {
    const applications = this.props.applications;
    return (
      <div>
        <Topbar />
        <div id="content">
          <Notification ref={n => this.notification = n} />
          <h1>Welcome to the DevX Recruitment Portal!</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis. Maecenas eu aliquam lorem. Donec eleifend odio arcu, at fringilla purus pharetra vitae. Donec eleifend, erat sed cursus euismod, mauris magna tincidunt est, sed hendrerit sem tellus id ex. In varius ullamcorper dolor varius ultrices. In quis euismod massa, id faucibus lacus. Donec rutrum tempus mi, ac pellentesque arcu scelerisque in. Maecenas vehicula massa at neque pharetra, non semper risus fringilla. Nunc vulputate erat nec blandit pretium. Nulla ac fringilla nisi. Nam venenatis ultricies lacus, id ullamcorper neque accumsan vitae. Curabitur a odio eget arcu blandit pellentesque sit amet eu tortor.</p>
          <p>Nulla eu orci lobortis, fermentum neque et, interdum nisl. Cras interdum iaculis est, eu aliquet libero viverra nec. Donec venenatis, dui bibendum varius dapibus, felis lectus eleifend risus, sed elementum tortor odio a leo. Morbi nisl metus, luctus ut porta eget, lobortis at lacus. Cras varius quam ipsum, gravida vulputate urna auctor vitae. Nullam egestas cursus ipsum luctus efficitur. Donec at augue sapien. Mauris a dui lobortis, aliquet est ac, faucibus nibh. Etiam lobortis sem in nisi tincidunt luctus.</p>                    
          <Button text="Create Application" onClick={this.props.createApplication} />

          <h1>Your Applications</h1>
          <div className="cards">
            {applications.length > 0 && applications.map(application => 
              <ApplicationCard application={application} key={application.id} />
            )}
            {/*<div className="card">
              <h2>Winter 2017</h2>
              <div className="card-item completed">
                <div className="item-icon"><i className="fa fa-check"></i></div>
                <div className="item-text">Profile completed</div>
              </div>
              <div className="card-item completed">
                <div className="item-icon"><i className="fa fa-check"></i></div>
                <div className="item-text">Challenges completed</div>
              </div>
              <div className="card-item completed">
                <div className="item-icon"><i className="fa fa-check"></i></div>
                <div className="item-text">Application submitted</div>
              </div>
              <div className="card-item in-progress">
                <div className="item-icon"><i className="fa fa-warning"></i></div>
                <div className="item-text">Feedback Received</div>
              </div>
              <div className="button-section">
                <Button small text="View Feedback" />
              </div>
            </div>
            <div className="card">
              <h2>Spring 2017</h2>
              <div className="card-item completed">
                <div className="item-icon"><i className="fa fa-check"></i></div>
                <div className="item-text">Profile completed</div>
              </div>
              <div className="card-item completed">
                <div className="item-icon"><i className="fa fa-check"></i></div>
                <div className="item-text">Challenges completed</div>
              </div>
              <div className="card-item completed">
                <div className="item-icon"><i className="fa fa-check"></i></div>
                <div className="item-text">Application submitted</div>
              </div>
              <div className="card-item completed">
                <div className="item-icon"><i className="fa fa-thumbs-up"></i></div>
                <div className="item-text">Accepted!</div>
              </div>
              <div className="button-section">
                <Button small text="View Acceptance" />
              </div>
            </div>
            <div className="card">
              <h2>Fall 2017</h2>
              <div className="card-item completed">
                <div className="item-icon"><i className="fa fa-check"></i></div>
                <div className="item-text">Profile completed</div>
              </div>
              <div className="card-item in-progress">
                <div className="item-icon"><i className="fa fa-warning"></i></div>
                <div className="item-text">3/5 Challenges completed</div>
              </div>
              <div className="button-section">
                <Button small text="Continue Application" onClick={this.props.createApplication} />
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    );
  }
}