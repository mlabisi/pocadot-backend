module.exports = {
  User: {
    id: (user) => user.id,
    username: (user) => user.username,
    country: (user) => user.country,
    listings: (user, args, context) =>
      context.prisma.users
        .findUnique({
          where: {
            id: user.id,
          },
          select: {
            listings: true,
          }
        }),
    collections: (user, args, context) =>
      context.prisma.users
        .findUnique({
          where: {
            id: user.id,
          },
          select: {
            collections: true,
          }
        }),
  },
  Query: {
    users: (root, args, context) => context.prisma.users.findMany(),
    faveUsers: (root, args, context) =>
      context.prisma.faveUsers.findUnique({
        where: { sourceId: context.userId },
      }),
  },
  Mutation: {
    createUser: (root, args, context) => {},
    updateUser: (root, args, context) => {},
    removeUser: (root, args, context) => {},
  },
};
