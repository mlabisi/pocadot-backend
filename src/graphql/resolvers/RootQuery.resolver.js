"use strict";

module.exports = {
  Query: {
    users: (parent, args, context) => {
      const { filter, size, pageNo } = args;
      const { dataSources } = context;
      const { database } = dataSources;

      if (!filter) {
        return database.getUsers();
      }

      const { ids, usernameContains, listingIdolsContain, country } = filter;
      const users = [];

      if (ids) {
        users.push(database.getUsersById(ids));
      }

      if (usernameContains) {
        users.push(database.getUsersByUsername(usernameContains));
      }

      if (listingIdolsContain) {
        users.push(database.getUsersByIdolsListed(listingIdolsContain));
      }

      if (country) {
        users.push(database.getUsersByCountry(country));
      }

      return users;
    },

    idols: (parent, args, context) => {},

    listings: (parent, args, context) => {},

    collections: (parent, args, context) => {},

    groups: (parent, args, context) => {},

    releases: (parent, args, context) => {},
  },
};
