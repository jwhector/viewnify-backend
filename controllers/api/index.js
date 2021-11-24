const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users", userRoutes);

// const memeRoutes = require("./memesController");
// router.use("/memes", memeRoutes);

const optionsRoutes = require("./optionsController")
router.use("/options", optionsRoutes)

module.exports = router;