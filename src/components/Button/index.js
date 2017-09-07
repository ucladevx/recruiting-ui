import React from 'react';

export default class Button extends React.Component {
  render() {
    const text = this.props.text;
    const style = this.props.style;
    const small = this.props.small;

    return <button className={`${style || ''} ${small ? 'small' : ''}`} onClick={this.props.onClick}>{text}</button>;
  }
}