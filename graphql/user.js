const { default: axios } = require('axios');
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
  type Auth {
    data: User
    joined: Boolean
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
    async kakaoAuth(_, args) {
      try {
        const { code } = args;
        const url = 'https://kauth.kakao.com/oauth/token';
        const data = {
          grant_type: 'authorization_code',
          client_id: process.env.APIKEY,
          redirect_uri: process.env.KAKAO_CALLBACK,
          code: code,
        };

        const queryStringBody = Object.keys(data)
          .map((k) => encodeURIComponent(k) + '=' + encodeURI(data[k]))
          .join('&');

        const getAccessToken = await axios.post(url, queryStringBody, {
          headers: {
            'content-type': 'application/x-www-form-urlencoded;',
          },
        });

        const getUserData = await axios.get(
          'https://kapi.kakao.com/v2/user/me',
          {
            headers: {
              authorization: `Bearer ${getAccessToken.data.access_token}`,
            },
          }
        );

        let isExist = false;
        const users = await User.find();
        const user = await User.findOne({
          email: getUserData.data.kakao_account.email,
        });

        users.forEach((user) => {
          if (user.email === getUserData.data.kakao_account.email) {
            isExist = true;
          }
        });
        if (isExist) {
          return {
            data: user,
            joined: true,
          };
        } else {
          return {
            data: {
              email: getUserData.data.kakao_account.email,
              isAdmin: false,
              phoneNumber: '',
              nickname: getUserData.data.properties.nickname,
              profile_image_url: getUserData.data.properties.profile_image,
              thumbnail_image_url: getUserData.data.properties.thumbnail_image,
            },
            joined: false,
          };
        }
      } catch (err) {
        console.log('error :', err);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
