const express = require('express');
const router = express.Router();
const { auth, permit } = require('../middleware/auth');
const { createUser, createStore, dashboard, listStores, listUsers } = require('../controllers/adminController');
const { createUserValidation, createStoreValidation } = require('../../validations/adminValidation');

router.use(auth, permit('ADMIN'));

router.post('/users', createUserValidation, createUser);

router.post('/stores', createStoreValidation, createStore);

router.get('/dashboard', dashboard);

router.get('/stores', listStores);
router.get('/users', listUsers);

module.exports = router;
