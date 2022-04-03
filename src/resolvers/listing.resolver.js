module.exports = {
  Listing: {
    id: (listing) => listing.id,
    release: ({ fields }) => fields.release,
    description: ({ fields }) => fields.description,
    condition: ({ fields }) => fields.condition,
    startingPrice: ({ fields }) => fields.startingPrice,
    country: ({ fields }) => fields.country,
    isFeatured: ({ fields }) => fields.isFeatured,
    international: ({ fields }) => fields.international,
    listedBy: ({ fields }) => fields.id,
    favedBy: ({ fields }) => fields.id,
    idols: ({ fields }) => fields.id,
    groups: ({ fields }) => fields.id,
    targetIdols: ({ fields }) => fields.id,
    targetMinCondition: ({ fields }) => fields.targetMinCondition,
    targetGroups: ({ fields }) => fields.id,
    targetMinStaringPrice: ({ fields }) => fields.targetMinStaringPrice,
    type: ({ fields }) => fields.type,
  },
  Query: {
    listings: (root, args, context) => {
      const { Airtable } = context;
      const results = [];

      const selectClause = {
        view: "Grid view"
      };

      if (args._page_size) {
        selectClause.maxRecords = args._page_size;
      }

      Airtable.base('listings').select(selectClause).eachPage(function page(records, fetchNextPage) {
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
    insert_listings: (root, args, context) => {},
    update_listings: (root, args, context) => {},
    delete_listings: (root, args, context) => {},
  },
};
