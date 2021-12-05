const express = require('express')
const router = express.Router()
const { User, Like, Dislike, Watched } = require('../models')
const tokenAuth = require("../middleware/tokenAuth")
const { tmdbSearch } = require('../middleware/tmdbSearch')

router.post('/tmdbSearch', tokenAuth, (req, res) => {
    const format = req.body.format
    const curPg = req.body.curPg
    User.findOne({
        where: {
            id: req.user.id
        },
        attributes: ['genres', 'streaming_service'],
        include: [{
            model: Dislike, // <-------------------- It was getting mad at me for the includes, it's working fine without them though.
            // include: ['tmdb_id'],
            // order: [
            //     ['tmdb_id', 'DESC']
            // ],
        }, {
            model: Watched,
            // include: ['tmdb_id'],
            // order: [
            //     ['tmdb_id', 'DESC']
            // ],
        }]
    }).then(async (userData) => {
        const tmdbResponse = await tmdbSearch(format, userData.genres, userData.streaming_service, curPg)
        const tmdbResults = await tmdbResponse.json()

        for (let j = tmdbResults[0].results.length - 1; j >= 0; j--) {
            for (let i = 0; i < userData.length; i++) {
                if (userData[i].tmdb_id == tmdbResults[0].results[j].id) {
                    tmdbResults[0].results.splice(j, 1)
                }
            }
        }
        res.json(tmdbResults)


    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router