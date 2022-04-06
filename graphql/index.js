const queries = require('./_queries');
const user = require('./user');

// Query : REST Get
// Mutation : REST POST/UPDATE/DELETE

const typeDefs = [queries, user.typeDefs];

const resolvers = [user.resolvers];

module.exports = {
  typeDefs,
  resolvers,
};
