'use strict';

module.exports = ({ filter, size, pageNo }, { dataSources }) => {
    const { database } = dataSources;

    if (!filter) {
        return database.getCollections();
    }

    const { ids } = filter;
    const collections = [];

    if (ids) {
        collections.push(database.getCollectionsById(ids));
    }

    return collections;
}
