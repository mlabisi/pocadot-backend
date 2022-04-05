module.exports = {
  Group: {
    id: (group) => group.id,
    name: ({ fields }) => fields.name,
    favedBy: ({ fields }) => fields.id,
    idols: ({ fields }) => fields.id,
    inListings: ({ fields }) => fields.id,
    wantedByListings: ({ fields }) => fields.id,
    inCollections: ({ fields }) => fields.id,
    isFeatured: ({ fields }) => fields.isFeatured ?? false,
  },
  Query: {
    groups: async (root, { ids, fields }, { dataSources }) => {
      if (ids) {
        return ids.length === 1
          ? dataSources.groups.getGroupById(ids[0])
          : dataSources.groups.getGroupById(ids);
      }

      if (fields) {
        return dataSources.groups.getGroupsByFields(fields);
      }
    },
    groupsFeed: async (root, { page }, { dataSources }) => {
      return {
        page,
        groups: await dataSources.groups.getAll(),
      };
    },
  },
  Mutation: {
    insert_groups: (root, args, context) => [],
    update_groups: (root, args, context) => [],
    delete_groups: (root, args, context) => [],
  },
};
