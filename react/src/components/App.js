import React from 'react';
import TeamList from './TeamList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTeams: []
    };
    this.getInitialData = this.getInitialData.bind(this);
  }

  componentWillMount() {
    this.getInitialData()
  }

  getInitialData() {
    $.ajax({
      url: '/api/sources/all_teams',
      type: 'GET',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({
        allTeams: data.allTeams
      });
    })
  }

  render() {
    return (
      <div>
        Ahoj hoj
        <TeamList
          data={this.state.allTeams}
        />
      </div>
    );
  }
};

export default App;

// // why doesn't this work?
// let updatedState = [];
// const teamCodes = [...this.state.allTeams];
// teamCodes.forEach(team => {
//   let data = JSON.stringify({teamID: team.Team})
//   fetch('/api/sources/crime_count', {
//     method: 'post',
//     body: data
//   })
//   .then(response => response.json())
//   .then(data => {
//     team["teamCrimeCount"] = data.teamCrimeCount
//     updatedState.push(team);
//   }).catch(function(err) {
//     console.log(err.message)
//   })
//   console.log(updatedState)
// })
