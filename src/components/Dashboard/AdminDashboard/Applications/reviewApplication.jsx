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
			graderReview: this.props.application.graderReview || [
					{ graderName: "Keiana",
						graderNotes: "This is a test application!",
						technicalExperience: 5,
						potential: 5,
						execution: 5,}
				],
		};

		this.setValue = this.setValue.bind(this);
		this.handleError = this.handleError.bind(this);
		this.hideApplication = this.hideApplication.bind(this);
		this.reviewApplication = this.reviewApplication.bind(this);
		this.rejectApplication = this.rejectApplication.bind(this);
		this.acceptApplication = this.acceptApplication.bind(this);
		this.acceptForInterview = this.acceptForInterview.bind(this);
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

	acceptForInterview() {
		this.props.acceptForInterview(this.props.application.id);
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
		if (nextProps.applicationGetSuccess) {
			this.setState(prev => {
				const newState = Object.assign({}, prev);
				newState.notes = nextProps.application.notes;
				newState.rating = nextProps.application.rating;
				newState.applicationId = nextProps.application.id;
				return newState;
			});
		}
	}

	render() {
		let application = this.props.application;
		console.log(application);
		if (!application.profile)
			application = { profile:{} };
		console.log('LENGTH', this.state.graderReview.length);

		return (
			<div className="view-application">
				<ReviewTopbar name={application.profile.firstName + ' ' + application.profile.lastName} closeHandler={this.hideApplication} loading={this.props.applicationGetting} />
				<div id="content">
					<Notification ref={n => this.notification = n} />
					<ViewApplication admin profile={application.profile} {...this.props} />
					<hr />

					{ !this.props.applicationGetting && this.state.graderReview.length > 0 &&
						this.state.graderReview.map((review, i) => {
							return(
								<div className="cards">
									<div className="card card-wide profile-card">
										<h1>{review.graderName}'s Review</h1>
										<p>{review.graderNotes}</p>
										<p>Technical Experience: {review.technicalExperience}</p>
										<p>Potential to Collaborate: {review.potential}</p>
										<p>Execution: {review.execution}</p>
									</div>
								</div>
							);
						})
					}

					{ !this.props.applicationGetting &&
						<div className="cards">
							<div className="card card-wide profile-card">
								<h1>Grader Review</h1>
								<div>
								<form>
								  <label>
								    Name:
								    <input type="text" name="name" default="have to add this to GraderObject"/>
								  </label>
								</form>
							</div>
								<div>
								<h5>Technical Experience: </h5>
								<p>1 - Did not make a reasonable attempt at the challenge.
								<br/>2 - May or may not have passed the challenge but if they did pass had a very naive solution; no framework skills.
								<br/>3 - Designed a suboptimal but reasonable solution to the coding challenge; may have some grasp on relevant frameworks.
								<br/>4 - Satisfactorily passed the coding challenge; doesn't know many useful frameworks; not as web facing as desired.
								<br/>5 - Excelled in the coding challenge; knows popular frameworks, technologies and even software infrastructure skills like Docker.</p>
								</div>
								<div>
								<h5>Potential to Collaborate: </h5>
								<p>1 - Obvious bad attitude; automatically disqualified.
								<br/>2 - Could work with others, but shyness inhibits communications or does not collaborate.
								<br/>3 - No experience with teams, but has the desired abilities and soft skills to contribute.
								<br/>4 - Has successfully worked on one or more teams in the past.
								<br/>5 - Has successfull led teams in the past; works well with wide variety of people.

								</p>
							</div>
							<div>
								<h5>Execution: </h5>
								<p>1 - Obvious cues of poor execution: late to interview, lazy preparation, no finished projects on GitHub.
								<br/>2 - Almost no start-to-finish projects on GitHub.
								<br/>3 - Incomplete projects and/or pieces of code on GitHub.
								<br/>4 - Many successful projects as showcased on resume and GitHub; have deployed live products.
								<br/>5 - Have not only successful projects and live products, members of the board and/or PMs can vouch for them.
								</p>
							</div>
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
							{application.status === "SUBMITTED" && <Button text="Accept for Interview" style="green" onClick={this.acceptForInterview} />}
							{application.status === "PENDING_INTERVIEW" && <Button text="Accept" style="green" onClick={this.acceptApplication} />}
						</div>
					}
				</div>
			</div>
		);
	}
}
