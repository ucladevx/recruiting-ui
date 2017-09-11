import React from 'react';

import Button from 'components/Button';

export default class RecruitmentSeasons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateSeason: false,
    };
    this.deleteSeason = this.deleteSeason.bind(this);
  }

  deleteSeason(id) {
    this.props.deleteSeason(id);
  }

  render() {
    return (
      <div>
        <h1>Recruitment Seasons</h1>
        <Button text="Create Season" />
        {

        }

        { (this.props.seasons && this.props.seasons.length > 0) &&
          <table className="app-list">
            <thead><tr><td>Name</td><td>Open</td><td>Actions</td></tr></thead>
            <tbody>
            { this.props.seasons.map(season => 
              <tr key={season.id}>
                <td>{season.name}</td>
                <td>{season.startDate.format('MM/DD/YY')} &mdash; {season.endDate.format('MM/DD/YY')}</td>
                <td><Button small style="red" onClick={() => this.deleteSeason(season.id)}><i className="fa fa-times-thin fa-2x"></i></Button></td>
              </tr>
            )}
            </tbody>
          </table>
        }
      </div>
    );
  }
}