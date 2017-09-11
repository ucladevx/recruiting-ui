import React from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

import {Action} from 'reducers';
import DashboardComponent from 'components/Dashboard';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.createApplication = this.createApplication.bind(this);
  }

  createApplication() {
    // TODO: actually do something to create an application
    // this.props.history.push('/application');
    // this.props.
  }

  componentWillMount() {
    this.props.getApplications();
    if (this.props.admin) {
      this.props.getSeasons();
    }
  }

  render() {
    return <DashboardComponent
             match={this.props.match}
             admin={this.props.admin}
             logOut={this.props.logOut}

             deleteSeason={this.props.deleteSeason}
             createApplication={this.props.createApplication} 

             applications={this.props.applications}
             applicationsError={this.props.applicationsError}
             applicationsLastAction={this.props.applicationsLastAction}

             seasons={this.props.seasons}
             seasonsError={this.props.seasonsError}
             seasonsLastAction={this.props.seasonsLastAction}

             seasonDeleted={this.props.seasonDeleted} 
             seasonCreated={this.props.seasonCreated}
             applicationCreated={this.props.applicationCreated} />;
  }
}

const mapStateToProps = state => {
  return {
    admin: state.Auth.get('isAdmin'),

    applications: state.Applications.get('applications'),
    applicationsError: state.Applications.get('error'),
    applicationsLastAction: state.Applications.get('timestamp'),

    seasons: state.Seasons.get('seasons'),
    seasonsError: state.Seasons.get('error'),
    seasonsLastAction: state.Seasons.get('timestamp'),

    seasonDeleted: state.Seasons.get('seasonDeleted'),
    seasonCreated: state.Seasons.get('seasonCreated'),
    applicationCreated: state.Applications.get('applicationCreated'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(Action.LogoutUser());
    },
    createApplication: () => {
      dispatch(Action.CreateApplication());
    },
    getApplications: () => {
      dispatch(Action.GetApplications());
    },
    getSeasons: () => {
      dispatch(Action.GetSeasons());
    },
    deleteSeason: (id) => {
      dispatch(Action.DeleteSeason(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
