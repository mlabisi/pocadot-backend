module.exports = {
  Listing: {
    id: (listing) => listing.id,
    release: (listing) => listing.id,
    description: (listing) => listing.id,
    condition: (listing) => listing.id,
    startingPrice: (listing) => listing.id,
    country: (listing) => listing.id,
    international: (listing) => listing.id,
    listedBy: (listing) => listing.id,
    favedBy: (listing) => listing.id,
    idols: (listing) => listing.id,
    groups: (listing) => listing.id,
    targetIdols: (listing) => listing.id,
    targetMinCondition: (listing) => listing.id,
    targetGroups: (listing) => listing.id,
    targetMinStaringPrice: (listing) => listing.id,
    type: (listing) => listing.id,
  },
  Query: {
    listings: (root, args, context) => context.prisma.listings.findMany(),
  },
  Mutation: {
    insert_listing: (root, args, context) => {},
    update_listing: (root, args, context) => {},
    delete_listing: (root, args, context) => {},
  },
};
