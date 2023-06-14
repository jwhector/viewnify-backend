const express = require('express')
const router = express.Router()
const { User, Like, Dislike } = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const tokenAuth = require("../../middleware/tokenAuth")
// require('dotenv').config();


router.get('/verify', tokenAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.user.id
        },
    })
        .then(data => {
            // console.log('VERIFICATION DATA');
            // console.log(data);
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ err: "No user found" })
            }
        });
});

router.get('/:id', tokenAuth, (req, res) => {
    User.findOne(
        {
            where: {
                id: req.params.id,
            },
            include: [Like, Dislike]
        }
    )
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ err: "No user found" })
            }
        })
});



router.get('/', tokenAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.user.id
        },
        include: [Like, Dislike]
    })
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ err: "No user found" })
            }
        });
});

router.post('/', (req, res) => {
    User.create({
        // username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        genres: req.body.genres,
        streaming_service: req.body.streaming_service
    })
        .then(userData => {
            // console.log(process.env.JWT_SECRET);
            const token = jwt.sign({
                email: userData.email,
                id: userData.id,
            },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            req.body.cached_likes.forEach(cached_like => {
                Like.create({
                    tmdb_id: cached_like.tmdb_id,
                    user_id: userData.id
                }).catch(err => console.error(err));
            });

            req.body.cached_dislikes.forEach(cached_dislike => {
                Dislike.create({
                    tmdb_id: cached_dislike.tmdb_id,
                    user_id: userData.id
                }).catch(err => console.error(err));
            });

            // res.status(200).json({
            //     // token: token,
            //     user: userData
            // });
            res.status(200).json(userData);
        })
        .catch(err => {
            console.log(err);
            if (err.errors[0].message === "Validation isEmail on email failed") {
                res.statusMessage = "Invalid email"
            }
            res.status(500).send();
        })
})
router.post('/login', (req, res) => {
    console.log(req);
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
        .then(userData => {
            if (!userData) {
                return res.status(401).json({ error: "Invalid email or password" })
            }
            if (!req.body.password) {
                return res.status(401).json({ error: "Invalid email or password" })
            }
            else if (bcrypt.compareSync(req.body.password, userData.password)) {
                console.log('MADE IT TO BCRYPT');
                const token = jwt.sign({
                    email: userData.email,
                    id: userData.id
                },
                    process.env.JWT_SECRET
                    , {
                        expiresIn: "12h"
                    })
                res.json(userData)
            } else {
                return res.status(401).json({ error: "Invalid email or password" })
            }
        })
        .catch(err => res.json(err))
})
router.put('/', tokenAuth, (req, res) => {
    User.findOne({where: {id: req.user.id}})
    .then(userData => {
        if(userData) {
            userData.set({
                genres: req.body.genres,
                streaming_service: req.body.streaming_service
            })
            userData.save();
            res.json(userData);

        }
    })
    .catch(err => res.json(err))
})
router.delete('/', tokenAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.user.id,
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