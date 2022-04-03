module.exports = {
  Listing: {
    id: (listing) => listing.id,
    release: (listing) => listing.release,
    description: (listing) => listing.description,
    condition: (listing) => listing.condition,
    startingPrice: (listing) => listing.startingPrice,
    country: (listing) => listing.country,
    isFeatured: (listing) => listing.isFeatured,
    international: (listing) => listing.international,
    listedBy: (listing) => listing.id,
    favedBy: (listing) => listing.id,
    idols: (listing) => listing.id,
    groups: (listing) => listing.id,
    targetIdols: (listing) => listing.id,
    targetMinCondition: (listing) => listing.targetMinCondition,
    targetGroups: (listing) => listing.id,
    targetMinStaringPrice: (listing) => listing.targetMinStaringPrice,
    type: (listing) => listing.type,
  },
  Query: {
    listings: (root, args, context) => [],
  },
  Mutation: {
    insert_listings: (root, args, context) => {},
    update_listings: (root, args, context) => {},
    delete_listings: (root, args, context) => {},
  },
};
