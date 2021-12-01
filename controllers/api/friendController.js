const express = require('express')
const router = express.Router()
const { Friend } = require('../../models')

// FOLLOWING WAS CREATED TO TEST MANY-TO-MANY CREATION POSSIBILITIES, DOES NOT HAVE TO KEPT
// router.get('/', (req, res) => {
//     Friend.findAll(
//         {}
//     )
//         .then(data => {
//             if (data) {
//                 res.status(200).json(data)
//             } else {
//                 res.status(404).json({ err: "No user found" })
//             }
//         })
// })

router.get('/:user_id', (req, res) => {
    Friend.findAll({
        where: { user_id: req.params.user_id },
        include: [Like, Dislike, Friend]
    })
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ err: "No user found" })
            }
        })
})

//find one at based on friend's id
router.get('/:friends_id', (req, res) => {
    Friend.findOne(
        {
            where: { friends_id: req.params.friends_id },
            include: [Like, Dislike, Friend]

        })
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ err: "No user found" })
            }
        })
})

//Creates friend table
router.post('/', (req, res) => {
    Friend.create({
        user_id: req.body.id,
        friends_id: req.body.friend_id
    })
        .then(friendData => {
            res.json(friendData)
        })
        .catch((err) => res.json(err));
});

//deletes by id
router.delete('/:id', (req, res) => {
    Friend.destroy({
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