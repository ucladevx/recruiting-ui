import React from 'react';

export default class CodeInput extends React.Component {
  render() {
    return (
      <div>
        { this.props.example && <pre dangerouslySetInnerHTML={ {__html: this.props.example} }></pre> }
        <textarea name={this.props.name} className="monospace-text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"></textarea>
      </div>
    );
  }
}