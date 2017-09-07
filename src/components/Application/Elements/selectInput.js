import React from 'react';

export default class SelectInput extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor={this.props.name} className="input-title">{this.props.title}</label><br />
        { this.props.desc && <p className="input-info">{this.props.desc}</p> }
        <select name={this.props.name} value="">
          <option value="" disabled></option>
          { this.props.options.map((option, i) => <option value={option.value || option.name} key={option.name}>{option.name}</option>) }
        </select><br />
      </div>
    );
  }
}