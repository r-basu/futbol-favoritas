const router = require("express").Router();
const playerRoutes = require("./playerRoutes");
const clubRoutes = require("./clubRoutes");
const userRoutes = require("./userRoutes");

router.use("/players", playerRoutes);
router.use("/clubs", clubRoutes);
router.use("/users", userRoutes);

module.exports = router;
