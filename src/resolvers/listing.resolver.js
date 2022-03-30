module.exports = {
  Listing: {
    __resolveType: (listing) => {
      return listing.tradeTargets ? 'TradeListing' : 'SellListing';
    },
    id: (listing) => listing.id,
    owner: (listing) => listing.owner,
    condition: (listing) => listing.condition,
    idol: (listing, args, context) =>
      context.prisma.listings
        .findUnique({
          where: {
            id: listing.id,
          },
          select: {
            listings: true,
          }
        }),
    release: (listing) => listing.release,
    description: (listing) => listing.description,
    countryOfOrigin: (listing) => listing.country,
    internationalShipping: (listing) => listing.international,
  },
  SellListing: {
    minPrice: (listing) => listing.startingPrice,
  },
  TradeListing: {
    tradeTargets: (listing) => listing.tradeTargets,
    minPrice: (listing) => listing.startingPrice,
  },
  Query: {
    listings: (root, args, context) => context.prisma.listings.findMany(),
    faveListings: (root, args, context) => {},
    userListings: (root, args, context) => {},
  },
  Mutation: {
    createListing: (root, args, context) => {},
    updateListing: (root, args, context) => {},
    removeListing: (root, args, context) => {},
  },
};
