module.exports = {
  User: {
    id: ({fields}, __, ___) => fields.id,
    username: ({ fields }) => fields.username,
    country: ({ fields }) => fields.country,
    description: ({ fields }) => fields.description,
    listings: ({ fields }) => fields.id,
    faveGroups: ({ fields }) => fields.id,
    faveListings: ({ fields }) => fields.id,
    faveUsers: ({ fields }) => fields.id,
    profilePicture: ({ fields }) => fields.profilePicture(),
    collections: ({ fields }) => fields.id,
    isFeatured: ({ fields }) => fields.isFeatured,
  },
  Query: {
    users: async (root, { ids, fields }, { dataSources }) => {
      if (ids) {
        return ids.length === 1
          ? dataSources.users.getUserById(ids[0])
          : dataSources.users.getUserById(ids);
      }

      if (fields) {
        return dataSources.users.getUsersByFields(fields);
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
