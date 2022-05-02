const { getPage, filter } = require('../util');
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
    isSolo: ({ fields }) => fields.isSolo ?? false,
  },
  Query: {
    idols: async (root, { input }, { dataSources }) => {
      return await filter(dataSources.idols, input);
    },
    idolsFeed: async (root, { page }, { dataSources }) => {
      return {
        page,
        idols: await getPage(page, dataSources.idols),
      };
    },
  },
};
