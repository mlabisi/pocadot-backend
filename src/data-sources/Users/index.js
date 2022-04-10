const { BaseDataSource } = require('../Base');
const services = require('../../services'); // require('apollo-datasource-airtable');

module.exports.Users = class extends BaseDataSource {
  constructor() {
    super(services.Airtable.base('users'));
  }
}
