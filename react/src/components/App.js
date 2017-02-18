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
