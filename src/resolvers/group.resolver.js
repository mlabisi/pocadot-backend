module.exports = {
  Group: {
    id: ({ fields }, __, ___) => fields.id,
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
      const { ids, fields } = input;

      if (ids) {
        return ids.length === 1
          ? dataSources.groups.getById(ids[0])
          : dataSources.groups.getByIds(ids);
      }

      if (fields) {
        return dataSources.groups.getByFields(fields);
      }
    },
    groupsFeed: async (root, { page }, { dataSources }) => {
      return {
        page,
        groups: await dataSources.groups.getAll(),
      };
    },
  },
};
