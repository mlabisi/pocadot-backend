module.exports.getPage = async (page, dataSource, pageSize = 100) => {
  const records = await dataSource.getAll();
  const pagesCt = Math.ceil(records.length / pageSize);

  if (page > pagesCt) {
    throw new Error('The provided page number was invalid.');
  }

  const firstIndex = ((page - 1) * pageSize) === 0 ? 0 : ((page - 1) * pageSize) + 1;
  const lastIndex = ((page * pageSize) >= records.length ? (records.length) - 1 : (page * pageSize)) + 1;

  return records.slice(firstIndex, lastIndex);
}
