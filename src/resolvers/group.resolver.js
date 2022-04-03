const fetch = require('node-fetch');

module.exports = {
  Group: {
    id: (group) => group.id,
    name: ({ fields }) => fields.name,
    favedBy: ({ fields }) => fields.id,
    idols: ({ fields }) => fields.id,
    inListings: ({ fields }) => fields.id,
    wantedByListings: ({ fields }) => fields.id,
    inCollections: ({ fields }) => fields.id,
    isFeatured: ({ fields }) => fields.isFeatured ?? false,
  },
  Query: {
    groups: async (root, args, context) => {
      const { ids, names, favedBy, idol, inListing, wantedByListing, _page_size } = args.input;
      const uri = new URL(process.env.AIRTABLE_BASE_PATH);
      uri.pathname += '/tblsbB2GeKjP82Na1';

      if (ids) {
        const cases = ids.map(id => `"${id.toString()}", 1`);
        uri.searchParams.append(
          'filterByFormula',
          `(SWITCH(RECORD_ID(),${cases}, 0))=1`,

        );
      }

      if (names) {
        const cases = names.map(name => `"${name.toLowerCase()}", 1`);
        uri.searchParams.append(
          'filterByFormula',
          `(SWITCH(LOWER({name}),${cases}, 0))=1`,
        );
      }

      if (favedBy) {
        uri.searchParams.append(
          'filterByFormula',
          `(FIND("${favedBy.toString()}", ARRAYJOIN({favedBy}, ","))) > 0`,
        );
      }

      if (idol) {
        uri.searchParams.append(
          'filterByFormula',
          `(FIND("${idol.toString()}", ARRAYJOIN({members}, ","))) > 0`,
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
    insert_groups: (root, args, context) => [],
    update_groups: (root, args, context) => [],
    delete_groups: (root, args, context) => [],
  },
};
