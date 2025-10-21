const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { User, Store, Rating } = require('../models');
const { Op } = require('sequelize');
const { success, error } = require('../utils/responseHandler');

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success:false, errors: errors.array() });
  const { name, email, password, role, address } = req.body;
  try {
    const exist = await User.findOne({ where: { email }});
    if (exist) return error(res, 'Email exists', 400);
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ name, email, password: hash, role, address });
    return success(res, { id: user.id, email: user.email, role: user.role }, 201);
  } catch (err) {
    return error(res, err.message, 500);
  }
};

const createStore = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success:false, errors: errors.array() });

  const { name, address, ownerEmail } = req.body;

  try {
    // Owner email से user find करें
    const owner = await User.findOne({ where: { email: ownerEmail } });

    if (!owner) {
      return error(res, 'Owner with this email not found', 404);
    }

    if (owner.role !== 'STORE_OWNER') {
      return error(res, 'User is not a Store Owner', 400);
    }

    // Store create + owner assign
    const store = await Store.create({
      name,
      address,
      email: ownerEmail,
      owner_id: owner.id
    });

    return success(res, store, 201);
  } catch (err) {
    return error(res, err.message, 500);
  }
};




const dashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    return success(res, { totalUsers, totalStores, totalRatings });
  } catch (err) {
    return error(res, err.message, 500);
  }
};

const listStores = async (req, res) => {
  try {
    const { name, email, address, sortBy='name', sortOrder='ASC', limit=50, offset=0 } = req.query;
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    const stores = await Store.findAll({ where, limit: parseInt(limit), offset: parseInt(offset), order: [[sortBy, sortOrder]] });
    const results = await Promise.all(stores.map(async s => {
      const avg = await Rating.avg('rating', { where: { store_id: s.id } });
      return { ...s.toJSON(), average_rating: avg ? parseFloat(avg).toFixed(2) : null };
    }));
    return success(res, results);
  } catch (err) {
    return error(res, err.message, 500);
  }
};

const listUsers = async (req, res) => {
  try {
    const { name, email, address, role, sortBy='name', sortOrder='ASC', limit=50, offset=0 } = req.query;
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    if (role) where.role = role;
    const users = await User.findAll({ where, limit: parseInt(limit), offset: parseInt(offset), order: [[sortBy, sortOrder]] });
    return success(res, users);
  } catch (err) {
    return error(res, err.message, 500);
  }
};

module.exports = { createUser, createStore, dashboard, listStores, listUsers };
