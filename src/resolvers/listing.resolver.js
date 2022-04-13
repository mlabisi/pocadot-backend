module.exports = {
  Listing: {
    id: ({ fields }, __, ___) => fields.id,
    release: ({ fields }) => fields.release,
    description: ({ fields }) => fields.description,
    condition: ({ fields }) => fields.condition,
    startingPrice: ({ fields }) => fields.startingPrice,
    country: ({ fields }) => fields.country,
    isFeatured: ({ fields }) => fields.isFeatured,
    international: ({ fields }) => fields.international,
    listedBy: async (listing, __, { dataSources }) =>
      (await dataSources.listings.getListedBy(listing.id)) ?? {},
    favedBy: async (listing, __, { dataSources }) =>
      (await dataSources.listings.getFavedBy(listing.id)) ?? [],
    idols: async (listing, __, { dataSources }) =>
      (await dataSources.listings.getIdols(listing.id)) ?? [],
    groups: async (listing, __, { dataSources }) =>
      (await dataSources.listings.getGroups(listing.id)) ?? [],
    targetIdols: async (listing, __, { dataSources }) =>
      (await dataSources.listings.getTargetIdols(listing.id)) ?? [],
    targetMinCondition: ({ fields }) => fields.targetMinCondition,
    targetGroups: async (listing, __, { dataSources }) =>
      (await dataSources.listings.getTargetGroups(listing.id)) ?? [],
    targetMinStaringPrice: ({ fields }) => fields.targetMinStaringPrice,
    type: ({ fields }) => fields.type,
  },
  Query: {
    listings: async (root, { ids, fields }, { dataSources }) => {
      if (ids) {
        return ids.length === 1
          ? dataSources.listings.getById(ids[0])
          : dataSources.listings.getByIds(ids);
      }

      if (fields) {
        return dataSources.listings.getByFields(fields);
      }
    },
    listingsFeed: async (root, { page }, { dataSources }) => {
      return {
        page,
        listings: await dataSources.listings.getAll(),
      };
    },
  },
  Mutation: {
    insert_listings: (root, args, context) => {},
    update_listings: (root, args, context) => {},
    delete_listings: (root, args, context) => {},
  },
};
