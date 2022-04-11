const { BaseDataSource } = require('../base');
const services = require('../../services');

module.exports.Idols = class extends BaseDataSource {
  constructor() {
    super(services.Airtable.base('idols'));
  }

  async getGroups(id) {
    return this.getAssociated(id, "groups", "groups");
  }

  async getInListings(id) {
    return this.getAssociated(id, "inListings", "listings");
  }

  async getWantedByListings(id) {
    return this.getAssociated(id, "wantedByListings", "listings");
  }

  async getInCollections(id) {
    return this.getAssociated(id, "inCollections", "collections");
  }
}
