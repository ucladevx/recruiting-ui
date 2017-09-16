import React from 'react';

export default class RatingInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: this.props.originalValue || 0,
			hoverRating: this.props.originalValue || 0,
			hoverRatingEnable: false,
		};

		this.ratingMouseOut = this.ratingMouseOut.bind(this);
		this.ratingMouseOver = this.ratingMouseOver.bind(this);
		this.ratingMouseMove = this.ratingMouseMove.bind(this);
		this.ratingMouseDown = this.ratingMouseDown.bind(this);
	}

	ratingMouseOver(e) {
		this.setState(prev => Object.assign({}, prev, { hoverRatingEnable: true }));
	}

	ratingMouseOut(e) {
		this.setState(prev => Object.assign({}, prev, { hoverRatingEnable: false }));
	}

	ratingMouseMove(e) {
		const element = document.querySelector('.rating');
		const rect = element.getBoundingClientRect();
		const rating = 1 + Math.floor(5 * parseFloat(e.pageX - rect.left)/element.clientWidth);
		this.setState(prev => Object.assign({}, prev, { hoverRating: rating }));
	}

	ratingMouseDown(e) {
		this.setState(prev => Object.assign({}, prev, { rating: prev.hoverRating }));
		this.props.onChange(this.props.name, this.state.hoverRating);
	}

	componentDidMount() {
		var rating = document.querySelector('.rating');
		rating.addEventListener('mousedown', this.ratingMouseDown);
		rating.addEventListener('mousemove', this.ratingMouseMove);
		rating.addEventListener('mouseover', this.ratingMouseOver);
		rating.addEventListener('mouseout', this.ratingMouseOut);
	}

	componentWillUnmount() {
		var rating = document.querySelector('.rating');
		rating.removeEventListener('mousedown', this.ratingMouseDown);
		rating.removeEventListener('mousemove', this.ratingMouseMove);
		rating.removeEventListener('mouseover', this.ratingMouseOver);
		rating.removeEventListener('mouseout', this.ratingMouseOut);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.rating)
			this.setState(prev => Object.assign({}, prev, { rating: nextProps.originalValue }));
	}

	render() {
		return (
			<div>
				<label className="input-title" htmlFor={this.props.name}>{this.props.title}</label><br />
				<div className="rating">
					{(5).map(i => {
						const rating = this.state.hoverRatingEnable ? this.state.hoverRating : this.state.rating;
						const on = rating >= i;
						return <i key={i} className={`fa fa-2x ${ on ? 'fa-star' : 'fa-star-o' }`}></i>
					})}
				</div>
			</div>
		);
	}
}