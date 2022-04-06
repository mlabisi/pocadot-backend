module.exports = {
  Listing: {
    id: (listing) => listing.id,
    release: ({ fields }) => fields.release,
    description: ({ fields }) => fields.description,
    condition: ({ fields }) => fields.condition,
    startingPrice: ({ fields }) => fields.startingPrice,
    country: ({ fields }) => fields.country,
    isFeatured: ({ fields }) => fields.isFeatured,
    international: ({ fields }) => fields.international,
    listedBy: ({ fields }) => fields.id,
    favedBy: ({ fields }) => fields.id,
    idols: ({ fields }) => fields.id,
    groups: ({ fields }) => fields.id,
    targetIdols: ({ fields }) => fields.id,
    targetMinCondition: ({ fields }) => fields.targetMinCondition,
    targetGroups: ({ fields }) => fields.id,
    targetMinStaringPrice: ({ fields }) => fields.targetMinStaringPrice,
    type: ({ fields }) => fields.type,
  },
  Query: {
    listings: async (root, { ids, fields }, { dataSources }) => {
      if (ids) {
        return ids.length === 1
          ? dataSources.listings.getListingById(ids[0])
          : dataSources.listings.getListingById(ids);
      }

      if (fields) {
        return dataSources.listings.getListingsByFields(fields);
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
