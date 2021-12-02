const { Dislike } = require('../models');
const sequelize = require('sequelize');
const sequelize = require('../config/sequelize');



async function searchAndFilter(user_id){

    const dislikes = await Dislike.findByPk(user_id)

    const searchResult = await 
fetch('/tmdbSearch', {
    method: 'GET',
    credentials: 'same-origin',
    headers:{
        'Content-Type':'application/json'
    }
}).then(async (res) =>{
    const response = await res.json()
})






}

module.exports = searchAndFilter