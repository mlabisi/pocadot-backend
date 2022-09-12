const { ApolloServer } = require('apollo-server');
const { BaseRedisCache } = require('apollo-server-cache-redis');
const Redis = require('ioredis');
const { typeDefs, resolvers } = require('./schema');
const services = require('./services');
const {
  Chats,
  Groups,
  Idols,
  Users,
  Collections,
  Listings,
} = require('./data-sources');

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
    chats: new Chats(),
    collections: new Collections(),
    groups: new Groups(),
    idols: new Idols(),
    listings: new Listings(),
    users: new Users(),
  }),
  introspection: true
});

server
  .listen({
    port: process.env.PORT ?? 4000,
    host: process.env.HOST ?? '0.0.0.0',
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
