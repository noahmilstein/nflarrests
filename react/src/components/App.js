import React from 'react';
import TeamList from './TeamList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTeams: [],
    };
    this.getAllTeams = this.getAllTeams.bind(this);
    // this.getCrimeCounts = this.getCrimeCounts.bind(this);
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
      // deprecated...
      // this.setState({ allTeams: data.allTeams }, () => {
      //   this.getCrimeCounts()
      // });
    })
  }

  // // deprecated...
  // getCrimeCounts() {
  //   // do all of this formatting in the controller from one method
  //   let updatedState = [];
  //   const teamCodes = [...this.state.allTeams];
  //   teamCodes.forEach(team => {
  //     let data = JSON.stringify({teamID: team.Team})
  //     $.ajax({
  //       url: '/api/sources/crime_count',
  //       type: 'post',
  //       data: data,
  //       contentType: 'application/json'
  //     })
  //     .done(data => {
  //       team["teamCrimeCount"] = data.teamCrimeCount;
  //       team["teamCrimeList"] = data.teamCrimeList;
  //       updatedState.push(team);
  //     })
  //   }, () => {
  //     this.setState({ allTeams: updatedState });
  //   });
  //
  //   // let updatedState = [];
  //   // // const teamCodes = [...this.state.allTeams];
  //   // const teamCodes = Object.assign({}, this.state.allTeams)
  //   // // replace this method. Can't call `forEach` on object
  //   // teamCodes.forEach(team => {
  //   //   const crimeCountPromise = fetch(`http://nflarrest.com/api/v1/team/topCrimes/${team.Team}`)
  //   //   crimeCountPromise
  //   //     .then(data => data.json())
  //   //     .then(data => {
  //   //       team['teamCrimeCount'] = data
  //   //       updatedState.push(team)
  //   //     })
  //   // })
  //   // console.log(updatedState)
  //   // console.log(this.state.allTeams)
  //   // // why is this setting state despite using the spread operator?
  // }

  render() {
    // display team names (list > item)
      // under each team, display the crime categories (list > item) with count of crimes per category
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
