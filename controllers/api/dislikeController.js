const express = require('express')
const router = express.Router()
const { Dislike } = require('../../models')
const tokenAuth = require("../../middleware/tokenAuth")

router.get('/:user_id', tokenAuth, (req, res) => {
    Dislike.findAll(
        {
            where: {
                user_id: req.params.user_id,
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
router.get('/:id', (req, res) => {
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
    Dislike.create({
        tmdb_id: req.body.tmdb_id,
        user_id: req.body.user_id,
    })
        .then(likeData => {
            res.json(likeData)
        })
        .catch((err) => res.json(err));
});



//deletes by id
router.delete('/:id', tokenAuth, (req, res) => {
    Dislike.destroy({
        where: {
            id: req.params.id,
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