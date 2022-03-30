module.exports = {
  Group: {
    id: (group) => group.id,
    name: (group) => group.id,
    favedBy: (group) => group.id,
    members: (group) => group.id,
    inListings: (group) => group.id,
    wantedByListings: (group) => group.id,
  },
  Query: {
    groups: (root, args, context) => context.prisma.groups.findMany(),
  },
  Mutation: {
    insert_groups: (root, args, context) => [],
    update_groups: (root, args, context) => [],
    delete_groups: (root, args, context) => [],
  },
};
