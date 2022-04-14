const { getPage } = require('../util');
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
    collections: async (root, { ids, fields }, { dataSources }) => {
      if (ids) {
        return ids.length === 1
          ? dataSources.collections.getById(ids[0])
          : dataSources.collections.getByIds(ids);
      }

      if (fields) {
        return dataSources.collections.getByFields(fields);
      }
    },
    collectionsFeed: async (root, { page }, { dataSources }) => {
      return {
        page,
        collections: await getPage(page, dataSources.collections),
      };
    },
  },
  Mutation: {
    addCollections: async (_, { input }, { dataSources }) => {
      return dataSources.collections.create(input);
    },
    updateCollections: async (_, { input }, { dataSources }) => {
      return dataSources.collections.update(input);
    },
    deleteCollections: async (_, { input }, { dataSources }) => {
      return dataSources.collections.delete(input);
    },
  },
};
