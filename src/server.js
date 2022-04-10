const { ApolloServer } = require('apollo-server');
const { BaseRedisCache } = require('apollo-server-cache-redis');
const Redis = require('ioredis');
const { typeDefs, resolvers } = require('./schema');
const services = require('./services');
const { Groups, Idols, Users } = require('./data-sources');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cache: new BaseRedisCache({
  //   client: new Redis({
  //     host: 'redis-server',
  //   }),
  // }),
  dataSources: () => ({
      collections: {},
      groups: new Groups(services.Airtable.base('groups')),
      idols: new Idols(services.Airtable.base('idols')),
      listings: {},
      users: new Users()
  }),
  context: {
    services,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
