const express = require('express')
const router = express.Router()
const {Like, Dislike} = require('../../models')
const tokenAuth = require("../../middleware/tokenAuth")
const { tmdbLikes } = require('../../middleware/tmdbSearch')

router.get('/user/tmdb',tokenAuth,(req,res)=> {
    Like.findAll(
        {
            where: {
                user_id:req.user.id,
            },
            order: [['updatedAt', 'DESC']]
        }
    )
    .then(data => {
        if(data) {
            // console.log(data);
            const ids = data.map(entry => entry.tmdb_id)
            console.log(ids.length)
            tmdbLikes(ids).then(fetches => {
                const resolves = []
                for (db_response of fetches) {
                    resolves.push(db_response.json())
                }
                Promise.all(resolves).then(media => {
                    // console.log(media);
                    res.status(200).json(media)
                }).catch(err => {
                    res.status(500).json('Failed to fetch TMDb data.');
                    console.log(err)
                })
            })
        } else {
            res.status(404).json({err: "No user found"})
        }
    })
})

router.get('/user/',tokenAuth,(req,res)=> {
    Like.findAll(
        {
            where: {
                user_id:req.user.id,
            },   
        }
    )
    .then(data => {
        if(data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({err: "No user found"})
        }
    })
})

router.get('/compare/:id', tokenAuth, (req,res) => {
    Like.findAll({
        where: {
            user_id: req.user.id
        },
        order: [
            ['tmdb_id', 'DESC']
        ],
        attributes: ['tmdb_id']
    })
    .then(userLikes => {
        // console.log(userLikes)
        Like.findAll({
        where: {
            user_id: req.params.id
        },
        order: [
            ['tmdb_id', 'DESC']
        ],
        attributes: ['tmdb_id']
        })
        .then(friendLikes => {
            // console.log(friendLikes)
            const likes = new Set([...friendLikes].map(like => like.dataValues.tmdb_id))
            // console.log(likes)
            const sharedLikes = [...userLikes].filter(like => likes.has(like.dataValues.tmdb_id))
            // if(friendData) {
            //     let j = 0
            //     let i = 0
            //     let sameLikes = []
            //     while(i < userData.length || j < friendData.length) {
            //         if(userData[i].tmdb_id === friendData[j].tmdb_id) {
            //             sameLikes.push(userData[i].tmdb_id);
            //             i++;
            //             j++;
            //         }
            //         else if(userData[i].tmdb_id.localeCompare(friendData[j].tmdb_id) == -1) {
            //             i++
            //         }
            //         else {
            //             j++
            //         }
            //     }
            //     res.json({tmdb_id: sameLikes})
            // }
            console.log(sharedLikes)
            res.json(sharedLikes)
        })
        .catch(err => res.json(err))}
    )
    .catch(err => res.json(err))
})

//find one at its id number
router.get('/:id',tokenAuth, (req,res)=> {
    Like.findOne(
        {
            where: {
                id:req.params.id,
            },
        }
    )
    .then(data => {
        if(data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({err: "No user found"})
        }
    })
})

//Creates like table
router.post('/',tokenAuth, (req,res)=> {
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
                
                Like.create({
                    tmdb_id:req.body.tmdb_id,
                    user_id: req.user.id,
                })
                .then(likeData => {
                    res.json(likeData)
                })
                .catch((err) => res.json(err))
            }
            else{res.json({err: "Already liked or disliked"})}
        })
    })
    .catch(err=> res.json(err))
});



//deletes by id
router.delete('/:id', tokenAuth, (req,res)=> {
    Like.destroy({
        where: {
            id:req.params.id,
            user_id:req.user.id,
        },
    })
    .then(deleted => {
        if(deleted) {
            res.status(200).json(deleted)
        }
    })
    .catch(err=>res.status(500).json(err))
})




module.exports = router;