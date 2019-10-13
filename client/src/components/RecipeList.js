import React from 'react';
import style from './recipe.module.css';

export default function RecipeList({ recipe }) {
  const { name, description, username } = recipe;
  return (
    <div className={style.recipe}>
      <div className={style.imagecontainer} />
      <div className={style.lowersection}>
        <h3 className={style.name}>{name}</h3>
        <p className={style.description}>{description}</p>
        <div className={style.profile}>
          <span className={style.image}>
            <img src="/img/temp-profile-pic.jpg" alt="profile" />
          </span>
          <span className={style.by}>By: </span>
          <span className={style.username}>{`${username}`}</span>
        </div>
      </div>
    </div>
  );
}
