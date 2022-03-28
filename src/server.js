const { ApolloServer } = require('apollo-server');

const { typeDefs, resolvers } = require('./schema');
const context = require('./context');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
