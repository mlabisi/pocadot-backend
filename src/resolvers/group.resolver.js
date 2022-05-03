const { getPage, filter } = require('../util');
module.exports = {
  Group: {
    id: (group, __, ___) => group.id,
    name: ({ fields }, __, ___) => fields.name ?? '',
    favedBy: async (group, __, { dataSources }) =>
      (await dataSources.groups.getFavedBy(group.id)) ?? [],
    idols: async (group, __, { dataSources }) =>
      (await dataSources.groups.getIdols(group.id)) ?? [],
    inListings: async (group, __, { dataSources }) =>
      (await dataSources.groups.getInListings(group.id)) ?? [],
    wantedByListings: async (group, __, { dataSources }) =>
      (await dataSources.groups.getWantedByListings(group.id)) ?? [],
    inCollections: async (group, __, { dataSources }) =>
      (await dataSources.groups.getInCollections(group.id)) ?? [],
    isFeatured: ({ fields }, __, ___) => fields.isFeatured ?? false,
  },
  Query: {
    groups: async (root, { input }, { dataSources }) => {
      return await filter(dataSources.groups, input);
    },
    groupsFeed: async (root, { page }, { dataSources }) => {
      return {
        page,
        groups: await getPage(page, dataSources.groups),
      };
    },
  },
};
