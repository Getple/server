const users = [
  {
    email: 'abc@abce.com',
    nickname: 'Kate Chopin',
  },
  {
    email: 'City of Glass',
    nickname: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    users: () => users,
  },
};

module.exports = resolvers;
