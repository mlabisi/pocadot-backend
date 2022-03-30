module.exports = {
  Collection: {
    id: (collection) => collection.id,
    title: (collection) => collection.id,
    description: (collection) => collection.id,
    user: (collection) => collection.id,
    taggedIdols: (collection) => collection.id,
  },
  Query: {
    collections: (root, args, context) => [],
  },
  Mutation: {
    insert_collection: (root, args, context) => [],
    update_collection: (root, args, context) => [],
    delete_collection: (root, args, context) => [],
  },
};
