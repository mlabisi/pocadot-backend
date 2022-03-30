module.exports = {
  Group: {
    id: (group) => group.id,
    name: (group) => group.name,
    members: (group, args, context) =>
      context.prisma.groups.findUnique({
        where: {
          id: group.id,
        },
      }).idols(),
  },
  Query: {
    groups: (root, args, context) => context.prisma.groups.findMany(),
    faveGroups: (root, args, context) =>
      context.prisma.faveGroups.findUnique({
        where: { userId: context.userId },
      }),
  },
};
