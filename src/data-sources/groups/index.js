const { BaseDataSource } = require('../base');
const services = require('../../services'); // require('apollo-datasource-airtable');

module.exports.Groups = class extends BaseDataSource {
  constructor() {
    super(services.Airtable.base('groups'));
  }

  async getFavedBy(id) {
    return this.getLinked(id, "favedBy", "users");
  }

  async getIdols(id) {
    return this.getLinked(id, "members", "idols");
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
};
