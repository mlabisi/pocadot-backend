module.exports = {
  User: {
    id: () => {},
    username: () => {},
    country: () => {},
    listings: () => {},
    collections: () => {},
  },
  Query: {
    users: (root, args, context) => {},
    faveUsers: (root, args, context) => {},
  },
  Mutation: {
    createUser: (root, args, context) => {},
    updateUser: (root, args, context) => {},
    removeUser: (root, args, context) => {},
  },
};
