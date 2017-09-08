import React from 'react';

export default class CheckboxInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.originalValue || [],
    };
  }

  changeHandler(e) {
    if (this.props.review)
      return;
    const { value, checked } = e.target;
    if (!checked) {
      this.setState(prev => {
        const newState = Object.assign({}, prev, { checked: prev.checked.filter(c => c !== value) });
        this.props.onChange(this.props.name, newState.checked);
        return newState;
      });
    } else {
      this.setState(prev => {
        const newState = Object.assign({}, prev);
        if (prev.checked.indexOf(value) === -1) {
          newState.checked.push(value);
          newState.checked.sort();
        }
        this.props.onChange(this.props.name, newState.checked);
        return newState;
      });
    }
  }

  render() {
    console.log(this.props.name, this.state.checked, this.props.options);
    return (
      <div>
        <label htmlFor={this.props.name} className="input-title">{this.props.title}</label><br />
        { this.props.desc && <p className="input-info">{this.props.desc}</p> }
        
        { (this.props.options && this.props.options.length)&&
          <div className={`label-group${this.props.review ? ' review' : ''}`}>
          { this.props.options.map(option =>
            <label className="control-label" key={option}>
              {option}
              <input type="checkbox" name={option} value={option} checked={this.state.checked.indexOf(option) !== -1} onChange={this.changeHandler.bind(this)} disabled={this.props.review}/>
              <div className="checkbox"></div>
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