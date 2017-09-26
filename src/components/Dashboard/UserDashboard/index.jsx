import React from 'react';

import Topbar from 'components/Topbar';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Notification from 'components/Notification';

import ApplicationCard from './applicationCard';

export default class UserDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.handleError = this.handleError.bind(this);
	}

	handleError(props) {
		if ((Date.now() - props.applicationsLastAction) > 1000)
			return;

		if (props.applicationCreateSuccess)
			return this.notification.show('Application Created', 'Application created successfully. You can now edit it.', 'success', 3000);
		if (props.applicationCreateFailure)
			return this.notification.show('Application Creation Failed', props.applicationsError, 'error', 4000);
		if (props.applicationSubmitSuccess)
			return this.notification.show('Application Submitted', 'Application submitted successfully', 'success', 3000);
		if (props.applicationsError)
			return this.notification.show('Applications Error', props.applicationsError, 'error', 4000);
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
				<Topbar logOut={this.props.logOut} />
				<div id="content">
					<Notification ref={n => this.notification = n} />
					<h1>Welcome to the DevX Recruitment Portal!</h1>
					<p>Have you ever felt that all you were learning at UCLA was theory, with little opportunities to build out practical applications? DevX is dedicated to solving that very problem! Build out real-world projects to help tackle pressing problems frustrating the UCLA community, grow your technical skills by pairing up with experienced students, and build a network that lasts beyond graduation.</p>
					<p>Click "Create application" to begin a new application for the upcoming quarter, or find and continue an existing application below.</p>
					<Button text="Create Application" onClick={this.props.createApplication} id="create-btn" />
					<p><b>What positions can you apply for?</b></p>
					<ol>
						<li><b>Product Manager</b> &mdash; A product manager is the lead for each team within DevX. As a PM, you set the product vision, research the need, prioritize the user, make technical decisions, finalize the MVP, empower your team, and ultimately launch something that makes an impact. You are in charge of building a successful team that can execute. <i>Commitment: 1-hour weekly meetings with other PMs and board to discuss team progress. Additional team meetings to build and discuss your product with your developers and designers.</i></li>
						<li><b>Developer</b> &mdash; Developers are individuals who build the product and its codebase. As a developer, you offer technical and creative input, contribute code on a weekly basis, work with other developers, take initiative on features, and communicate your progress. You are technically savvy and good at keeping your team and PM updated on your work. <i>Commitment: Weekly team meetings to build and discuss your product with your PM and designers. Individual time to code and build out your features.</i></li>
						<li><b>Designer</b> &mdash; Designers are individuals who build the User Experience (UX) and User Interface (UI) of the team’s product. You adopt the user perspective, offer technical and creative input, implement design decisions, and communicate your progress. You work closely with your PM to understand how a user will interact with your product, and spend time making the interface usable and beautiful. You are one step ahead of your developers, so the design is always finalized when it’s time to build. <i>Commitment: Weekly team meetings to build and discuss your product with your PM and developers. Individual time to make design decisions and build frameworks for your features.</i></li>

					</ol>

					<div className="cards">
						{(!applications || applications.length === 0) &&
							<p className="info">No applications</p>
						}
						{(applications && applications.length > 0) &&
							<div>
								<h1>Your Applications</h1>
								{applications.map(application => <ApplicationCard application={application} key={application.id} />)}
							</div>
						}
						{ this.props.applicationGetting && <Loader style="dark" /> }
					</div>
				</div>
			</div>
		);
	}
}