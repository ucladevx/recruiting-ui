import React from 'react';

export default class ApplicationList extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.title} <span className="app-count">({this.props.applications.length})</span></h1>
				<table className="app-list interactive">
					<thead><tr><td>Name</td><td>Role</td><td>Rating</td></tr></thead>
					<tbody>
						{this.props.applications.map(application =>
							<tr key={application.id} onClick={() => this.props.showApplication(application)}>
								<td>{application.profile.firstName} {application.profile.lastName}</td>
								<td>{application.profile.rolePreference}</td>
								<td>
									{ application.rating.map(i => <i key={i} className="fa fa-star"></i>)}
									{ (5 - application.rating).map(i => <i key={i} className="fa fa-star-o"></i>)}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}