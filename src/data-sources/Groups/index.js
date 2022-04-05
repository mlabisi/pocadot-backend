const {
  AirtableDataSource,
} = require('../../../../apollo-datasource-airtable/src/index'); // require('apollo-datasource-airtable');

module.exports.Groups = class extends AirtableDataSource {
  constructor(table) {
    super(table);
  }
  getById(id) {
    return this.findOneByIds(id, { ttl: 1440 });
  }

  getByIds(ids) {
    return this.findManyByIds(ids, { ttl: 1440 });
  }

  getAll() {
    return this.findAll({ ttl: 1440 });
  }

  getByFields(fields) {
    return this.findByFields(fields, { ttl: 1440 });
  }
}
