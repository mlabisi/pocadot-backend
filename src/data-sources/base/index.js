const { AirtableDataSource } = require('@mlabisi/apollo-datasource-airtable');

module.exports.BaseDataSource = class extends AirtableDataSource {
  constructor(table) {
    super(table);
  }

  async getById(id, ttl = 1440) {
    return this.findOneById(id, { ttl });
  }

  async getByIds(ids, ttl = 1440) {
    return this.findManyByIds(ids, { ttl });
  }

  async getAll(ttl = 1440) {
    return this.findAll({ ttl });
  }

  async getByFields(fields, ttl = 1440) {
    return this.findByFields(fields, { ttl });
  }

  async create(items) {
    let toCreate = [];
    let created = [];

    for (let i = 0; i < items.length; i++) {
      this.clearAllRecords();

      // if there are less than ten items and we're at the last item OR
      // if we've queued 9 record objects, then we should add one more to the queue,
      // create the batch of items, then clear the queue
      const shouldCreateBatch =
        (items.length < 10 && i === items.length - 1) || (i + 1) % 10 === 0;

      if (shouldCreateBatch) {
        toCreate.push({ fields: items[i] });

        const resolved = await new Promise((resolve, reject) => {
          this.table.create(toCreate, (err, records) => {
            if (err) {
              reject(err);
            }
            const results = records.map((record) => record._rawJson);
            resolve(results);
          });
        });

        created = [...created, ...resolved];

        toCreate = [];
        continue;
      }

      toCreate.push({ fields: items[i] });
    }

    return created;
  }

  async update(items) {
    let toUpdate = [];
    let updated = [];

    for (let i = 0; i < items.length; i++) {
      this.deleteFromCacheById(items[i].id);
      this.clearAllRecords();

      // if there are less than ten items and we're at the last item OR
      // if we've queued 9 record objects, then we should add one more to the queue,
      // update the batch of items, then clear the queue
      const shouldUpdateBatch =
        (items.length < 10 && i === items.length - 1) || (i + 1) % 10 === 0;

      if (shouldUpdateBatch) {
        toUpdate.push({ id: items[i].id, fields: items[i] });

        const resolved = await new Promise((resolve, reject) => {
          this.table.update(toUpdate, (err, records) => {
            if (err) {
              reject(err);
            }
            const results = records.map((record) => record._rawJson);
            resolve(results);
          });
        });

        updated = [...updated, ...resolved];

        toUpdate = [];
        continue;
      }

      toUpdate.push({ id: items[i].id, fields: items[i] });
    }

    return updated;
  }

  async delete(ids) {
    let toDelete = [];
    let deleted = [];

    for (let i = 0; i < ids.length; i++) {
      // if there are less than ten ids and we're at the last item OR
      // if we've queued 9 record objects, then we should add one more to the queue,
      // delete the batch of ids, then clear the queue
      const shouldDeleteBatch = i === ids.length - 1 || (i + 1) % 10 === 0;

      if (shouldDeleteBatch) {
        toDelete.push(ids[i]);
        await this.deleteFromCacheById(ids[i]);

        deleted = await new Promise((resolve, reject) => {
          this.table.destroy(toDelete, (err, records) => {
            if (err) {
              reject(err);
            }
            const ids = records.map((record) => record.id);
            resolve(ids);
          });
        });
        toDelete = [];
        continue;
      }

      toDelete.push(ids[i]);
    }

    return deleted;
  }

  async getLinked(id, fieldName, linkedTable) {
    const ids = await new Promise((resolve, reject) => {
      this.table.find(id, (err, record) => {
        return resolve(record?._rawJson.fields[fieldName] ?? []);
      });
    });

    return ids.map((linkedId) =>
      this.context.dataSources[linkedTable].getById(linkedId),
    );
  }
};
