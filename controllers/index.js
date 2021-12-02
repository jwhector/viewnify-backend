const express = require('express')
const router = express.Router()

const apiRoutes = require("./api")
router.use('/api',apiRoutes)

const tmdbFetch = require("./tmdbRoute.js")
router.use(tmdbFetch)


module.exports = router;