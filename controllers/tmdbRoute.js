const express = require('express')
const router = express.Router()
const { User, Like, Dislike, Watched } = require('../models')
const tokenAuth = require("../middleware/tokenAuth")
const { tmdbSearch } = require('../middleware/tmdbSearch')
const res = require('express/lib/response')

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

         console.log(tmdbFiltered.length)

        res.json(tmdbFiltered)

    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.post('/unauthTmdbSearch', async (req, res) => {
    const format = req.body.format;
    const genres = req.body.genres;
    const streaming_service = req.body.streaming_service;
    const curPg = req.body.curPg;
    const cached_watched = req.body.watched ? req.body.watched : [];
    const cached_likes = req.body.cached_likes;
    const cached_dislikes = req.body.cached_dislikes;

    console.log(format, genres, streaming_service, curPg);
    

    const tmdbResponse = await tmdbSearch(format, genres, streaming_service, curPg);
    const tmdbResults = await tmdbResponse.json();

    const haveWatched = new Set(cached_watched);

    const likes = new Set(cached_likes);
    const dislikes = new Set(cached_dislikes);

    console.log(likes);
    console.log(dislikes);

    // Filter out results that have ids in the set
    const tmdbFiltered = [...(tmdbResults.results)].filter((tmdbResult) => !likes.has(tmdbResult.id) && !dislikes.has(tmdbResult.id) && !haveWatched.has(tmdbResult.id) && tmdbResult.poster_path && tmdbResult.backdrop_path)

    res.json(tmdbFiltered);
});

module.exports = router