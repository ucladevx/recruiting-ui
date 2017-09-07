import React from 'react';

export default class TextInput extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor={this.props.name} className="input-title">{this.props.title}</label><br />
        <input type="text" name={this.props.name} /><br />
      </div>
    );
  }
}