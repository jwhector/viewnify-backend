const express = require('express')
const router = express.Router()
const { Watched, With, Watchparty, Shared, Member, User, Like } = require('../../models')
const tokenAuth = require("../../middleware/tokenAuth")

router.get('/', tokenAuth, (req, res) => {
    Watched.findAll({
        include: [{
            model: With,
            attributes: ['user_id']
        }
        ]
    })
        .then(data => {
            res.json(data)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get('/:id', tokenAuth, (req, res) => {
    Watched.findAll({
        where: {
            user_id: req.user.id,
        },
        include: [{
            model: With,
            attributes: ['user_id']
        }
        ]
    }).then(data => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ err: "No watched movies found." })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/', tokenAuth, (req, res) => {
    Watched.create({
        tmdb_id: req.body.tmdb_id,
        user_id: req.user.id
    }).then(newWatched => {
        res.json(newWatched)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.put('./update/:tmdb_id', tokenAuth, (req, res) => {
    Watched.findOne({
        where: {
            user_id: req.user.id,
            tmdb_id: req.params.tmdb_id
        }
    }).then(watchedData => {
        if (watchedData) {
            watchedData.set({
                watched_with: req.body.watched_with
            })
            watchedData.save()
            res.json(watchedData)
        }
    })
})



//TO BE MOVED TO WATCHPARTY OR CHILD OF CONTROLLER TO CREATE NEW WATCHED TABLE
router.post('/', tokenAuth, (req, res) => {
    Watched.findAll({
        where: {
            tmdb_id: req.body.tmdb_id,
            user_id: req.user.id
        }
    }).then(foundWatchedData => {
        if (foundWatchedData) {
            res.status(409).json({ err: "Movie already watched" })
        } else {
            Watched.create({
                tmdb_id: req.body.tmdb_id,
                user_id: req.user.id
            }).then(createdWatched => {
                res.json(createdWatched)
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router