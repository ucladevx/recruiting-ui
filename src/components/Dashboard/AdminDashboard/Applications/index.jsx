import React from 'react';
import moment from 'moment';

import Notification from 'components/Notification';
import ApplicationList from './applicationList';
import PieChart from './pieChart';
import LineChart from './lineChart';

export default class Applications extends React.Component {
	constructor(props) {
		super(props);
		this.handleError = this.handleError.bind(this);
	}

	handleError(props) {
		if ((Date.now() - props.applicationsLastAction) > 1000)
			return;

		if (props.applicationsError)
			return this.notification.show('Application Error', props.applicationsError, 'error', 4000);
	}

	componentDidMount() {
		this.handleError(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.handleError(nextProps);
	}

	render() {
		const pendingApplications = [];
		const acceptedApplications = [];
		const rejectedApplications = [];
		const applicationsByDate = {};
		const applicationsByYear = {};
		const applicationsByGender = {};
		const applicationsByRolePreference = {};

		for (const application of this.props.applications) {
			// sort application by status
			switch (application.status) {
				case 'SUBMITTED':
					pendingApplications.push(application);
					break;
				case 'ACCEPTED':
					acceptedApplications.push(application);
					break;
				case 'REJECTED':
					rejectedApplications.push(application);
					break;
				// skip applications that are neither of the above
				default:
					continue;
			}

			// sort application by gender
			if (!applicationsByGender[application.profile.gender])
				applicationsByGender[application.profile.gender] = 0;
			applicationsByGender[application.profile.gender]++;

			// sort application by year
			if (!applicationsByYear[application.profile.year])
				applicationsByYear[application.profile.year] = 0;
			applicationsByYear[application.profile.year]++;

			// sort application by role preference
			if (!applicationsByRolePreference[application.profile.rolePreference])
				applicationsByRolePreference[application.profile.rolePreference] = 0;
			applicationsByRolePreference[application.profile.rolePreference]++;

			// sort application by date
			const date = moment(application.dateSubmitted).format('M/DD');
			if (!applicationsByDate[date])
				applicationsByDate[date] = 0;
			applicationsByDate[date]++;
		}

		const hasApplications = (pendingApplications.length > 0 || acceptedApplications.length > 0 || rejectedApplications.length > 0);

		return (
			<div id="content">
				<Notification ref={n => this.notification = n} />

				{!hasApplications && <p className="info">No applications</p>}

				{hasApplications &&
					<div>
						<h1>Application Statistics</h1>
						<div className="app-stats-container">
							<PieChart title="Gender" data={applicationsByGender} />
							<PieChart title="Year" data={applicationsByYear} />
							<PieChart title="Stack Preference" data={applicationsByRolePreference} />
						</div>
						<div className="app-stats-container">
							<LineChart title="Applications Submitted" data={applicationsByDate} />
						</div>

						<ApplicationList
							title="Pending Applications"
							history={this.props.history}
							applications={pendingApplications} />

						<ApplicationList
							title="Accepted Applications"
							history={this.props.history}
							applications={acceptedApplications} />

						<ApplicationList
							title="Rejected Applications"
							history={this.props.history}
							applications={rejectedApplications} />
					</div>
				}
			</div>
		);
	}
}