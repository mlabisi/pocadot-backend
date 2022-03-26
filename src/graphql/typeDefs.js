'use strict';

const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs } = require('@graphql-tools/merge')

const typeDefs = loadFilesSync(path.join(__dirname, './type-defs'));

module.exports = mergeTypeDefs(typeDefs);
