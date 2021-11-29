const express = require('express')
const router = express.Router()
const { User } = require('../../models')
const bcrypt = require('bcrypt')
router.get('/:id', (req, res) => {
    User.findOne(
        {
            where: {
                id: req.params.id,
            },
            include: [Like, Dislike, Friend]
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
router.get('/', (req, res) => {
    User.findAll()
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ err: "No user found" })
            }
        })
})
router.post('/', (req, res) => {
    User.create({
        first_name: req.body.first_name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        genres: req.body.genres,
        streaming_service: req.body.streaming_service,
    })
        .then(userData => {
            res.json(userData)
        })
        .catch((err) => res.json(err));
});
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
        .then(userData => {
            if (!userData) {
                return res.status(401).json({ err: "Invalid email or password" })
            }
            if (!req.body.password) {
                return res.status(401).json({ err: "Invalid email or password" })
            }
            if (bcrypt.compareSync(req.body.password, userData.password)) {
                // Need to know what front end needs
                return res.json(userData)
            } else {
                return res.status(401).json({ err: "Invalid email or password" })
            }
        })
})
router.put('/:id', (req, res) => {
    User.update({
        genres: req.body.genres,
        streaming_service: req.body.streaming_service
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(updatedData => {
            res.json(updatedData)
        })
        .catch(err => res.json(err))
})
router.delete('/:id', (req, res) => {
    User.destroy({
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