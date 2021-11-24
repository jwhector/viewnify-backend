const express = require('express')
const router = express.Router()

const apiRoutes = ("./api")
router.use("/api", apiRoutes)

const sessionRoutes = require("./sessionsRoutes")
router.use("/sessions", sessionRoutes)

const frontEndRoutes = require("./frontEndRoutes.js")
router.use(frontEndRoutes)

module.exports = router