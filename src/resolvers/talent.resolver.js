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
    preferencesFeed: async (_, __, { dataSources }) => {
      const groups = await filter(dataSources.groups);
      const idols = await filter(dataSources.idols, {
        fields: { isSolo: true },
      });

      return [...groups, ...idols]
    },
    userPreferences: async (_, { input }, { dataSources }) => {
      const { ids } = input
      const faveGroups = await dataSources.users.getFaveGroups(ids[0])
      const faveIdols = await dataSources.users.getFaveIdols(ids[0])

      return [...faveGroups, ...faveIdols]
    }

  },
  Mutation: {
    userPreferences: async (_, { input }, { dataSources }) => {
      const updated = await dataSources.users.update([input]).then((updated) => updated[0]);
      const faveGroups = await dataSources.users.getFaveGroups(updated.id)
      const faveIdols = await dataSources.users.getFaveIdols(updated.id)

      return [...faveGroups, ...faveIdols]
    },
  }
};
