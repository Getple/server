const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    email: String
    nickname: String
  }

  type Query {
    users: [User]
  }
`;

module.exports = typeDefs;
