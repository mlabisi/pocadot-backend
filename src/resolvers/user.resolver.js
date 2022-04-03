module.exports = {
  User: {
    id: (user) => user.id,
    username: ({ fields }) => fields.username,
    country: ({ fields }) => fields.country,
    description: ({ fields }) => fields.description,
    listings: ({ fields }) => fields.id,
    faveGroups: ({ fields }) => fields.id,
    faveListings: ({ fields }) => fields.id,
    faveUsers: ({ fields }) => fields.id,
    profilePicture: ({ fields }) => fields.profilePicture(),
    collections: ({ fields }) => fields.id,
    isFeatured: ({ fields }) => fields.isFeatured,
  },
  Query: {
    users: (root, args, context) => {
      const { Airtable } = context;
      const results = [];

      const selectClause = {
        view: "Grid view"
      };

      if (args._page_size) {
        selectClause.maxRecords = args._page_size;
      }

      Airtable.base('users').select(selectClause).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          results.push(record.fields);
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

      }, function done(err) {
        if (err) { console.error(err);  }
      });

      return results;
    },
  },
  Mutation: {
    insert_users: (root, args, context) => {},
    update_users: (root, args, context) => {},
    delete_users: (root, args, context) => {},
  },
};
