const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config({ path: '.env' });

//mongoose schemas
const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { ApolloServer, gql } = require('apollo-server-express');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    Recipe,
    User,
  }),
});

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))
  .then(e => (e ? console.error(e) : null));

const app = express();
server.applyMiddleware({ app });

var corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

console.log('server.graphqlPath', server.graphqlPath);
const PORT = process.env.PORT || 3008;

app.listen(PORT, () => {
  console.log(`server listening on PORT ${PORT}`);
});
