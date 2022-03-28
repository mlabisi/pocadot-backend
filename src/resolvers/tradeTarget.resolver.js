module.exports = {
  TradeTarget: {
    __resolveType: (root) => {
      if (root.stageName) {
        return 'Idol';
      }

      if (root.members) {
        return 'Group';
      }

      return 'CardConditionWrapper';
    },
  },
};
