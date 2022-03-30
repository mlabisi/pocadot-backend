module.exports = {
  User: {
    id: (user) => user.id,
    username: (user) => user.id,
    country: (user) => user.id,
    description: (user) => user.id,
    listings: (user) => user.id,
    faveGroups: (user) => user.id,
    faveListings: (user) => user.id,
    faveUsers: (user) => user.id,
    profilePicture: (user) => user.id,
    collections: (user) => user.id,
  },
  Query: {
    users: (root, args, context) => context.prisma.users.findMany(),
  },
  Mutation: {
    insert_user: (root, args, context) => {},
    update_user: (root, args, context) => {},
    delete_user: (root, args, context) => {},
  },
};
