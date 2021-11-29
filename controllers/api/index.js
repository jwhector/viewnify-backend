const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users", userRoutes);



const likeRoutes = require("./likeController")
router.use("/likes", likeRoutes);

const dislikeRoutes = require('./dislikeController');
router.use('/dislikes', dislikeRoutes);

module.exports = router;