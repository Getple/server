const userResolvers = require('./user');

const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
};

module.exports = resolvers;
