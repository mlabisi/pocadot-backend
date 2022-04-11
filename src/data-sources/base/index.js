const {
  AirtableDataSource,
} = require('../../../../apollo-datasource-airtable/src/index'); // require('apollo-datasource-airtable');

module.exports.BaseDataSource = class extends AirtableDataSource {
  constructor(table) {
    super(table);
  }

  getById(id, ttl = 1440) {
    return this.findOneById(id, { ttl });
  }

  getByIds(ids, ttl = 1440) {
    return this.findManyByIds(ids, { ttl });
  }

  getAll(ttl = 1440) {
    return this.findAll({ ttl });
  }

  getByFields(fields, ttl = 1440) {
    return this.findByFields(fields, { ttl });
  }

  async getLinked(id, fieldName, linkedTable) {
    const ids = await new Promise((resolve, reject) => {
      this.table.find(id, (err, record) => {
          if (err) {
            return reject(err);
          }
          
          return resolve(record._rawJson.fields[fieldName] ?? []);
        }
      );
    });

    return ids.map((linkedId) =>
      this.context.dataSources[linkedTable].getById(linkedId),
    );
  }
};
