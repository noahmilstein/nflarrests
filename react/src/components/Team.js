import React from 'react';
import Crime from './Crime';

class Team extends React.Component {

  render() {
    let crimes = this.props.teamCrimes.map(crime => {
      return (
        <Crime
          key={crime.id}
          id={crime.id}
          crimeDate={crime.date}
          criminalName={crime.name}
          criminalPosition={crime.position}
          crimeEncounter={crime.encounter}
          crimeDescription={crime.description}
          crimeOutcome={crime.outcome}
          crimeCategories={crime.categories}
        />
      )
    })

    return (
      <li id={this.props.id}>
        {this.props.teamCity}, {this.props.teamName}, {this.props.teamCode}
        <ul>
          {crimes}
        </ul>
      </li>
    )
  }
}

export default Team;
