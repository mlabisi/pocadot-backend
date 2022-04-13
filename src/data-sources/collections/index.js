const { BaseDataSource } = require('../base');
const services = require('../../services');

module.exports.Collections = class extends BaseDataSource {
  constructor() {
    super(services.Airtable.base('collections'));
  }

  async getUser(id) {
    return this.getLinked(id, 'user', 'users');
  }

  async getTaggedIdols(id) {
    return this.getLinked(id, 'taggedIdols', 'idols');
  }

  async getTaggedGroups(id) {
    return this.getLinked(id, 'taggedGroups', 'groups');
  }
};
