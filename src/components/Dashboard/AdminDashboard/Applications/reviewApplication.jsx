import React from 'react';

import Button from 'components/Button';
import Notification from 'components/Notification';
import ReviewTopbar from 'components/Topbar/reviewTopbar';
import ViewApplication from 'components/Application/viewApplication';
import TextAreaInput from 'components/Application/elements/textAreaInput';
import RatingInput from './ratingInput';

export default class ReviewApplication extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: this.props.application.notes || '',
			rating: this.props.application.rating || 0,
		};

		this.setValue = this.setValue.bind(this);
		this.handleError = this.handleError.bind(this);
		this.hideApplication = this.hideApplication.bind(this);
		this.reviewApplication = this.reviewApplication.bind(this);
		this.rejectApplication = this.rejectApplication.bind(this);
		this.acceptApplication = this.acceptApplication.bind(this);
	}

	reviewApplication() {
		this.props.reviewApplication(this.props.application.id, {
			notes: this.state.notes,
			rating: this.state.rating,
		});
	}

	rejectApplication() {
		this.props.rejectApplication(this.props.application.id, {
			notes: this.state.notes,
			rating: this.state.rating,
		});
	}

	acceptApplication() {
		this.props.acceptApplication(this.props.application.id, {
			notes: this.state.notes,
			rating: this.state.rating,
		});
	}

	hideApplication(e) {
		e.preventDefault();
		this.props.history.goBack();
	}

	setValue(name, value) {
		this.setState(prev => {
			const newState = Object.assign({}, prev);
			newState[name] = value;
			return newState;
		})
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
		this.setState(prev => {
			const newState = Object.assign({}, prev);
			newState.notes = nextProps.application.notes;
			newState.rating = nextProps.application.rating;
			newState.applicationId = nextProps.application.id;
			return newState;
		});
	}

	render() {
		let application = this.props.application;
		if (!application.profile)
			application = { profile:{} };

		return (
			<div className="view-application">
				<ReviewTopbar name={application.profile.firstName + ' ' + application.profile.lastName} closeHandler={this.hideApplication} loading={this.props.applicationGetting} />
				<div id="content">
					<Notification ref={n => this.notification = n} />
					<ViewApplication admin profile={application.profile} {...this.props} />
					<hr />
					{ !this.props.applicationGetting &&
						<div className="cards">
							<div className="card card-wide profile-card">
								<h1>Admin Information</h1>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices faucibus nisl eget feugiat. Integer condimentum enim accumsan lorem commodo, vitae luctus nibh convallis. Maecenas eu aliquam lorem. Donec eleifend odio arcu, at fringilla purus pharetra vitae. Donec eleifend, erat sed cursus euismod, mauris magna tincidunt est, sed hendrerit sem tellus id ex. In varius ullamcorper dolor varius ultrices. In quis euismod massa, id faucibus lacus. Donec rutrum tempus mi, ac pellentesque arcu scelerisque in. Maecenas vehicula massa at neque pharetra, non semper risus fringilla. Nunc vulputate erat nec blandit pretium. Nulla ac fringilla nisi. Nam venenatis ultricies lacus, id ullamcorper neque accumsan vitae. Curabitur a odio eget arcu blandit pellentesque sit amet eu tortor.</p>
								<form className="app-form">
									<TextAreaInput originalValue={this.state.notes} name="notes" title="Notes" onChange={this.setValue} /><br />
									<RatingInput originalValue={this.state.rating} name="rating" title="Rating" onChange={this.setValue} />
								</form>
							</div>
						</div>
					}

					{ !this.props.applicationGetting &&
						<div className="button-section button-section-right" id="profile-view-buttons">
							<Button text="Save" onClick={this.reviewApplication} />
							<Button text="Discard" onClick={this.hideApplication} />
							<Button text="Reject" style="red" onClick={this.rejectApplication} />
							<Button text="Accept" style="green" onClick={this.acceptApplication} />
						</div>
					}
				</div>
			</div>
		);
	}
}