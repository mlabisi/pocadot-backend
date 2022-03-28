module.exports = {
  Collection: {
    id: (root) => root.id,
    title: (root) => root.title,
    owner: (root) => root.ownerId,
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
