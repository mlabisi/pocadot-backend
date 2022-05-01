module.exports.filter = async (dataSource, { fields, ids }) => {
  if (!fields && !ids) {
    return await dataSource.getAll();
  }

  const filtered = [];

  const shouldFilterById = ids && ids.length > 0;
  const shouldFilterByFields = fields && fields.length > 0;

  if (shouldFilterById) {
    filtered.push(ids.length === 1
      ? await dataSource.getById(ids[0])
      : await dataSource.getByIds(ids));
  }

  if (shouldFilterByFields) {
    filtered.push(await dataSource.getByFields(fields));
  }

  return filtered.flat();
}
