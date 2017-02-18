import React from 'react';

class Team extends React.Component {

  render() {
    return (
      <li id={this.props.id}>
        {this.props.teamCity}, {this.props.teamName}, {this.props.teamCode}
      </li>
    )
  }
}

export default Team;
