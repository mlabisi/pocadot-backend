const { BaseDataSource } = require('../Base');
const services = require('../../services');

module.exports.Idols = class extends BaseDataSource {
  constructor() {
    super(services.Airtable.base('idols'));
  }

  async getGroups(id) {
    const groupIds = await new Promise((resolve) => {
      this.table.find(id, (err, record) => {
        resolve(record._rawJson.fields.groups);
      });
    });

    return groupIds.map((groupId) => this.context.dataSources.groups.getById(groupId));
  }
}
