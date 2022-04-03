module.exports = {
  Collection: {
    id: (collection) => collection.id,
    title: ({ fields }) => fields.title,
    description: ({ fields }) => fields.description,
    user: ({ fields }) => fields.id,
    taggedIdols: ({ fields }) => fields.id,
    taggedGroups: ({ fields }) => fields.id,
  },
  Query: {
    collections: (root, args, context) => {
      const { Airtable } = context;
      const results = [];

      const selectClause = {
        view: "Grid view"
      };

      if (args._page_size) {
        selectClause.maxRecords = args._page_size;
      }

      Airtable.base('collections').select(selectClause).eachPage(function page(records, fetchNextPage) {
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
    insert_collections: (root, args, context) => [],
    update_collections: (root, args, context) => [],
    delete_collections: (root, args, context) => [],
  },
};
