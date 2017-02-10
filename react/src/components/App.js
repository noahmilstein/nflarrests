import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTeams: [],

    };
    this.getAllTeams = this.getAllTeams.bind(this);
    this.getCrimeCounts = this.getCrimeCounts.bind(this);
  }

  componentWillMount() {
    this.getAllTeams()
  }

  getAllTeams() {
    $.ajax({
      url: '/api/sources/all_teams',
      type: 'GET',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({ allTeams: data.allTeams });
    }, () => {
      this.getCrimeCounts()
    });
  }

  getCrimeCounts() {
    let teamNames = [];
    this.state.allTeams.forEach(team => {
      teamNames.push({teamCode: team.Team, teamName: team.Team_name})
    })
    this.state.allTeams.forEach(team => {
      let data = JSON.stringify({teamID: team.Team})
      $.ajax({
        url: '/api/sources/crime_count',
        type: 'POST',
        data: data,
        contentType: 'application/json'
      })
      // currently working here on...
      // getting a count of all crimes by category per team
      // clone state and update as per Wes Bos example
    })
  }

  // crimeCountPerTeam
  // http://nflarrest.com/api/v1/team/topCrimes/TeamID

  // crimeListPerTeam
  // http://nflarrest.com/api/v1/team/arrests/TeamID

  render() {
    return (
      <div>
        Ahoj hoj
      </div>
    );
  }
};

export default App;
