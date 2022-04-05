const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID,);

const getPage = (table, page, params = {}) => {
  const records = [];
  base(table)
    .select({ ...params, view: 'Grid view' })
    .eachPage(
      (records, fetchNextPage) => {
        if (page) {
          for (let i = 0; i < page; i++) {
            fetchNextPage();
          }
          records.forEach((record) => {
            records.push(record._rawJson);
          });
        } else {
          records.forEach((record) => {
            records.push(record._rawJson);
          });
          fetchNextPage();
        }
      },
      (error) => {
        if (error) {
          console.error(error);
        }
      },
    );

  return records;
};

const getAll = (table) => {
  return base(table).select({view: "Grid view"}).all();
}

module.exports = {
  base,
  getPage,
  getAll,
};
