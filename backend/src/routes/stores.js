const express = require('express');
const router = express.Router();
const {
  listStores,
  storeDetailWithUserRating,
  submitOrUpdateRating,
} = require('../controllers/storeController');
const { auth } = require('../middleware/auth');
const { submitRatingValidation } = require('../../validations/ratingValidation');

router.get('/', listStores);

router.get('/:id', auth, storeDetailWithUserRating);

router.post('/:id/rate', auth, submitRatingValidation, submitOrUpdateRating);

module.exports = router;

