'use strict';

module.exports = ({ filter, size, pageNo }, { dataSources }) => {
    const { database } = dataSources;

    if (!filter) {
        return database.getGroups();
    }

    const { ids } = filter;
    const groups = [];

    if (ids) {
        groups.push(database.getGroupsById(ids));
    }

    return groups;
}
