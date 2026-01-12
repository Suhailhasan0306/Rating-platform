const express = require('express');
const router = express.Router();
const { auth, permit } = require('../middleware/auth');
const { getMyStores, ratingsForStore, averageForStore } = require('../controllers/ownerController');

router.use(auth, permit('STORE_OWNER'));

router.get('/dashboard', getMyStores); 
router.get('/stores', getMyStores);

router.get('/stores/:id/ratings', ratingsForStore);
router.get('/stores/:id/average', averageForStore);

module.exports = router;

