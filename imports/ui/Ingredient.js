import React, { Component } from 'react';
 
export default class Ingredient extends Component {
  render() {
    return (
      <li>{this.props.ingr.text}</li>
    );
  }
}
