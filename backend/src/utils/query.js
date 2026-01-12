const buildSort = (sortBy, orderBy) => {
  const order = (orderBy || "ASC").toUpperCase() === "DESC" ? "DESC" : "ASC";
  if (!sortBy) return [["createdAt", "DESC"]];
  return [[sortBy, order]];
};

const buildPagination = (page = 1, limit = 10) => {
  const take = Math.min(parseInt(limit, 10) || 10, 100);
  const skip = ((parseInt(page, 10) || 1) - 1) * take;
  return { limit: take, offset: skip };
};

module.exports = { buildSort, buildPagination };
