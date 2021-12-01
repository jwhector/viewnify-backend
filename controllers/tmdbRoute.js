const express = require('express')
const router = express.Router()

let genres
let providers

router.get('/tmdbMovies', (req, res) => {
    let apiKey = process.env.API_KEY

    let format = req.body.format

    if (!req.body.genres) {
        genres = ''
    } else {
        genres = `&with_genres=${req.body.genres}`
    }

    if (!req.body.providers) {
        providers = ''
    } else {
        providers = `&with_watch_providers=${req.body.providers}`
    }


    let requstedURL = `https://api.themoviedb.org/3/discover/${format}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1${genres}${providers}&watch_region=us&with_watch_monetization_types=flatrate`

    fetch(requstedURL)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch((err) => res.json(err))
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