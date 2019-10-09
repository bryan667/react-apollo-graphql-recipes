import React from 'react';
import { useQuery } from '@apollo/react-hooks';

// import { PrettyJson } from '../common';
import { GET_ALL_RECIPES } from './queries';
import RecipeList from '../components/RecipeList';

const HomeMain = () => {
  const { loading, error, data } = useQuery(GET_ALL_RECIPES, { variables: {} });

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error {`${error}`}</div>;
  
  return (
    <div>
    <h1>Home</h1>
    <div className="recipes">
      {data.getAllRecipes.map(recipe=> 
        <RecipeList recipe={recipe} key={recipe._id}/>)}
      </div>
    </div>
  );
};

export default HomeMain;
