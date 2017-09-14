import React from 'react';

import Button from 'components/Button';
import ReviewTopbar from 'components/Topbar/reviewTopbar';
import ReviewApplication from 'components/Application/review';
import TextAreaInput from 'components/Application/elements/textAreaInput';
import RatingInput from './ratingInput';

export default class ViewApplication extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: '',
			rating: 0,
		};
		
		this.setValue = this.setValue.bind(this);
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

	setValue(name, value) {
		this.setState(prev => {
			const newState = Object.assign({}, prev);
			newState[name] = value;
			return newState;
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			notes: nextProps.application.notes || '',
			rating: nextProps.application.rating || 0,
		});
	}

	render() {
		let application = this.props.application;
		if (!application.profile)
			application = { profile:{} };

		return (
			<div className={`view-application ${ this.props.showing ? 'showing' : ''}`}>
				<ReviewTopbar name={application.profile.firstName + ' ' + application.profile.lastName} closeHandler={this.props.hideApplication}/>
				<div id="content">
					<ReviewApplication admin profile={application.profile} />
					<hr />
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
					<div className="button-section button-section-right" id="profile-view-buttons">
						<Button text="Save" onClick={this.reviewApplication} />
						<Button text="Discard" onClick={this.props.hideApplication} />
						<Button text="Reject" style="red" onClick={this.rejectApplication} />
						<Button text="Accept" style="green" onClick={this.acceptApplication} />
					</div><br /><br /><br />
				</div>
			</div>
		);
	}
}