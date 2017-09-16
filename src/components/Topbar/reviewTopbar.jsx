import React from 'react';
import Loader from 'components/Loader';

export default class ReviewTopbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const style = {
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'column',
			textAlign: 'center',
		};

		return (
			<div className="topbar app-topbar">
				<div id="topbar-inner">
					{ !this.props.loading && <div id="profile-name">{this.props.name}</div> }
					<div id="navigation">
						<div id="close-button" onClick={this.props.closeHandler}><i className="fa fa-times-thin"></i></div>
					</div>
				</div>
			</div>
		);
	}
}