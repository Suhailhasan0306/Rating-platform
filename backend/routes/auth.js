const express = require('express');
const router = express.Router();
const { signupValidation, loginValidation, passwordUpdateValidation } = require('../validations/authValidation');
const { signup, login, updatePassword } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Signup - normal users
router.post('/signup', signupValidation, signup);

// Login - all users
router.post('/login', loginValidation, login);

// Update password (authenticated)
router.put('/password', auth, passwordUpdateValidation, updatePassword);

module.exports = router;
