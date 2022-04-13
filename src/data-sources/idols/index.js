const { BaseDataSource } = require('../base');
const services = require('../../services');

module.exports.Idols = class extends BaseDataSource {
  constructor() {
    super(services.Airtable.base('idols'));
  }

  async getFavedBy(id) {
    return this.getLinked(id, "favedBy", "users");
  }

  async getGroups(id) {
    return this.getLinked(id, "groups", "groups");
  }

  async getInListings(id) {
    return this.getLinked(id, "inListings", "listings");
  }

  async getWantedByListings(id) {
    return this.getLinked(id, "wantedByListings", "listings");
  }

  async getInCollections(id) {
    return this.getLinked(id, "inCollections", "collections");
  }
}
