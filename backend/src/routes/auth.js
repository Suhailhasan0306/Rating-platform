const express = require('express');
const router = express.Router();
const { signupValidation, loginValidation, passwordUpdateValidation } = require('../../validations/authValidation');
const { signup, login, updatePassword } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

router.post('/signup', signupValidation, signup);

router.post('/login', loginValidation, login);

router.put('/password', auth, passwordUpdateValidation, updatePassword);

module.exports = router;
