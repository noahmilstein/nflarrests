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
          teamCode={team.code}
          teamName={team.name}
          teamCity={team.city}
          teamCrimes={team.crimes}
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
