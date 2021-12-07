const express = require('express')
const router = express.Router()
const { Shared } = require('../../models')
const tokenAuth = require("../../middleware/tokenAuth")

//find all created for testing purposes
router.get('/', tokenAuth, (req, res) => {
    Shared.findAll({})
        .then(sharedData => {
            if (sharedData) {
                res.json(sharedData)
            } else {
                res.status(404).json({ err: "Not found." })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get('/:id', tokenAuth, (req, res) => {
    Shared.findOne({
        where: { id: req.params.id }
    }).then(shared => {
        if (shared) {
            res.json(shared)
        }else{
            res.status(404).json({ err: "Not found"})
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/user/:id', tokenAuth, (req,res)=>{
    Shared.findOne({
        where:{
            user_id: req.params.id
        }
    }).then(shared => {
        if (shared) {
            res.json(shared)
        }else{
            res.status(404).json({ err: "Not found"})
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/', tokenAuth, (req,res)=>{
    Shared.create({
        tmdb_id: req.body.tmdb_id,
        watchparty_id: req.body.watchparty_id
    }).then(created => {
        if (created) {
            res.json(created)
        }else{
            res.status(404).json({ err: "Not found"})
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.delete('/:id', tokenAuth, (req,res)=>{
    Shared.destroy({
        where:{
            id: req.params.id
        }
    }).then(deleted => {
        if (deleted) {
            res.status(200).json(deleted)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router