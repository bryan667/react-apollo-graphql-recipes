import React from 'react';
import Img from '../img/temp-food.jpg';
import style from './recipe.module.css';

export default  function RecipeList ({recipe}){
    const { name, description } = recipe;
    return (
    <div className={style.recipe}>
      <img className={style.image} src={Img} alt=""/>
      <h3 className={style.name}>{name}</h3>
      <p className={style.description}>{description}</p>
    </div>
    );
  }

