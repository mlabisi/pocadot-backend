const { getPage, filter } = require('../util');
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
    isFeatured: ({ fields }) => fields.isFeatured ?? false,
    chats: async (user, __, context) => (await context.dataSources.chats.fetchUserConversations({ userId: user.id }))
  },
  Query: {
    users: async (root, { input }, { dataSources }) => {
      return await filter(dataSources.users, input);
    },
    usersFeed: async (root, { page }, { dataSources }) => {
      return {
        page,
        users: await getPage(page, dataSources.users),
      };
    },
  },
  Mutation: {
    addUser: async (_, { input }, { dataSources }) => {
      return dataSources.users.create([input]).then((created) => created[0]);
    },
    updateUser: async (_, { input }, { dataSources }) => {
      return dataSources.users.update([input]).then((updated) => updated[0]);
    },
    deleteUser: async (_, { input }, { dataSources }) => {
      return dataSources.users.delete([input]).then((deleted) => deleted[0]);
    },
  },
};
