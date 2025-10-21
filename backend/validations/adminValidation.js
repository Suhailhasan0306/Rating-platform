const { body } = require('express-validator');

const createUserValidation = [
  body('name').isLength({ min: 20, max: 60 }).withMessage('Name must be 20-60 chars'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password')
    .isLength({ min: 8, max: 16 }).withMessage('Password must be 8-16 chars')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character'),
  body('role').isIn(['ADMIN', 'USER', 'STORE_OWNER']).withMessage('Invalid role'),
  body('address').optional().isLength({ max: 400 })
];

const createStoreValidation = [
  body('name').notEmpty().withMessage('Store name required'),
  body('email').optional().isEmail(),
  body('address').optional().isLength({ max: 400 }),
  body('owner_id').optional().isInt().withMessage('owner_id must be an integer')
];

module.exports = { createUserValidation, createStoreValidation };
