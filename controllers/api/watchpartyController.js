const express = require('express')
const router = express.Router()
const { Watchparty } = require('../../models')
const tokenAuth = require("../../middleware/tokenAuth")

router.get('/user/', tokenAuth, (req, res) => {
    Watchparty.findAll(
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
    Watchparty.findOne(
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

//Creates like table
router.post('/', tokenAuth, (req, res) => {
    Watchparty.create({
        limit: req.body.limit,
        user_id: req.user.id,
    })
        .then(memberData => {
            res.json(memberData)
        })
        .catch((err) => res.json(err));
});



//deletes by id
router.delete('/:id', tokenAuth, (req, res) => {
    Watchparty.destroy({
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

module.exports = router
