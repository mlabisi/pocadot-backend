const { getPage, filter } = require('../util');
module.exports = {
  Collection: {
    id: ({ fields }, __, ___) => fields.id,
    title: ({ fields }) => fields.title,
    description: ({ fields }) => fields.description,
    user: async (collection, __, { dataSources }) =>
      (await dataSources.collections.getUser(collection.id)) ?? {},
    taggedIdols: async (collection, __, { dataSources }) =>
      (await dataSources.collections.getTaggedIdols(collection.id)) ?? {},
    taggedGroups: async (collection, __, { dataSources }) =>
      (await dataSources.collections.getTaggedGroups(collection.id)) ?? {},
  },
  Query: {
    collections: async (root, { input }, { dataSources }) => {
      return await filter(dataSources.collections, input);
    },
    collectionsFeed: async (root, { page }, { dataSources }) => {
      return {
        page,
        collections: await getPage(page, dataSources.collections),
      };
    },
  },
  Mutation: {
    addCollection: async (_, { input }, { dataSources }) => {
      return dataSources.collections.create([input]).then((created) => created[0]);
    },
    updateCollection: async (_, { input }, { dataSources }) => {
      return dataSources.collections.update([input]).then((updated) => updated[0]);
    },
    deleteCollections: async (_, { input }, { dataSources }) => {
      return dataSources.collections.delete(input);
    },
  },
};
