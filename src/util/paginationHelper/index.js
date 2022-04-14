module.exports.getPage = async (page, dataSource) => {
  const records = await dataSource.getAll();
  const pagesCt = Math.ceil(records.length / 100);

  if (page > pagesCt) {
    throw new Error('The provided page number was invalid.');
  }

  const firstIndex = ((page - 1) * 100) === 0 ? 0 : ((page - 1) * 100) + 1;
  const lastIndex = ((page * 100) >= records.length ? (records.length) - 1 : (page * 100)) + 1;

  return records.slice(firstIndex, lastIndex);
}
