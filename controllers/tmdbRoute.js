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
            model: Like, 
            attributes: ['tmdb_id']
        },
        {
            model: Dislike, 
            attributes: ['tmdb_id']
        }, {
            model: Watched,
            // as: 'watches',
            attributes: ['tmdb_id']
        }]
    }).then(async (userData) => {
        const tmdbResponse = await tmdbSearch(format, userData.genres, userData.streaming_service, curPg)
        const tmdbResults = await tmdbResponse.json()

         // Add likes/dislikes/watched to a set for O(1) lookup time
         const haveWatched = new Set(userData.dataValues.watcheds.map((watched) => parseInt(watched.tmdb_id)))

         const likes = new Set(userData.dataValues.likes.map((like) => parseInt(like.tmdb_id)))
         const dislikes = new Set(userData.dataValues.dislikes.map((dislike) => parseInt(dislike.tmdb_id)))

         // Filter out results that have ids in the set
         const tmdbFiltered = [...(tmdbResults.results)].filter((tmdbResult) => !likes.has(tmdbResult.id) && !dislikes.has(tmdbResult.id) && !haveWatched.has(tmdbResult.id) && tmdbResult.poster_path && tmdbResult.backdrop_path)

        res.json(tmdbFiltered)

    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router