const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users", userRoutes);

const likeRoutes = require("./likeController")
router.use("/likes", likeRoutes);

const dislikeRoutes = require('./dislikeController');
router.use('/dislikes', dislikeRoutes);

const watchpartyRoutes = require('./watchpartyController')
router.use('/watchparty', watchpartyRoutes)

const sharedRoutes = require('./sharedContoller')
router.use('/shared', sharedRoutes)

const memberRoutes = require('./memberController')
router.use('/members', memberRoutes)

const watchedRoutes = require('./watchedController')
router.use('/watched', watchedRoutes)

module.exports = router;