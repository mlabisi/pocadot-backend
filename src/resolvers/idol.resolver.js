module.exports = {
  Idol: {
    id: ({ fields }, __, ___) => fields.id,
    stageName: ({ fields }, __, ___) => fields.stageName,
    groups: async (idol, __, { dataSources }) =>
      (await dataSources.idols.getGroups(idol.id)) ?? [],
    inListings: async (idol, __, { dataSources }) =>
      (await dataSources.idols.getInListings(idol.id)) ?? [],
    wantedByListings: async (idol, __, { dataSources }) =>
      (await dataSources.idols.getWantedByListings(idol.id)) ?? [],
    inCollections: async (idol, __, { dataSources }) =>
      (await dataSources.idols.getInCollections(idol.id)) ?? [],
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
};
