const { AirtableDataSource } = require('@mlabisi/apollo-datasource-airtable');
const TTL = 86400; // 24 hours in seconds
module.exports.BaseDataSource = class extends AirtableDataSource {
  constructor(table) {
    super(table);
  }

  async getById(id, ttl = TTL) {
    return this.findOneById(id, { ttl });
  }

  async getByIds(ids, ttl = TTL) {
    return this.findManyByIds(ids, { ttl });
  }

  async getAll(ttl = TTL) {
    return this.findAll({ ttl });
  }

  async getByFields(fields, ttl = TTL) {
    return this.findByFields(fields, { ttl });
  }

  async create(items) {
    let toCreate = [];
    let created = [];

    for (let i = 0; i < items.length; i++) {
      await this.clearAllRecordsCache();

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
      await this.deleteFromCacheById(items[i].id);
      await this.clearAllRecordsCache();

      const fields = {};
      for (const fieldName in items[i]) {
        if (fieldName !== "id") {
          fields[fieldName] = items[i][fieldName]
        }
      }

      const item = { id: items[i].id, fields }

      // if there are less than ten items and we're at the last item OR
      // if we've queued 9 record objects, then we should add one more to the queue,
      // update the batch of items, then clear the queue
      const shouldUpdateBatch =
        (items.length < 10 && i === items.length - 1) || (i + 1) % 10 === 0;

      if (shouldUpdateBatch) {
        toUpdate.push(item);

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

      toUpdate.push(item);
    }

    return updated;
  }

  async delete(ids) {
    let toDelete = [];
    let deleted = [];

    for (let i = 0; i < ids.length; i++) {
      const item = await this.getById(ids[i]);

      // if there are less than ten ids and we're at the last item OR
      // if we've queued 9 record objects, then we should add one more to the queue,
      // delete the batch of ids, then clear the queue
      const shouldDeleteBatch = i === ids.length - 1 || (i + 1) % 10 === 0;

      if (shouldDeleteBatch) {
        toDelete.push(item.id);
        await this.deleteFromCacheById(item.id);
        await this.clearAllRecordsCache();

        await new Promise((resolve, reject) => {
          this.table.destroy(toDelete, (err, records) => {
            if (err) {
              reject(err);
            }
            const ids = records.map((record) => record.id);
            deleted.push(item)
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
        if (err) reject(err)
        return resolve(record?._rawJson.fields[fieldName] ?? []);
      });
    });

    return Promise.all(ids.map((linkedId) =>
      this.context.dataSources[linkedTable].getById(linkedId),
    ));
  }
};
