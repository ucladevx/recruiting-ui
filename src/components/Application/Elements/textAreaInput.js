import React from 'react';

export default class TextAreaInput extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor={this.props.name} className="input-title">{this.props.title}</label>
        { this.props.desc && <p className="input-info">{this.props.desc}</p> }
        <textarea name={this.props.name}></textarea>
      </div>
    );
  }
}