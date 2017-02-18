import React from 'react';
import Category from './Category';

class Crime extends React.Component {
// this.props.crimeCategories
  render() {
    let categories = this.props.crimeCategories.map(category => {
      return (
        <Category
          key={category.id}
          id={category.id}
          categoryName={category.name}
        />
      )
    })

    return (
      <li id={this.props.id}>
        {this.props.crimeDate}
        {this.props.criminalName}
        {this.props.criminalPosition}
        {this.props.crimeEncounter}
        {this.props.crimeDescription}
        {this.props.crimeOutcome}
        <ul>
          {categories}
        </ul>
      </li>
    )
  }
}

export default Crime;
