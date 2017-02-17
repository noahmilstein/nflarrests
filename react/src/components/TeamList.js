import React from 'react';
import Team from './Team';

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let teams = this.props.data.map(team => {
      return (
        <Team
          key={team.id}
          id={team.id}
          team={team.Team}
          teamCity={team.Team_city}
          teamName={team.Team_name}
          arrestCount={team.arrest_count}
          teamCrimeCount={team.teamCrimeCount}
        />
      )
    })

    return(
      <div>
        <ul>
          {teams}
        </ul>
      </div>
    )
  }
}

export default TeamList;
