const { BaseDataSource } = require('../base');
const services = require('../../services'); // require('apollo-datasource-airtable');

module.exports.Groups = class extends BaseDataSource {
  constructor() {
    super(services.Airtable.base('groups'));
  }

  async getFavedBy(id) {
    return this.getAssociated(id, "favedBy", "users");
  }

  async getIdols(id) {
    return this.getAssociated(id, "members", "idols");
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
};
