import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Img from "../img/temp-food.jpg";
 
export default class RecipeList extends Component {
  render() {
    const {
      name, 
      category,
      description,
      instructions,
    } = this.props.recipe;
    return (
      <div class="container">
        <Card style={{ width: "20rem" }}>
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
