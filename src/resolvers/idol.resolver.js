module.exports = {
  Idol: {
    id: (idol) => idol.id,
    stageName: (idol) => idol.stageName,
    groups: (idol) => idol.id,
    inListings: (idol) => idol.id,
    wantedByListings: (idol) => idol.id,
    inCollections: (idol) => idol.id,
    isFeatured: (idol) => idol.isFeatured,
  },
  Query: {
    idols: (root, args, context) => [],
  },
  Mutation: {
    insert_idols: (root, args, context) => [],
    update_idols: (root, args, context) => [],
    delete_idols: (root, args, context) => [],
  }
};
