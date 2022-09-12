const { BaseDataSource } = require('../base');
const services = require('../../services');

module.exports.Users = class extends BaseDataSource {
  constructor() {
    super(services.Airtable.base('users'));
  }

  async create(items) {
    const user = super.create(items)[0];

    return services.Twilio.client.conversations.v1.users.create({identity: user.id}).then(() => user)
  }

  async getListings(id) {
    return this.getLinked(id, 'listings', 'listings');
  }

  async getFaveUsers(id) {
    return this.getLinked(id, 'faveUsers', 'users');
  }

  async getFaveIdols(id) {
    return this.getLinked(id, 'faveIdols', 'idols');
  }

  async getFaveGroups(id) {
    return this.getLinked(id, 'faveGroups', 'groups');
  }

  async getFaveListings(id) {
    return this.getLinked(id, 'faveListings', 'listings');
  }

  async getCollections(id) {
    return this.getLinked(id, 'collections', 'collections');
  }
}
