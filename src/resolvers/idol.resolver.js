const fetch = require('node-fetch');
module.exports = {
  Idol: {
    id: (idol) => idol.id,
    stageName: ({ fields }) => fields.stageName,
    groups: ({ fields }) => fields.id,
    inListings: ({ fields }) => fields.id,
    wantedByListings: ({ fields }) => fields.id,
    inCollections: ({ fields }) => fields.id,
    isFeatured: ({ fields }) => fields.isFeatured,
  },
  Query: {
    idols: (root, args, context) => {
      const { ids, stageNames, group, inListing, wantedByListing, inCollection, _page_size } = args.input;
      const uri = new URL(process.env.AIRTABLE_BASE_PATH);
      uri.pathname += '/tblZN6oWT1OZZAyhj';

      if (ids) {
        const cases = ids.map(id => `"${id.toString()}", 1`);
        uri.searchParams.append(
          'filterByFormula',
          `(SWITCH(RECORD_ID(),${cases}, 0))=1`,

        );
      }

      if (stageNames) {
        const cases = stageNames.map(name => `"${name.toLowerCase()}", 1`);
        uri.searchParams.append(
          'filterByFormula',
          `(SWITCH(LOWER({name}),${cases}, 0))=1`,
        );
      }

      if (group) {
        uri.searchParams.append(
          'filterByFormula',
          `(FIND("${group.toString()}", ARRAYJOIN({favedBy}, ","))) > 0`,
        );
      }

      if (inListing) {
        uri.searchParams.append(
          'filterByFormula',
          `(FIND("${inListing.toString()}", ARRAYJOIN({inListings}, ","))) > 0`,
        );
      }

      if (wantedByListing) {
        uri.searchParams.append(
          'filterByFormula',
          `(FIND("${wantedByListing.toString()}", ARRAYJOIN({wantedByListings}, ","))) > 0`,
        );
      }

      if (_page_size) {
        uri.searchParams.append('maxRecords', _page_size);
      }

      return fetch(uri, {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          Accept: 'application/json',
        },
      }).then((response) => {
        return response.json().then((json) => json.records);
      });
    },
  },
  Mutation: {
    insert_idols: (root, args, context) => [],
    update_idols: (root, args, context) => [],
    delete_idols: (root, args, context) => [],
  }
};
