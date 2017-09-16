import React from 'react';

import Notification from 'components/Notification';
import RecruitmentSeasons from './recruitmentSeasons';

export default class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.handleError = this.handleError.bind(this);
	}

	handleError(props) {
		if ((Date.now() - props.seasonsLastAction) > 1000)
			return;
		if (props.seasonsGetFailure)
			return this.notification.show('Seasons Get Failure', props.seasonsError, 'error', 4000);
		if (props.seasonDeleteSuccess)
			return this.notification.show('Season Deleted', 'Season deleted successfully', 'success', 3000);
		if (props.seasonDeleteFailure)
			return this.notification.show('Season Delete Failed', props.seasonsError, 'error', 4000);
		if (props.seasonsError)
			return this.notification.show('Seasons Error', props.seasonsError, 'error', 4000);
	}

	componentDidMount() {
		this.handleError(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.handleError(nextProps);
	}

	render() {
		return (
			<div id="content">
				<Notification ref={n => this.notification = n} />
				<RecruitmentSeasons
					seasons={this.props.seasons}
					deleteSeason={this.props.deleteSeason} />
			</div>
		);
	}
}