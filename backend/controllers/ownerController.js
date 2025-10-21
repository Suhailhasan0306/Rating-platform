const { Store, Rating, sequelize } = require('../models');
const { success, error } = require('../utils/responseHandler');

const getMyStores = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const stores = await Store.findAll({
      where: { owner_id: ownerId },
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT ROUND(AVG(rating), 2)
              FROM ratings
              WHERE ratings.store_id = Store.id
            )`),
            'average_rating'
          ]
        ]
      }
    });

    return success(res, stores);
  } catch (err) {
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
    return success(res, ratings);
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
    return success(res, { average: avg ? parseFloat(avg).toFixed(2) : null });
  } catch (err) {
    return error(res, err.message, 500);
  }
};

module.exports = { getMyStores, ratingsForStore, averageForStore };
