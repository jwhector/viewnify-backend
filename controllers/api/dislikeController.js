const express = require('express')
const router = express.Router()
const { Dislike } = require('../../models')
const tokenAuth = require("../../middleware/tokenAuth")

router.get('/user/', tokenAuth, (req, res) => {
    Dislike.findAll(
        {
            where: {
                user_id: req.user.id,
            },
        }
    )
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ err: "No user found" })
            }
        })
})

//find one at its id number
router.get('/:id', tokenAuth, (req, res) => {
    Dislike.findOne(
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ err: "No user found" })
            }
        })
})

//Creates dislike table
router.post('/', tokenAuth, (req, res) => {
    Like.findOne({ 
        where: {
            tmdb_id:req.body.tmdb_id,
            user_id: req.user.id, 
        }
    })
    .then(findLikeData => {
        Dislike.findOne({ 
            where: {
                tmdb_id:req.body.tmdb_id,
                user_id: req.user.id, 
            }
        })
        .then(findDislikeData => {

            if(!findLikeData && !findDislikeData) {
                
                Dislike.create({
                    tmdb_id:req.body.tmdb_id,
                    user_id: req.user.id,
                })
                .then(dislikeData => {
                    res.json(dislikeData)
                })
                .catch((err) => res.json(err))
            }
            else{res.json({err: "Already liked or disliked"})}
        })
    })
    .catch(err=> res.json(err))
});



//deletes by id
router.delete('/:id', tokenAuth, (req, res) => {
    Dislike.destroy({
        where: {
            id: req.params.id,
            user_id: req.user.id,
        },
    })
        .then(deleted => {
            if (deleted) {
                res.status(200).json(deleted)
            }
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router;