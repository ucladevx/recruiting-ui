import React from 'react';

import Notification from 'components/Notification';
import RecruitmentSeasons from './recruitmentSeasons';

export default class Applications extends React.Component {
  constructor(props) {
    super(props);
    this.handleError = this.handleError.bind(this);
  }

  handleError(props) {
    if (props.seasonsError && (Date.now() - props.seasonsLastAction < 1000))
      return this.notification.show('Seasons Error', props.seasonsError, 'error', 4000);
  }

  componentDidMount() {
    this.handleError(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleError(nextProps);
  }

  render() {
    return (
      <div id="content">
        <Notification ref={n => this.notification = n} />
        <RecruitmentSeasons
          seasons={this.props.seasons}
          deleteSeason={this.props.deleteSeason} />
      </div>
    );
  }
}