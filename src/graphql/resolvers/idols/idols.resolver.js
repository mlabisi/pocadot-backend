'use strict';

module.exports = ({ filter, size, pageNo }, { dataSources }) => {
    const { database } = dataSources;

    if (!filter) {
        return database.getIdols();
    }

    const { ids } = filter;
    const idols = [];

    if (ids) {
        idols.push(database.getIdolsById(ids));
    }

    return idols;
}
