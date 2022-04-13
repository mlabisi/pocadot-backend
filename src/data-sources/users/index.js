const { BaseDataSource } = require('../base');
const services = require('../../services');

module.exports.Users = class extends BaseDataSource {
  constructor() {
    super(services.Airtable.base('users'));
  }
}
