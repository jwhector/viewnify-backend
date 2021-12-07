const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')
const { Watchparty, Shared, Member, User, Like, Watched, With } = require('../../models')
const tokenAuth = require("../../middleware/tokenAuth")
const { tmdbLikes } = require('../../middleware/tmdbSearch');
const { restore } = require('../../models/Like')

// Get all watchparties a user is associated with as well as all of those users emails.
router.get('/party/all', tokenAuth, (req, res) => {
    Member.findAll(
        {
            where: {
                user_id: req.user.id,
            },
        }
    )
        .then(partyIds => {
            const ids = [...partyIds].map(id => id.dataValues.watchparty_id)

            const fetches = [...ids].map(id => {
                return Watchparty.findOne({
                    where: {
                        id: id
                    },
                    include: {
                        model: Member,
                        include: {
                            model: User,
                            attributes: ['email']
                        }
                    }
                })
            })

            Promise.all(fetches).then(fetched => {
                if (fetched.length) {
                    res.status(200).json(fetched)
                } else {
                    res.status(404).json({ err: "No parties found" })
                }
            })
        })
})
router.get('/user', tokenAuth, (req, res) => {
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
                url: req.params.id,
            },
            include: [Shared, Member]
        },
    )
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ err: "No user found" })
            }
        })
})

router.get('/compare/:url', tokenAuth, (req, res) => {
    Watchparty.findOne(
        {
            where: {
                url: req.params.url,
            },
            include: [Member]
        }
    )
        .then(watchparty => {
            console.log(req.params.url);
            const memberIds = watchparty.dataValues.members.map(member => member.dataValues.user_id)
            if (!memberIds.includes(req.user.id)) {
                return res.status(403).send('Unauthorized!')
            }

            const findMemberLikes = memberIds.map(id => {
                return Like.findAll({
                    where: {
                        user_id: id
                    },
                    attributes: ['tmdb_id']
                })
            })

            Promise.all(findMemberLikes).then(memberLikes => {
                let likesSet = new Set(memberLikes.shift().map(like => like.dataValues.tmdb_id))
                memberLikes.forEach(userLikeArr => {
                    const shared = [...userLikeArr].filter(like => likesSet.has(like.dataValues.tmdb_id))
                    likesSet = new Set([...shared].map(like => like.dataValues.tmdb_id))
                })
                tmdbLikes([...likesSet]).then(fetches => {
                    const resolves = []
                    for (db_response of fetches) {
                        resolves.push(db_response.json())
                    }
                    Promise.all(resolves).then(media => {
                        res.status(200).json(media)
                    }).catch(err => {
                        res.status(500).json('Failed to fetch TMDb data.');
                        console.log(err)
                    })
                })
            }).catch(err => {
                res.status(500).json(err)
            })
        })
    })

//Creates like table
router.post('/', tokenAuth, (req, res) => {
    Watchparty.create({
        // limit: req.body.limit,
        name: req.body.name,
        user_id: req.user.id,
    })
        .then(watchpartyData => {
            console.log(watchpartyData)
            Member.create({
                watchparty_id: watchpartyData.id,
                user_id: req.user.id,
            })
                .then(memberData => {
                    Watchparty.findOne({
                        where: {
                            id: watchpartyData.id
                        },
                        include: {
                            model: Member,
                            include: {
                                model: User,
                                attributes: ['email']
                            }
                        }
                    }).then(newWatchparty => {
                        console.log(newWatchparty);
                        if (newWatchparty) {
                            res.status(200).json(newWatchparty.dataValues);
                        } else {
                            res.status(500).json({ err: "Could not construct Watch Party." });
                        }
                    })
                    .catch((err) => res.json(err));

                    // Watched.create({
                    //     tmdb_id: req.body.tmdb_id,
                    //     user_id: req.user.id
                    // }).then(newWatched => {
                    //     res.json(watchpartyData)
                    // })
                    //     .catch((err) => res.json(err))
                })
                .catch((err) => res.json(err));
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

router.get('/join/:id', tokenAuth, (req, res) => {
    Watchparty.findOne(
        {
            where: {
                url: req.params.id,
                [Op.and]: {
                    [Op.not]: { user_id: req.user.id }
                }
            },
            include: [Member]
        }
    )
        .then(({ dataValues }) => {
            if(!dataValues){
                res.json({err: "No watchparty found, or you're attempting to join your own party"})
            }
            if (dataValues.limit > dataValues.members.length) {
                res.json({ isSpace: true })
            }
            else {
                res.json({ isSpace: false })
            }

        })
        .catch(err => res.json(err))
})

router.post('/join/:id', tokenAuth, (req, res) => {
    Watchparty.findAll(
        {
            where: {
                url: req.params.id,
                [Op.and]: {
                    [Op.not]: { user_id: req.user.id }
                }
            },
            include: [Member]
        }
    )
        .then(data => {
            // MAKE SURE OWNER CAN'T JOIN TWICE!
            if (data[0].limit > data[0].members.length && data[0].user_id !== req.user.id) {
                Member.create({
                    watchparty_id: data[0].id,
                    user_id: req.user.id,
                })
                    .then(memberData => {
                        Like.findAll({
                            where: {
                                user_id: req.user.id
                            },
                            // order: [
                            //     ['tmdb_id', 'DESC']
                            // ],
                            attributes: ['tmdb_id']
                        })
                            .then(userLikes => {
                                if (userLikes) {
                                    Like.findAll({
                                        where: {
                                            user_id: data[0].members[0].user_id
                                        },
                                        // order: [
                                        //     ['tmdb_id', 'DESC']
                                        // ],
                                        attributes: ['tmdb_id']
                                    })
                                        .then(friendLikes => {
                                            const likes = new Set([...friendLikes].map(like => like.dataValues.tmdb_id))
                                            const sharedLikes = [...userLikes].filter(like => likes.has(like.dataValues.tmdb_id))

                                            res.json(sharedLikes)
                                        })
                                        .catch(err => res.json(err))
                                }
                            })
                            .catch(err => res.json(err))


                    })
                    .catch((err) => res.json(err));


            }
            else {
                res.json({ err: 'No more space left for this watchparty' })
            }

        })
        .catch(err => res.json(err))
})

module.exports = router
