module.exports = {
  Idol: {
    id: (idol) => idol.id,
    stageName: ({fields}) => fields.stageName,
    groups: async (idol, __, { dataSources }) =>
      await dataSources.idols.getGroups(idol.id) ?? [],
    inListings: (idol, __, { dataSources }) => [],
    wantedByListings: (idol, __, { dataSources }) => [],
    inCollections: (idol, __, { dataSources }) => [],
    isFeatured: ({ fields }) => fields.isFeatured ?? false,
  },
  Query: {
    idols: async (root, { input }, { dataSources }) => {
      const { ids, fields } = input;

      if (ids) {
        return ids.length === 1
          ? dataSources.idols.getIdolById(ids[0])
          : dataSources.idols.getIdolById(ids);
      }

      if (fields) {
        return dataSources.idols.getByFields(fields);
      }
    },
    idolsFeed: async (root, _, { dataSources }) => {
      return {
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
