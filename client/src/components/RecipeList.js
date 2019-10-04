import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import Img from '../img/temp-food.jpg';

export default class RecipeList extends Component {
  render() {
    const { name, category, description, instructions } = this.props.recipe;
    return (
      <div class="card-container">
        <Card style={{ minWidth: '260px', width: '100%' }}>
          <Card.Img variant="top" src={Img} alt="Logo" background="center" />
          <Card.Body>
            <Card.Title>
              <span>{name}</span>
            </Card.Title>
            <Card.Text>
              <span>{category}</span>
              <br />
              <span>{description}</span>
              <span>{instructions}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
