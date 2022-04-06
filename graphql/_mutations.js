const { gql } = require('apollo-server');

const typeDefs = gql`
  type Mutation {
    addUser(
      id: String
      email: String
      isAdmin: Boolean
      phoneNumber: String
      nickname: String
      thumbnail_image_url: String
      profile_image_url: String
    ): User
  }
`;
