const { ApolloServer } = require('apollo-server');

const { typeDefs, resolvers } = require('./graphql');
const dotenv = require('dotenv');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
dotenv.config();
const dbConnect = require('./models');
dbConnect();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
