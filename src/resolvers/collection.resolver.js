module.exports = {
  Collection: {
    id: (collection) => collection.id,
    title: ({ fields }) => fields.title,
    description: ({ fields }) => fields.description,
    user: ({ fields }) => fields.id,
    taggedIdols: ({ fields }) => fields.id,
    taggedGroups: ({ fields }) => fields.id,
  },
  Query: {
    collections: async (root, { ids, fields }, { dataSources }) => {
      if (ids) {
        return ids.length === 1
          ? dataSources.collections.getCollectionById(ids[0])
          : dataSources.collections.getCollectionById(ids);
      }

      if (fields) {
        return dataSources.collections.getCollectionsByFields(fields);
      }
    },
    collectionsFeed: async (root, { page }, { dataSources }) => {
      return {
        page,
        collections: await dataSources.collections.getAll(),
      };
    },
  },
  Mutation: {
    insert_collections: (root, args, context) => [],
    update_collections: (root, args, context) => [],
    delete_collections: (root, args, context) => [],
  },
};
