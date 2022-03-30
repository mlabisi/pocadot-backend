module.exports = {
  Collection: {
    id: (collection) => collection.id,
    title: (collection) => collection.title,
    owner: (collection) => collection.ownerId,
  },
  Query: {
    collections: (root, args, context) => {},
    userCollections: (root, args, context) => {},
  },
  Mutation: {
    createCollection: (root, args, context) => {},
    updateCollection: (root, args, context) => {},
    removeCollection: (root, args, context) => {},
  },
};
