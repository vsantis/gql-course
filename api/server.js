const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const mongoose = require('mongoose');

require('dotenv').config();

// express server
const app = express();

// db
const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB Connected');
  } catch (error) {
    console.error('DB Connection Error', error);
  }
};

// execute database connection
db();

// typeDefs
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './typeDefs')));
// resolvers
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));

// graphql server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// link apollo server with express framework
apolloServer.applyMiddleware({ app });

// server
const httpServer = http.createServer(app);

// rest endpoint
app.get('/ping', (req, res, next) => {
  res.status(200).send('pong');
});

// port
app.listen(process.env.PORT, () => {
  console.log(`server is ready at http://localhost:${process.env.PORT}`);
  console.log(
    `graphql server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  );
});
