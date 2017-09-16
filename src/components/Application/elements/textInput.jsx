import React from 'react';

export default class TextInput extends React.Component {
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
				<input type="text" name={this.props.name} value={this.state.value} onChange={this.changeHandler.bind(this)} /><br />
			</div>
		);
	}
}