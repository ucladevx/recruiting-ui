import React from 'react';

import AppTopbar from './appTopbar';
import Topbar from './topbar';

export default class TopbarComponent extends React.Component {
	render() {
		const appTopbar = this.props.application;
		if (appTopbar)
			return <AppTopbar {...this.props} />
		return <Topbar {...this.props} />
	}
}