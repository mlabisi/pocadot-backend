const { filter } = require('../util');

module.exports = {
  Talent: {
    __resolveType: (item) => {
      if (item.fields.stageName) {
        return "Idol"
      }

      return "Group"
    }
  },
  Query: {
    preferencesFeed: async (root, __, { dataSources }) => {
      const groups = await filter(dataSources.groups);
      const idols = await filter(dataSources.idols, {
        fields: { isSolo: true },
      });

      return [...groups, ...idols]
    }
  },
};
