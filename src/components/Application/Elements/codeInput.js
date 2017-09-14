import React from 'react';

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
    if (!this.state.value) {
      this.setState({ value: nextProps.originalValue || '' });
    }
  }

  render() {
    return (
      <div>
        { this.props.example && <pre className="code-example" dangerouslySetInnerHTML={ {__html: this.props.example} }></pre> }
        <textarea name={this.props.name} value={this.state.value} onChange={this.changeHandler.bind(this)} className="monospace-text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"></textarea>
      </div>
    );
  }
}