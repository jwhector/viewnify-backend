const express = require('express')
const router = express.Router()
const {Watchparty, Shared, Member, User,Like} = require('../../models')
const tokenAuth = require("../../middleware/tokenAuth")

router.get('/user/',tokenAuth,(req,res)=> {
    Watchparty.findAll(
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

//find one at its id number
router.get('/:id',tokenAuth, (req,res)=> {
    Watchparty.findOne(
        {
            where: {
                id:req.params.id,
            },
            include: [Shared, Member]
        },
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
    Watchparty.create({
        limit:req.body.limit,
        user_id: req.user.id,
    })
    .then(watchpartyData => {
            Member.create({
                watchparty_id:watchpartyData.id,
                user_id: req.user.id,
            })
            .then(memberData => {
                res.json(memberData)
            })
            .catch((err) => res.json(err));  
    })
    .catch((err) => res.json(err));
});



//deletes by id
router.delete('/:id', tokenAuth, (req,res)=> {
    Watchparty.destroy({
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

router.get('/join/:id',tokenAuth,(req,res)=> {
    Watchparty.findAll(
        {
            where: {
                id:req.user.id,
            },
            include: [Member]   
        }
    )
    .then(data => {
            if(data.limit> data.member.length) {
                res.json({isSpace: true})
            }
            else {
                res.json({isSpace: false})
            }
        
    })
    .catch(err=> res.json(err))
})

router.post('/join/:id',tokenAuth,(req,res)=> {
    Watchparty.findAll(
        {
            where: {
                id:req.params.id,
            },
            include: [Member]   
        }
    )
    .then(data => {
            if(data[0].limit> data[0].members.length) {
                Member.create({
                    watchparty_id:req.params.id,
                    user_id: req.user.id,
                })
                .then(memberData => {
                    Like.findAll({
                        where: {
                            user_id: req.user.id
                        },
                        order: [
                            ['tmdb_id', 'DESC']
                        ],
                        attributes: ['tmdb_id']
                    })
                    .then(userData => {
                        if(userData){Like.findAll({
                            where: {
                                user_id: data[0].members[0].user_id
                            },
                            order: [
                                ['tmdb_id', 'DESC']
                            ],
                            attributes: ['tmdb_id']
                        })
                        .then(friendData => {
                            if(friendData) {
                                let j = 0
                                let i = 0
                                while(i < userData.length || j < friendData.length) {
                                    if(userData[i].tmdb_id === friendData[j].tmdb_id) {
                                        Shared.create({
                                            tmdb_id: userData[i].tmdb_id,
                                            watchparty_id: req.params.id
                                        })
                                        i++;
                                        j++;
                                    }
                                    else if(userData[i].tmdb_id.localeCompare(friendData[j].tmdb_id) == -1) {
                                        j++
                                    }
                                    else {
                                        i++
                                    }
                                    
                                }
                                res.json(memberData)
                            }
                        })
                        .catch(err => res.json(err))}
                    })
                    .catch(err => res.json(err))


                })
                .catch((err) => res.json(err));  


            }
            else {
                res.json({err: 'No more space left for this watchparty'})
            }
        
    })
    .catch(err=> res.json(err))
})

module.exports = router
