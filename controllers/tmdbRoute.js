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

        //CREATE FILTERING FUNCTION TO NOT SHOW RESULTS IN DISLIKE OR WATCHED TABLES FROM TMDBRESULTS AND ONLY SEND NEW INFO

        // Add dislikes to a set for O(1) lookup time
        const dislikes = new Set(userData.dataValues.dislikes.map((dislike) => parseInt(dislike.tmdb_id)))
        // Filter out results that have ids in the set
        const tmdbFiltered = [...(tmdbResults.results)].filter((tmdbResult) => !dislikes.has(tmdbResult.id))
        
        
        // I commented out what you had below in case you need it. 
        // It looks like the sorting part of the first section is taken care of.
        // Didn't look to see what you had planned for the Shared/Watched tables.
        // Be careful about the indexing of tmdbResults[j] because it is NOT guaranteed that the tmdb_ids come back in order.
        // That's why I implemented sorting with array methods above, they don't care about order. <3
        
        
        
        // let i = 0
        // let j = 0

        // for (let i = 0; i < userData.length; i++) {
        //     for (let j = 0; j < tmdbResults.length; j++) {
        //         if (userData[i] === tmdbResults[j].tmdb_id){

        //         }
                
        //     }
        //     const element = array[i];
            
        // }
        // while (i < userData.length || j < tmdbResults.length) {
        //     if (userData[i].tmdb_id === tmdbResults[j].tmdb_id) {
        //         Shared.create({
        //             tmdb_id: userData[i].tmdb_id,
        //             watchparty_id: req.params.id
        //         })
        //         i++;
        //         j++;
        //     }
        //     else if (userData[i].tmdb_id.localeCompare(tmdbResults[j].tmdb_id) == -1) {
        //         j++
        //     }
        //     else {
        //         i++
        //     }

        // }
        // res.json(memberData)

        res.status(200).json(tmdbFiltered)

    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router