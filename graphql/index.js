const queries = require('./_queries');
const mutation = require('./_mutations');
const user = require('./user');

// Query : REST Get
// Mutation : REST POST/UPDATE/DELETE

const typeDefs = [queries, mutation, user.typeDefs];

const resolvers = [user.resolvers];

module.exports = {
  typeDefs,
  resolvers,
};
