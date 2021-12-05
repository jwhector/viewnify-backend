const express = require('express')
const router = express.Router()
const { User, Like, Dislike, Watched } = require('../models')
const tokenAuth = require("../middleware/tokenAuth")
const tmdbSearch = require('../middleware/tmdbSearch')

router.get('/tmdbSearch', tokenAuth, (req, res) => {
    const format = req.body.format
    const curPg = req.body.curPg
    User.findOne({
        where: {
            id: req.user.id
        },
        attributes: ['genres', 'streaming_service'],
        include: [{
            model: Dislike,
            include: ['tmdb_id'],
            order: [
                ['tmdb_id', 'DESC']
            ],
        }, {
            model: Watched,
            include: ['tmdb_id'],
            order: [
                ['tmdb_id', 'DESC']
            ],
        }]
    }).then(async (userData) => {
        const tmdbResults = await tmdbSearch(format, userData.genres, userData.streaming_service, curPg)

        //CREATE FILTERING FUNCTION TO NOT SHOW RESULTS IN DISLIKE OR WATCHED TABLES FROM TMDBRESULTS AND ONLY SEND NEW INFO

        let i = 0
        let j = 0

        for (let i = 0; i < userData.length; i++) {
            for (let j = 0; j < tmdbResults.length; j++) {
                if (userData[i] === tmdbResults[j].tmdb_id){

                }
                
            }
            const element = array[i];
            
        }
        while (i < userData.length || j < tmdbResults.length) {
            if (userData[i].tmdb_id === tmdbResults[j].tmdb_id) {
                Shared.create({
                    tmdb_id: userData[i].tmdb_id,
                    watchparty_id: req.params.id
                })
                i++;
                j++;
            }
            else if (userData[i].tmdb_id.localeCompare(tmdbResults[j].tmdb_id) == -1) {
                j++
            }
            else {
                i++
            }

        }
        res.json(memberData)

        res.json(tmdbResults)

    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router