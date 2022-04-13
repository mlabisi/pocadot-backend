const { ApolloServer } = require('apollo-server');
const { BaseRedisCache } = require('apollo-server-cache-redis');
const Redis = require('ioredis');
const { typeDefs, resolvers } = require('./schema');
const services = require('./services');
const { Groups, Idols, Users, Collections } = require('./data-sources');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new BaseRedisCache({
    client: new Redis(process.env.REDISCLOUD_URL),
  }),

  context: {
    services,
  },
  dataSources: () => ({
    collections: new Collections(),
    groups: new Groups(),
    idols: new Idols(),
    listings: {},
    users: new Users(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
