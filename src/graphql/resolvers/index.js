'use strict';

module.exports = {
    resolveUsers: require('./users/users.resolver'),
    resolveIdols: require('./idols/idols.resolver'),
    resolveGroups: require('./groups/groups.resolver'),
    resolveListings: require('./listings/listings.resolver'),
    resolveCollections: require('./collections/collections.resolver')
}
