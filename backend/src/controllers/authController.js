const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { ok, created, badRequest, unauthorized, success, error } = require('../utils/responseHandler');
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success:false, errors: errors.array() });

  const { name, email, password, address, role } = req.body;

  try {
    const exist = await User.findOne({ where: { email }});
    if (exist) return badRequest(res, "Email already registered");

    const hash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hash,
      address,
      role  
    });

    return created(res, { id: user.id, email: user.email, role: user.role });

  } catch (err) {
    return badRequest(res, err.message);
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return badRequest(res, errors.array());

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return unauthorized(res, 'Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return unauthorized(res, 'Invalid credentials');

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return ok(res, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    return badRequest(res, err.message);
  }
};

const updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success:false, errors: errors.array() });
  const { oldPassword, newPassword } = req.body;
  try {
    const user = req.user;
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) return error(res, 'Old password incorrect', 400);
    const hash = await bcrypt.hash(newPassword, saltRounds);
    user.password = hash;
    await user.save();
    return success(res, 'Password updated');
  } catch (err) {
    return error(res, err.message, 500);
  }
};

module.exports = { signup, login, updatePassword };
