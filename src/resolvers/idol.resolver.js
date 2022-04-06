module.exports = {
  Idol: {
    id: (idol) => idol.id,
    stageName: ({ fields }) => fields.stageName,
    groups: ({ fields }) => fields.id,
    inListings: ({ fields }) => fields.id,
    wantedByListings: ({ fields }) => fields.id,
    inCollections: ({ fields }) => fields.id,
    isFeatured: ({ fields }) => fields.isFeatured,
  },
  Query: {
    idols: async (root, { ids, fields }, { dataSources }) => {
      if (ids) {
        return ids.length === 1
          ? dataSources.idols.getIdolById(ids[0])
          : dataSources.idols.getIdolById(ids);
      }

      if (fields) {
        return dataSources.idols.getIdolsByFields(fields);
      }
    },
    idolsFeed: async (root, { page }, { dataSources }) => {
      return {
        page,
        idols: await dataSources.idols.getAll(),
      };
    },
  },
  Mutation: {
    insert_idols: (root, args, context) => [],
    update_idols: (root, args, context) => [],
    delete_idols: (root, args, context) => [],
  },
};
