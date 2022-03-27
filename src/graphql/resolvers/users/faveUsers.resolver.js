'use strict';

module.exports = (context) => {
    const { database } = context.dataSources;
    const { jwt } = context;

    const currentUser = database.getUsersById()

    return database.getUsersById()
}
