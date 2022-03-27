'use strict';

module.exports = ({ filter, size, pageNo }, { dataSources }) => {
    const { database } = dataSources;

    if (!filter) {
        return database.getUsers();
    }

    const { ids, listingIdolsContain } = filter;
    const users = [];

    if (ids) {
        users.push(database.getUsersById(ids));
    }

    if (listingIdolsContain) {
        users.push(database.getUsersByIdolsListed(listingIdolsContain));
    }

    return users;
}
