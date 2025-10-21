const express = require('express');
const router = express.Router();
const { auth, permit } = require('../middleware/auth');
const { createUser, createStore, dashboard, listStores, listUsers } = require('../controllers/adminController');
const { createUserValidation, createStoreValidation } = require('../validations/adminValidation');

// Protect all admin routes
router.use(auth, permit('ADMIN'));

// Create user (admin)
router.post('/users', createUserValidation, createUser);

// Create store
router.post('/stores', createStoreValidation, createStore);

// Dashboard counts
router.get('/dashboard', dashboard);

// Lists
router.get('/stores', listStores);
router.get('/users', listUsers);

module.exports = router;
