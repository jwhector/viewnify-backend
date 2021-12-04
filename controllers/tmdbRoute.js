const express = require('express')
const router = express.Router()
const { User, Dislike } = require('../models')
const tokenAuth = require("../middleware/tokenAuth")
const tmdbSearch = require('../middleware/tmdbSearch')

router.get('/tmdbSearch', (req, res) => {
    const format = req.body.format
    if (tokenAuth) {
        User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ['genres', 'streaming_service']
        }).then(async (userData) => {
            const tmdbResults = await tmdbSearch(format, userData.genres, userData.streaming_service)
            res.json(tmdbResults)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    } else {
        User.findOne({
            where: {
                id: 1
            },
            attributes: ['genres', 'streaming_service']
        }).then(async (userData) => {
            if (userData) {
                const tmdbResults = await tmdbSearch(format)
                res.json(tmdbResults)
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
})

module.exports = router