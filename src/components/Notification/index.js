import React from 'react';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false
    };
    this.timeout = null;
  }

  showNotification(title, message, type, timeout=4000) {
    if (this.timeout)
      clearTimeout(this.timeout);
    this.setState({ title, message, type, showing: true });
    setTimeout(() => {
      this.setState({ showing: false })
    }, timeout);
  }

  render() {
    const classNames = ['notification', `notification-${this.state.type || 'success'}`];
    if (this.state.showing)
      classNames.push('showing');
    
    return (
      <div className={classNames.join(' ')}>
        <span className="notification-title">{this.state.title}</span>
        <p className="notification-text">{this.state.message}</p>
      </div>
    );
  }
}