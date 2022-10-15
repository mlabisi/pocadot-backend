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

const loggingPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext) {
    console.log(
      `${new Date()} - Request started! Query:\n` +
        requestContext.request.query,
    );

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart(requestContext) {
        console.log(`${new Date()} - Parsing started!`);
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart(requestContext) {
        console.log(`${new Date()} - Validation started!`);
      },
    };
  },
};

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
  formatError: (err) => {
    console.log(err);
    return err;
  },
  introspection: true,
  plugins: [loggingPlugin],
});

server
  .listen({
    port: process.env.PORT ?? 4000,
    host: process.env.HOST ?? '0.0.0.0',
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
