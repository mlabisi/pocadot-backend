module.exports.filter = async (dataSource, { fields, ids }) => {
  const shouldFilterById = ids && ids.length > 0;
  const shouldFilterByFields = fields && Object.keys(fields).length > 0;

  if (!(shouldFilterById || shouldFilterByFields)) {
    return await dataSource.getAll();
  }

  const filtered = [];

  if (shouldFilterById) {
    filtered.push(
      ids.length === 1
        ? dataSource.getById(ids[0])
        : dataSource.getByIds(ids),
    );
  }

  if (shouldFilterByFields) {
    filtered.push(dataSource.getByFields(fields));
  }

  return (await Promise.all(filtered)).flat();
};
