const { Store, Rating, sequelize } = require("../models");
const { ok, error } = require("../utils/responseHandler");

const getMyStores = async (req, res) => {
  try {
    const ownerId = req.user.id || req.user.user_id;

    const stores = await Store.findAll({
      where: { owner_id: ownerId },
      raw: true,
    });

    const results = await Promise.all(
      stores.map(async (s) => {
        const avgData = await Rating.findOne({
          attributes: [[sequelize.fn("AVG", sequelize.col("rating")), "avg"]],
          where: { store_id: s.id },
          raw: true,
        });

        const count = await Rating.count({ where: { store_id: s.id } });

        return {
          ...s,
          average_rating: avgData?.avg ? parseFloat(avgData.avg).toFixed(2) : null,
          total_ratings: count,
        };
      })
    );

    return ok(res, results);
  } catch (err) {
    console.log("GET MY STORES ERROR =>", err);
    return error(res, err.message, 500);
  }
};

const ratingsForStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const store = await Store.findByPk(storeId);
    if (!store) return error(res, 'Store not found', 404);
    if (String(store.owner_id) !== String(req.user.id)) return error(res, 'Not owner of store', 403);
    const ratings = await Rating.findAll({
      where: { store_id: storeId },
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'address'] }]
    });
    return ok(res, ratings);
  } catch (err) {
    return error(res, err.message, 500);
  }
};

const averageForStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const store = await Store.findByPk(storeId);
    if (!store) return error(res, 'Store not found', 404);
    if (String(store.owner_id) !== String(req.user.id)) return error(res, 'Not owner of store', 403);
    const avg = await Rating.avg('rating', { where: { store_id: storeId } });
    return ok(res, { average: avg ? parseFloat(avg).toFixed(2) : null });
  } catch (err) {
    return error(res, err.message, 500);
  }
};

module.exports = { getMyStores, ratingsForStore, averageForStore };
