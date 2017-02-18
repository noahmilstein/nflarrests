import React from 'react';

class Category extends React.Component {
  render() {
    return (
      <li id={this.props.id}>
        {this.props.categoryName}
      </li>
    )
  }
}

export default Category;
