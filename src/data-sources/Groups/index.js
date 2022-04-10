const { BaseDataSource } = require('../Base');
const services = require('../../services'); // require('apollo-datasource-airtable');

module.exports.Groups = class extends BaseDataSource {
  constructor() {
    super(services.Airtable.base('groups'));
  }

  async getFavedBy(id) {
    return this.table.find(id, (err, record) => {
      return record._rawJson.favedBy;
    });
  }

  async getIdols(id) {
    const idolIds = await new Promise((resolve) => {
      this.table.find(id, (err, record) => {
        resolve(record._rawJson.fields.members);
      });
    });

    return idolIds.map((idolId) => this.context.dataSources.idols.getById(idolId));
  }
};
