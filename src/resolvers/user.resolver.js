module.exports = {
  User: {
    id: (user) => user.id,
    username: (user) => user.username,
    country: (user) => user.country,
    description: (user) => user.description,
    listings: (user) => user.id,
    faveGroups: (user) => user.id,
    faveListings: (user) => user.id,
    faveUsers: (user) => user.id,
    profilePicture: (user) => user.profilePicture(),
    collections: (user) => user.id,
    isFeatured: (user) => user.isFeatured,
  },
  Query: {
    users: (root, args, context) => [],
  },
  Mutation: {
    insert_users: (root, args, context) => {},
    update_users: (root, args, context) => {},
    delete_users: (root, args, context) => {},
  },
};
