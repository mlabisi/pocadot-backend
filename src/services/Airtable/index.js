const Airtable = require('airtable');

module.exports = {
  base: new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID,
  ),
};
