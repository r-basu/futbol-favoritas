const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/api/users", userRoutes);

const clubRoutes = require("./clubRoutes");
router.use("/api/clubs", clubRoutes);

module.exports = router;
