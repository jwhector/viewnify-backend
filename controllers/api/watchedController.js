const express = require('express')
const router = express.Router()
const { Watched, Watchparty, Shared, Member, User, Like } = require('../../models')
const tokenAuth = require("../../middleware/tokenAuth")

router.get('/', tokenAuth, (req, res) => {
    Watched.findAll({})
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
        }
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

router.post('/', tokenAuth,(req,res)=>{
    Watched.create({
        tmdb_id: req.body.tmdb_id,
        user_id: req.user.id
    }).then(newWatched =>{
        res.json(newWatched)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})



//TO BE MOVED TO WATCHPARTY OR CHILD OF CONTROLLER TO CREATE NEW WATCHED TABLE
router.post('/', tokenAuth, (req, res) => {
    Watched.findAll({
        where: {
            tmdb_id: req.body.tmdb_id,
            watched_with: req.body.watched_with,
            user_id: req.user.id
        }
    }).then(foundWatchedData => {
        if (foundWatchedData) {
            return
        } else {
            Watched.create({
                tmdb_id: req.body.tmdb_id,
                watched_with: req.body.watched_with,
                user_id: req.user.id
            }).then(createdWatched=>{
                res.json(createdWatched)
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router