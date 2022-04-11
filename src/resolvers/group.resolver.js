module.exports = {
  Group: {
    id: (group) => group.id,
    name: ({ fields }, __) => fields.name ?? '',
    favedBy: async (group, __, { dataSources }) =>
      (await dataSources.groups.getFavedBy(group.id)) ?? [],
    idols: async (group, __, { dataSources }) =>
      (await dataSources.groups.getIdols(group.id)) ?? [],
    inListings: (group, __, { dataSources }) => [],
    wantedByListings: (group, __, { dataSources }) => [],
    inCollections: (group, __, { dataSources }) => [],
    isFeatured: ({ fields }, __, { dataSources }) => fields.isFeatured ?? false,
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
