const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const storeRoutes = require("./stores");
const adminRoutes = require("./admin");
const ownerRoutes = require("./owner");

router.use("/auth", authRoutes);
router.use("/stores", storeRoutes);
router.use("/admin", adminRoutes);
router.use("/owner", ownerRoutes);

module.exports = router;

