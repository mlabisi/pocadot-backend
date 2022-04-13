module.exports = {
  User: {
    id: ({ fields }, __, ___) => fields.id,
    username: ({ fields }) => fields.username,
    country: ({ fields }) => fields.country,
    description: ({ fields }) => fields.description,
    listings: async (user, __, { dataSources }) =>
      (await dataSources.users.getListings(user.id)) ?? [],
    faveGroups: async (user, __, { dataSources }) =>
      (await dataSources.users.getFaveGroups(user.id)) ?? [],
    faveIdols: async (user, __, { dataSources }) =>
      (await dataSources.users.getFaveIdols(user.id)) ?? [],
    faveListings: async (user, __, { dataSources }) =>
      (await dataSources.users.getFaveListings(user.id)) ?? [],
    faveUsers: async (user, __, { dataSources }) =>
      (await dataSources.users.getFaveUsers(user.id)) ?? [],
    profilePicture: ({ fields }) => fields.profilePicture,
    collections: async (user, __, { dataSources }) =>
      (await dataSources.users.getCollections(user.id)) ?? [],
    isFeatured: ({ fields }) => fields.isFeatured,
  },
  Query: {
    users: async (root, { ids, fields }, { dataSources }) => {
      if (ids) {
        return ids.length === 1
          ? dataSources.users.getById(ids[0])
          : dataSources.users.getByIds(ids);
      }

      if (fields) {
        return dataSources.users.getByFields(fields);
      }
    },
    usersFeed: async (root, { page }, { dataSources }) => {
      return {
        page,
        users: await dataSources.users.getAll(),
      };
    },
  },
  Mutation: {
    insert_users: (root, args, context) => {},
    update_users: (root, args, context) => {},
    delete_users: (root, args, context) => {},
  },
};
