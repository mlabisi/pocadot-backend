module.exports = {
  Group: {
    id: (group) => group.id,
    name: (group) => group.name,
    favedBy: (group) => group.id,
    members: (group) => group.id,
    inListings: (group) => group.id,
    wantedByListings: (group) => group.id,
    inCollections: (group) => group.id,
    isFeatured: (group) => group.isFeatured,
  },
  Query: {
    groups: (root, args, context) => [],
  },
  Mutation: {
    insert_groups: (root, args, context) => [],
    update_groups: (root, args, context) => [],
    delete_groups: (root, args, context) => [],
  },
};
