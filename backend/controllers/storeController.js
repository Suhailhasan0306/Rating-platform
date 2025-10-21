const { Store, Rating, sequelize } = require('../models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { success, error } = require('../utils/responseHandler');

const listStores = async (req, res) => {
  try {
    const stores = await Store.findAll();

    const results = await Promise.all(
      stores.map(async (store) => {
        const ratingData = await Rating.findOne({
          attributes: [
            [sequelize.fn('AVG', sequelize.col('rating')), 'avg']
          ],
          where: { store_id: store.id },
          raw: true,
        });

        const avgRating = ratingData && ratingData.avg
          ? parseFloat(ratingData.avg).toFixed(2)
          : null;

        return {
          ...store.toJSON(),
          average_rating: avgRating,
        };
      })
    );

    return success(res, results);
  } catch (err) {
    console.error(err);
    return error(res, 'Failed to fetch stores', 500);
  }
};

const storeDetailWithUserRating = async (req, res) => {
  res.send('Store detail logic here');
};

const submitOrUpdateRating = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, errors.array(), 400);

  try {
    const userId = req.user.id || req.user.user_id;
    const storeId = req.params.id;
    const { rating } = req.body;

    if (!userId) return error(res, 'User ID missing from token', 401);

    // Check if store exists
    const store = await Store.findByPk(storeId);
    if (!store) return error(res, 'Store not found', 404);

    // Check if user already rated this store
    const existing = await Rating.findOne({ where: { user_id: userId, store_id: storeId } });

    if (existing) {
      existing.rating = rating;
      await existing.save();
    } else {
      await Rating.create({ user_id: userId, store_id: storeId, rating });
    }

    // ✅ Recalculate average rating and update store table
    const avg = await Rating.findOne({
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avg']],
      where: { store_id: storeId },
      raw: true,
    });
    const avgRating = parseFloat(avg.avg).toFixed(2);
    // store.average_rating = avgRating;
    // await store.save();
    return success(res, { message: 'Rating updated', average_rating: avgRating });

  } catch (err) {
    console.error(err);
    return error(res, err.message, 500);
  }
};



module.exports = {
  listStores,
  storeDetailWithUserRating,
  submitOrUpdateRating,
};






