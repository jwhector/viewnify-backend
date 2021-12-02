const express = require('express')
const router = express.Router()
const { Dislike } = require('../models')


router.get('/tmdbSearch', async (req, res) => {
    let genres
    let providers
    let apiKey = process.env.API_KEY

    let format = req.body.format

    if (!req.body.genres) {
        genres = ''
    } else {
        genres = `&with_genres=${req.body.genres}`
    }

    if (!req.body.streaming_service) {
        providers = ''
    } else {
        providers = `&with_watch_providers=${req.body.streaming_service}`
    }


    let requstedURL = `https://api.themoviedb.org/3/discover/${format}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1${genres}${providers}&watch_region=us&with_watch_monetization_types=flatrate`

    // fetch(requstedURL)
    //     .then(response => {
    //         console.log(response)
    //         return response.json()
    //     }).then(async (data) => {
    //         console.log(data)
    //         const movieResults = await res.json(data)
    //         console.log(movieResults)
    //     }).catch(err => {
    //         res.json(err)
    //     })
    
    //     const dislikes = await Dislike.findAll({
    //         where:{
    //             user_id: req.user.id
    //         },
    //         attributes: [tmdb_id]            
    //     }).then(dislikeData=>{
    //         console.log(dislikeData)
    //         return dislikes
    //     })
        
    //     for (let i = 0; i < movieResults.length; i++) {
    //         const element = movieResults[i];
            
    //     }


})

// router.get('/tmdbTV', (req, res) => {
//     apiKey = process.env.API_KEY

//     let requstedURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`

//     fetch(requstedURL)
//         .then(response => {
//             return response.json()
//         })
//         .then(data => {
//             console.log(data)
//             res.json(data)
//         })
//         .catch((err) => res.json(err))
// })

// export default function Discover(props) {
//     const apiKey = '3516458404b8ed5f73b3b631421314e1';
//     // const genres = props.genres;
//     // const services = props.services;
//     const [curImg, setCurImg] = useState('');

//     useEffect(async () => {
//         const entries = await getEntries();
//         setCurImg(`https://image.tmdb.org/t/p/w500${entries.results[7].poster_path}`);
//     });

//     const getEntries = async () => {
//         const entries = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
//             .then(data => data.json());
//         console.log(entries);
//         return entries;
//     }

module.exports = router