const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users", userRoutes);

const likeRoutes = require("./likeController")
router.use("/likes", likeRoutes);

const dislikeRoutes = require('./dislikeController');
router.use('/dislikes', dislikeRoutes);

const friendRoutes = require('./friendController')
router.use('/friends', friendRoutes)

const watchpartyRoutes = require('./watchpartyController')
router.use('/watchpartys', watchpartyRoutes)

const sharedRoutes = require('./sharedContoller')
router.use('/shared', sharedRoutes)

const memberRoutes = require('./memberController')
router.use('/members', memberRoutes)

module.exports = router;