const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appllL8PPXs24tCJK',
);

module.exports = {
  Airtable: { base },
};
