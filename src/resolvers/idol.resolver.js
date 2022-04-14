const { getPage } = require('../util');
module.exports = {
  Idol: {
    id: ({ fields }, __, ___) => fields.id,
    stageName: ({ fields }, __, ___) => fields.stageName,
    favedBy: async (idol, __, { dataSources }) =>
      (await dataSources.idols.getFavedBy(idol.id)) ?? [],
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
          ? dataSources.idols.getById(ids[0])
          : dataSources.idols.getByIds(ids);
      }

      if (fields) {
        return dataSources.idols.getByFields(fields);
      }
    },
    idolsFeed: async (root, { page }, { dataSources }) => {
      return {
        page,
        idols: await getPage(page, dataSources.idols),
      };
    },
  },
};
