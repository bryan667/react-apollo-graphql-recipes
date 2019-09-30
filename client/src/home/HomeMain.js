import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { PrettyJson } from '../common';
import { GET_ALL_RECIPES } from './queries';

const HomeMain = () => {
  const { loading, error, data } = useQuery(GET_ALL_RECIPES, { variables: {} });

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error {`${error}`}</div>;

  return (
    <div className="Home">
      <h1>Home</h1>
      <PrettyJson json={data} title={'GET_ALL_RECIPES'} />
    </div>
  );
};

export default HomeMain;
