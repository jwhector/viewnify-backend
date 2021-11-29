const express = require('express')
const router = express.Router()
const { Friend, User } = require('../../models')

router.get('/', (req, res) => {
    Friend.findAll(
        {}
    )
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ err: "No user found" })
            }
        })
})

router.get('/:user_id', (req, res) => {
    Friend.findAll(
        {
            where: {
                $or: [
                    {
                        user_id1: 
                        {
                            $eq: req.params.user_id
                        }
                    }, 
                    {
                        user_id2: 
                        {
                            $eq: req.params.user_id
                        }
                    }, 
                ]
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
    Friend.findOne(
        {
            where: {
                $or: [
                    {
                        user_id1: 
                        {
                            $eq: req.params.user_id
                        }
                    }, 
                    {
                        user_id2: 
                        {
                            $eq: req.params.user_id
                        }
                    },  
                ]
        }
        })
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ err: "No user found" })
            }
        })
})

//Creates dislike table
router.post('/', (req, res) => {
    Friend.create({
        user_id1: req.body.user_id,
        user_id2: req.body.user_id2,
    })
        .then(friendData => {
            res.json(friendData)
        })
        .catch((err) => res.json(err));
});



// //deletes by id
// router.delete('/:id', (req, res) => {
//     Friend.destroy({
//         where: {
//             id: req.params.id,
//         },
//     })
//         .then(deleted => {
//             if (deleted) {
//                 res.status(200).json(deleted)
//             }
//         })
//         .catch(err => res.status(500).json(err))
// })

module.exports = router;