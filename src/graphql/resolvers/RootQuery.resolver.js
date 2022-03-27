"use strict";

const { resolveUsers, resolveIdols, resolveGroups, resolveListings, resolveCollections } = require("./index");

module.exports = {
  Query: {
    users: (parent, args, context) => resolveUsers(args, context),

    idols: (parent, args, context) => resolveIdols(args, context),

    groups: (parent, args, context) => resolveGroups(args, context),

    listings: (parent, args, context) => resolveListings(args, context),

    collections: (parent, args, context) => resolveCollections(args, context),

    faveGroups: (parent, args, context) => res
  },
};
