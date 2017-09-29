import React from 'react';
import Highlight from 'react-highlight';

export default class CodeInput extends React.Component {
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
//			{ this.props.example && <pre className="code-example" dangerouslySetInnerHTML={ {__html: this.props.example} }></pre> }

		return (
			<div>
				{ this.props.example && <div className="code-example"><Highlight>{this.props.example}</Highlight></div> }
				<textarea name={this.props.name} value={this.state.value} onChange={this.changeHandler.bind(this)} className="monospace-text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"></textarea>
			</div>
		);
	}
}