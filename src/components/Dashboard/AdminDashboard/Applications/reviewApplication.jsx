import React from 'react';

import Button from 'components/Button';
import Notification from 'components/Notification';
import ReviewTopbar from 'components/Topbar/reviewTopbar';
import ViewApplication from 'components/Application/viewApplication';
import TextAreaInput from 'components/Application/elements/textAreaInput';
import TextInput from 'components/Application/elements/textInput';
import RatingInput from './ratingInput';
import ButtonRating from './btnRating';

export default class ReviewApplication extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: this.props.application.notes || '',
			graderReviews: this.props.application.graderReviews || [],
			graderName: "",
			generalNotes: "",
			technicalExperience: 0,
			potentialToCollab: 0,
			execution: 0,
			teNotes: "",
			ptcNotes: "",
			execNotes: "",
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
			// notes: this.state.notes,
			// rating: this.state.rating,
			graderName: this.state.graderName,
			notes: this.state.notes,
			generalNotes: this.state.generalNotes,
			technicalExperience: this.state.technicalExperience,
			potentialToCollab: this.state.potentialToCollab,
			execution: this.state.execution,
			teNotes: this.state.teNotes,
			ptcNotes: this.state.ptcNotes,
			execNotes: this.state.execNotes,
		});
	}

	rejectApplication() {
		this.props.rejectApplication(this.props.application.id, {
			// notes: this.state.notes,
			// rating: this.state.rating,
			graderName: this.state.graderName,
			notes: this.state.notes,
			generalNotes: this.state.generalNotes,
			technicalExperience: this.state.technicalExperience,
			potentialToCollab: this.state.potentialToCollab,
			execution: this.state.execution,
			teNotes: this.state.teNotes,
			ptcNotes: this.state.ptcNotes,
			execNotes: this.state.execNotes,
		});
	}

	acceptApplication() {
		this.props.acceptApplication(this.props.application.id, {
			// notes: this.state.notes,
			// rating: this.state.rating,
			graderName: this.state.graderName,
			notes: this.state.notes,
			generalNotes: this.state.generalNotes,
			technicalExperience: this.state.technicalExperience,
			potentialToCollab: this.state.potentialToCollab,
			execution: this.state.execution,
			teNotes: this.state.teNotes,
			ptcNotes: this.state.ptcNotes,
			execNotes: this.state.execNotes,
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
				// newState.rating = nextProps.application.rating;
				newState.applicationId = nextProps.application.id;
				return newState;
			});
		}
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

					{ !this.props.applicationGetting && this.state.graderReviews.length > 0 &&
						this.state.graderReviews.map((review, i) => {
							return(
								<div className="cards">
									<div className="card card-wide profile-card">
										<h1>{review.graderName}'s Review</h1>
										<div>
											<p><b>Private Notes:</b>
											<br/>{review.generalNotes}</p>
										</div>
										<div>
											<p><b>Technical Experience:</b> {review.technicalExperience}
											<br/>{review.teNotes}</p>
										</div>
										<div>
											<p><b>Potential to Collaborate:</b> {review.potentialToCollab}
											<br/>{review.ptcNotes}</p>
										</div>
										<div>
											<p><b>Execution:</b> {review.execution}
											<br/>{review.execNotes}</p>
										</div>
									</div>
								</div>
							);
						})
					}

					{ !this.props.applicationGetting &&
						<div className="cards">
							<div className="card card-wide profile-card">
								<h1>New Grader Review</h1>
								<div>
									<form className="app-form">
										<TextInput originalValue={this.state.graderName} name="graderName" title="Grader Name:" onChange={this.setValue} />
									</form>
								</div>
								<form className="app-form">
									<h5>Technical Experience: </h5>
									<p>1 - Did not make a reasonable attempt at the challenge.
									<br/>2 - May or may not have passed the challenge but if they did pass had a very naive solution; no framework skills.
									<br/>3 - Designed a suboptimal but reasonable solution to the coding challenge; may have some grasp on relevant frameworks.
									<br/>4 - Satisfactorily passed the coding challenge; doesn't know many useful frameworks; not as web facing as desired.
									<br/>5 - Excelled in the coding challenge; knows popular frameworks, technologies and even software infrastructure skills like Docker.
									</p>
									{/* <RatingInput originalValue={this.state.technicalExperience} name="technicalExperience" title="Technical Experience" onChange={this.setValue} /> */}
									<ButtonRating originalValue={this.state.technicalExperience} name="technicalExperience" title="Score" onChange={this.setValue}/>
									<TextAreaInput originalValue={this.state.teNotes} name="teNotes" title="Technical Experience Notes" onChange={this.setValue} />
								</form>
								<form className="app-form">
									<h5>Potential to Collaborate: </h5>
									<p>1 - Obvious bad attitude; automatically disqualified.
									<br/>2 - Could work with others, but shyness inhibits communications or does not collaborate.
									<br/>3 - No experience with teams, but has the desired abilities and soft skills to contribute.
									<br/>4 - Has successfully worked on one or more teams in the past.
									<br/>5 - Has successfull led teams in the past; works well with wide variety of people.
									</p>
									{/* <RatingInput originalValue={this.state.potentialToCollab} name="potentialToCollab" title="Potential to Collaborate" onChange={this.setValue} /> */}
									<ButtonRating originalValue={this.state.potentialToCollab} name="potentialToCollab" title="Score" onChange={this.setValue}/>
									<TextAreaInput originalValue={this.state.ptcNotes} name="ptcNotes" title="Potential to Collaborate Notes" onChange={this.setValue} />
								</form>
								<div>
									<h5>Execution: </h5>
									<p>1 - Obvious cues of poor execution: late to interview, lazy preparation, no finished projects on GitHub.
									<br/>2 - Almost no start-to-finish projects on GitHub.
									<br/>3 - Incomplete projects and/or pieces of code on GitHub.
									<br/>4 - Many successful projects as showcased on resume and GitHub; have deployed live products.
									<br/>5 - Have not only successful projects and live products, members of the board and/or PMs can vouch for them.
									</p>
								</div>
								<form className="app-form">
									{/* <RatingInput originalValue={this.state.execution} name="execution" title="Execution " onChange={this.setValue} /> */}
									<ButtonRating originalValue={this.state.execution} name="execution" title="Score" onChange={this.setValue}/>
									<TextAreaInput originalValue={this.state.execNotes} name="execNotes" title="Execution Notes" onChange={this.setValue} />
								</form>
								<form className="app-form" style={{display: 'inline'}}>
									<TextAreaInput originalValue={this.state.generalNotes} name="generalNotes" title="Private Notes" onChange={this.setValue} />
									<TextAreaInput originalValue={this.state.notes} name="notes" title="Public Notes" onChange={this.setValue} />
									{/* <RatingInput originalValue={this.state.rating} name="tecnical exp" title="Technical Experience" onChange={this.setValue} /> */}
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
