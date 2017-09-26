import React from 'react';

export default class RadioInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.originalValue,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ value: nextProps.originalValue || '' });
	}

	changeHandler(e) {
		if (this.props.review)
			return;
		const { name, value } = e.target;
		this.props.onChange(name, value);
		this.setState(prev => Object.assign({}, prev, { value }));
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<label htmlFor={this.props.name} className="input-title">{this.props.title}{this.props.required && <span className="required-field">*</span>}</label><br />
				{ this.props.desc && <p className="input-info">{this.props.desc}</p> }

				{ (this.props.options && this.props.options.length) &&
					<div className={`label-group radio-group${this.props.review ? ' review' : ''}`}>
					{ this.props.options.map(option =>
						<label className="control-label" key={option}>
							{option}
							<input type="radio" name={this.props.name} value={option} checked={this.state.value === option} onChange={this.changeHandler.bind(this)} disabled={this.props.review}/>
							<div className="radio"></div>
						</label>
					)}
					</div>
				}
				{ (!this.props.options || !this.props.options.length) &&
					<p className="review"><i>None</i></p>
				}
			</div>
		);
	}
}