const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const typeDefsArray = loadFilesSync(path.join(__dirname, './type-defs'));
const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));

const typeDefs = mergeTypeDefs(typeDefsArray);
const resolvers = mergeResolvers(resolversArray);

module.exports = {
  typeDefs,
  resolvers,
};
