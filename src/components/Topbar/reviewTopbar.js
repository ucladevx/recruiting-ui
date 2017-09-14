import React from 'react';

export default class ReviewTopbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="topbar app-topbar">
        <div id="topbar-inner">
          <div id="profile-name">{this.props.name}</div>
          <div id="navigation">
            <div id="close-button" onClick={this.props.closeHandler}><i className="fa fa-times-thin"></i></div>
          </div>
        </div>
      </div>
    );
  }
}