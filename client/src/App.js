import React from 'react';

import HomeMain from './home/HomeMain';
import { client } from './config/client';
import { ApolloProvider } from 'react-apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <HomeMain />
    </ApolloProvider>
  );
}

export default App;
