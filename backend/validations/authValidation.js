const { body } = require('express-validator');

const signupValidation = [
  body('name').isLength({ min: 20, max: 60 }).withMessage('Name must be 20-60 characters'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password')
    .isLength({ min: 8, max: 16 }).withMessage('Password must be 8-16 chars')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character'),
  body('address').optional().isLength({ max: 400 }).withMessage('Address max 400 chars')
];

const loginValidation = [
  body('email').isEmail(),
  body('password').exists()
];

const passwordUpdateValidation = [
  body('oldPassword').exists(),
  body('newPassword')
    .isLength({ min: 8, max: 16 })
    .matches(/[A-Z]/).withMessage('Must contain uppercase')
    .matches(/[^A-Za-z0-9]/).withMessage('Must contain special char')
];

module.exports = { signupValidation, loginValidation, passwordUpdateValidation };
