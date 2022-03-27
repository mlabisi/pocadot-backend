'use strict';

module.exports = ({ filter, size, pageNo }, { dataSources }) => {
    const { database } = dataSources;

    if (!filter) {
        return database.getListings();
    }

    const { ids } = filter;
    const listings = [];

    if (ids) {
        listings.push(database.getListingsById(ids));
    }

    return listings;
}
