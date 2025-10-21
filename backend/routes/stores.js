const express = require('express');
const router = express.Router();
const {
  listStores,
  storeDetailWithUserRating,
  submitOrUpdateRating,
} = require('../controllers/storeController');
const { auth } = require('../middleware/auth');
const { submitRatingValidation } = require('../validations/ratingValidation');

// List stores (Public)
router.get('/', listStores);

// Store details (Protected)
router.get('/:id', auth, storeDetailWithUserRating);

// Submit rating (Protected)
router.post('/:id/rate', auth, submitRatingValidation, submitOrUpdateRating);

module.exports = router;

