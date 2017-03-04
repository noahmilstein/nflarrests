import React from 'react';
import TeamList from './TeamList';
import { Chart } from 'react-google-charts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTeams: [],
      allCategories: [],
      options: {
        legend: {position:'top'},
        bar: { groupWidth: '75%' },
        isStacked: true
      }
    };
    this.getInitialData = this.getInitialData.bind(this);
    this.formatData = this.formatData.bind(this);
  }

  componentWillMount() {
    this.getInitialData()
  }

  compontentDidMount() {
    this.formatData()
  }

  getInitialData() {
    $.ajax({
      url: '/api/sources/all_teams',
      type: 'GET',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({
        allTeams: data.allTeams,
        allCategories: data.allCategories
      });
    })
  }

  formatData() {
    const teamList = [...this.state.allTeams]
    const categories = this.state.allCategories

    teamList.forEach(team => {
      let teamCrimeCategoryList = [];
      team['crimes'].forEach(crime => {
        crime['categories'].forEach(category => {
          teamCrimeCategoryList.push(category['name'])
        })
      })
      const teamCrimeCategorySum = teamCrimeCategoryList.reduce(function(category, i) {
        if(!category[i]) {
          category[i] = 0;
        }
        category[i]++;
        return category
      }, {})
      
      categories.forEach(category => {
        if (!Object.keys(teamCrimeCategorySum).includes(category.name)) {
          teamCrimeCategorySum[category.name] = 0
        }
      })
      team['teamCrimeCategorySum'] = teamCrimeCategorySum
    })

    const columns = teamList
      .sort((a,b) => a.name > b.name ? 1 : -1)
      .map(team => {
        const newArray = Object.keys(team['teamCrimeCategorySum'])
          .sort()
          .map(key => {
            return team['teamCrimeCategorySum'][key]
          })
        return [`${team.name}`, ...newArray, `${team.name}`]
    }) 

    return [
      [
        'Crime Category',
        ...categories.map(category => `${category.name}`),
        {'role':'annotation'}
      ],
      ...columns
    ]
  }

  render() {
    // clicking on category in legend returns error 
      // `all series on a given axis must be of the same data type`
    // attach event listeners 
    return (
      <div>
        <Chart
          options={this.state.options}
          chartType='ColumnChart'
          data={this.formatData()}
          graph_id=''
          width='100%'
          height='500px'
          legend_toggle
        />

        {/* <TeamList
          data={this.state.allTeams}
        /> */}
      </div>
    );
  }
};

export default App;
