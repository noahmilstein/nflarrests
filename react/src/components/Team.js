import React from 'react';

class Team extends React.Component {
  // implement router
  // li onClick
  // go to page with arrest list of team
  // page component makes ajax call to controller to get data (teamcrimelist)
  render() {
    return (
      <li className='' id={this.props.id}>
        {this.props.teamCity} {this.props.teamName}, {this.props.arrestCount} arrests
      </li>
    )
  }
}

export default Team;
