const { gql } = require('apollo-server');
const User = require('../models/user');

const typeDefs = gql`
  type User {
    email: String
    isAdmin: Boolean
    phoneNumber: String
    nickname: String
    thumbnail_image_url: String
    profile_image_url: String
  }
  type Query {
    users: [User]
  }
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

const resolvers = {
  Query: {
    users: async () => await User.find(),
  },
  Mutation: {
    // addUser: test용 뮤테이션
    addUser(_, args) {
      const user = new User({
        ...args,
      });
      user.save();
      return args;
    },
    // TODO: 카카오 로그인
    // TODO: 클라이언트에서 인가코드 받아서 카카오 서버에 사용자 정보 요청
    // TODO: 사용자 정보가 DB에 저장되어 있는지 확인하고 데이터 반환
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
