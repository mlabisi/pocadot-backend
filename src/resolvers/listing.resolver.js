const { getPage, filter } = require('../util');
module.exports = {
  Listing: {
    id: ({ fields }, __, ___) => fields.id,
    release: ({ fields }) => fields.release,
    description: ({ fields }) => fields.description,
    condition: ({ fields }) => fields.condition,
    startingPrice: ({ fields }) => fields.startingPrice,
    country: ({ fields }) => fields.country,
    isFeatured: ({ fields }) => fields.isFeatured ?? false,
    international: ({ fields }) => fields.international ?? false,
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
    type: ({ fields }) => Array.isArray(fields.type) ? fields.type : [fields.type],
  },
  Query: {
    listings: async (root, { input }, { dataSources }) => {
      return await filter(dataSources.listings, input);
    },
    listingsFeed: async (root, __, { dataSources }) => {
      return filter(dataSources.listings);
    },
    userSuggestions: async (root, { input }, { dataSources }) => {
      return filter(dataSources.listings);
      // const faveGroups = await Promise.all(await dataSources.users.getFaveGroups(input))
      // const faveIdols = await Promise.all(await dataSources.users.getFaveIdols(input))
      //
      // const fields = {};
      // if(faveGroups.length > 0) {
      //   fields.groups = faveGroups.map(group => group.id)
      // }
      // if(faveIdols.length > 0) {
      //   fields.idols = faveIdols.map(idol => idol.id)
      // }
      //
      // return await filter(dataSources.listings, { fields })
    }
  },
  Mutation: {
    addListing: async (_, { input }, { dataSources }) => {
      return dataSources.listings.create([input]).then((created) => created[0]);
    },
    updateListing: async (_, { input }, { dataSources }) => {
      return dataSources.listings.update([input]).then((updated) => updated[0]);
    },
    deleteListings: async (_, { input }, { dataSources }) => {
      return dataSources.listings.delete(input);
    },
  },
};
