import React from 'react';

export default class SelectInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.originalValue || '',
		}
	}

	changeHandler(e) {
		const { name, value } = e.target;
		this.props.onChange(name, value);
		this.setState(prev => Object.assign({}, prev, { value }));
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ value: nextProps.originalValue || '' });
	}

	render() {
		return (
			<div>
				<label htmlFor={this.props.name} className="input-title">{this.props.title}{this.props.required && <span className="required-field">*</span>}</label><br />
				{ this.props.desc && <p className="input-info">{this.props.desc}</p> }
				<select name={this.props.name} value={this.state.value} onChange={this.changeHandler.bind(this)}>
					<option value="" disabled></option>
					{ this.props.options.map((option, i) => <option value={option} key={option}>{option}</option>) }
				</select><br />
			</div>
		);
	}
}