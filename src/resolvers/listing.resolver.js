module.exports = {
  Listing: {
    __resolveType: (root) => {
      return root.tradeTargets ? 'TradeListing' : 'SellListing';
    },
  },
  SellListing: {
    id: () => {},
    owner: () => {},
    condition: () => {},
    idol: () => {},
    release: () => {},
    description: () => {},
    countryOfOrigin: () => {},
    internationalShipping: () => {},
    minPrice: () => {},
  },
  TradeListing: {
    id: () => {},
    owner: () => {},
    condition: () => {},
    idol: () => {},
    release: () => {},
    description: () => {},
    countryOfOrigin: () => {},
    internationalShipping: () => {},
    tradeTargets: () => {},
    minPrice: () => {},
  },
  Query: {
    listings: (root, args, context) => {},
    faveListings: (root, args, context) => {},
    userListings: (root, args, context) => {},
  },
  Mutation: {
    createListing: (root, args, context) => {},
    updateListing: (root, args, context) => {},
    removeListing: (root, args, context) => {},
  },
};
