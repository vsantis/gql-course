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
