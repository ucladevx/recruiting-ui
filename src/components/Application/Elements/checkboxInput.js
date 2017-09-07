import React from 'react';

export default class CheckboxInput extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor={this.props.name} className="input-title">{this.props.title}</label><br />
        { this.props.desc && <p className="input-info">{this.props.desc}</p> }
        
        <div className="label-group">
        { this.props.options.map(option =>
          <label className="control-label" key={option.name}>
            {option.name}
            <input type="checkbox" name={option.name} value={option.value || option.name} />
            <div className="checkbox"></div>
          </label>
        )}
        </div>
      </div>
    );
  }
}