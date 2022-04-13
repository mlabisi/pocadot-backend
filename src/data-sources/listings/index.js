const { BaseDataSource } = require('../base');
const services = require('../../services');

module.exports.Listings = class extends BaseDataSource {
  constructor() {
    super(services.Airtable.base('listings'));
  }

  async getListedBy(id) {
    return this.getLinked(id, 'listedBy', 'users');
  }

  async getFavedBy(id) {
    return this.getLinked(id, 'favedBy', 'users');
  }

  async getIdols(id) {
    return this.getLinked(id, 'idols', 'idols');
  }

  async getGroups(id) {
    return this.getLinked(id, 'groups', 'groups');
  }

  async getTargetIdols(id) {
    return this.getLinked(id, 'targetIdols', 'idols');
  }

  async getTargetGroups(id) {
    return this.getLinked(id, 'targetGroups', 'groups');
  }
};
