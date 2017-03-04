import React from 'react';
import TeamList from './TeamList';
import { Chart } from 'react-google-charts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTeams: [],
      allCategories: []
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
    
    // fix this block to get array of numbers to plug into the below return statement, replacing team.crimes.length
    // sort team['teamCrimeCategorySum'] alphabetically before mapping
    // teamList.map(team => {
    //   const newArray = Object.keys(team['teamCrimeCategorySum'])
    //     .sort()
    //     .map(key => {
    //       return team['teamCrimeCategorySum'][key]
    //     })
    // })

    return [
      [
        'Crime Category',
        categories.map(category => `${category.name}`),
        {'role':'annotation'}
      ],
      teamList.map(team => {
        const newArray = Object.keys(team['teamCrimeCategorySum'])
          .sort()
          .map(key => {
            return team['teamCrimeCategorySum'][key]
          })
        return [`${team.name}`, ...newArray, '']
      })
    ]
  }

// {
//   "chartType":"ColumnChart",
  // "data":[
  //   [
  //     "Genre",
  //     "Fantasy & Sci Fi",
  //     "Romance",
  //     "Mystery/Crime",
  //     "General",
  //     "Western",
  //     "Literature",
  //     {"role":"annotation"}
  //   ],
  //   ["2010",10,24,20,32,18,5,""],
  //   ["2020",16,22,23,30,16,9,""],
  //   ["2030",28,19,29,30,12,13,""]
  // ],

  render() {
    // const dataArray = this.formatData()
    // "options":{"legend":{"position":"top"},"bar":{"groupWidth":"75%"},"isStacked":true}
    debugger
    return (
      <div>
        <Chart
          // options={{}}
          chartType='ColumnChart'
          data={this.formatData()}
          graph_id=''
          width='100%'
          height='500px'
          legend_toggle
        />
        
        Ahoj hoj
        <TeamList
          data={this.state.allTeams}
        />
      </div>
    );
  }
};

export default App;
