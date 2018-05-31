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
			graderReviews: this.props.application.graderReviews || [{ 	
				graderName: "Keiana",
				generalNotes: "This is a test application! Overall (Ram): Seems to have a majority of his knowledge coming from just coursework, would have to learn about web applications and the components that go into architecting one. Internship seemed to provide him with some real-world web service experience but was hard to tell. Dont think we would do well as a lone senior dev on a team but I think he would do well working alongside a more seasoned one, and he seemed like he was able to learn fast",
				technicalExperience: 5,
				teNotes: "Technical team experience: compiled a wiki of documentation, communicated constantly with teammates and updated the wiki. \nPicking up a new language/framework: during his internship, didn't know much about web applications. Learned through his intern manager, drawing things on whiteboard, asking questions, googling. Took two weeks to fully grasp the architecture",
				potentialToCollab: 5,
				ptcNotes: "How he resolves conflicts: In his internship he had a few conflicts: for example there was a background process that he suggested writing in C, while others said shell script. How he would build an online chess game: Manage game states through a tree, start with the root being the initial game state and then branching off with valid moves (not sure where he is going with this, doesn't seem the best idea but whateves)",
				execution: 5,
				execNotes: "How would he actually implement: Front end component that allows users to actually select moves and board positions. Back end that manages a db and keeps tracks of the users moves, allows them to go backgwards. (Didn't seem too familiar with this procss, or with real-time communication. But hey)",
			}],
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
			notes: this.state.notes,
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
			notes: this.state.notes,
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
			notes: this.state.notes,
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
	setTE = () => {
		this.setState(prev => {
			const newState = Object.assign({}, prev);
			newState.technicalExperience = value;
			return newState;
		})
	}
	setPTC = () => {
		this.setState(prev => {
			const newState = Object.assign({}, prev);
			newState.potentialToCollab = value;
			return newState;
		})
	}
	setEXEC = () => {
		this.setState(prev => {
			const newState = Object.assign({}, prev);
			newState.execution = value;
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
										<p>{review.generalNotes}</p>
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
									<form>
										<label>
											<TextAreaInput name="graderName" title="Grader Name:" onChange={this.setValue} />
										</label>
									</form>
								</div>
								<form className="app-form">
									<TextAreaInput originalValue={this.state.notes} name="notes" title="Publically Visible Notes" onChange={this.setValue} /><br />
									{/* <RatingInput originalValue={this.state.rating} name="tecnical exp" title="Technical Experience" onChange={this.setValue} /> */}
								</form>
								<form className="app-form">
									<h5>Technical Experience: </h5>
									<p>1 - Did not make a reasonable attempt at the challenge.
									<br/>2 - May or may not have passed the challenge but if they did pass had a very naive solution; no framework skills.
									<br/>3 - Designed a suboptimal but reasonable solution to the coding challenge; may have some grasp on relevant frameworks.
									<br/>4 - Satisfactorily passed the coding challenge; doesn't know many useful frameworks; not as web facing as desired.
									<br/>5 - Excelled in the coding challenge; knows popular frameworks, technologies and even software infrastructure skills like Docker.
									</p>
									<RatingInput originalValue={this.state.technicalExperience} name="technicalExperience" title="Technical Experience" onChange={this.setValue} />
									<TextAreaInput originalValue={this.state.teNotes} name="teNotes" title="Technical Experience Notes" onChange={this.setTE} /><br />
								</form>
								<form className="app-form">
									<h5>Potential to Collaborate: </h5>
									<p>1 - Obvious bad attitude; automatically disqualified.
									<br/>2 - Could work with others, but shyness inhibits communications or does not collaborate.
									<br/>3 - No experience with teams, but has the desired abilities and soft skills to contribute.
									<br/>4 - Has successfully worked on one or more teams in the past.
									<br/>5 - Has successfull led teams in the past; works well with wide variety of people.
									</p>
									<RatingInput originalValue={this.state.potentialToCollab} name="potentialToCollab" title="Potential to Collaborate" onChange={this.setValue} />
									<TextAreaInput originalValue={this.state.ptcNotes} name="ptcNotes" title="Potential to Collaborate Notes" onChange={this.setPTC} /><br />
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
									<RatingInput originalValue={this.state.execution} name="execution" title="Execution " onChange={this.setValue} />
									<TextAreaInput originalValue={this.state.execNotes} name="notes" title="Execution Notes" onChange={this.setEXEC} /><br />
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
