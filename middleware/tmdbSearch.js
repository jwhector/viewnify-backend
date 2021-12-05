const fetch = require('node-fetch')

const tmdbSearch = ((format, genres, streaming_service, curPg) => {
    let searchGenres
    let providers
    const apiKey = process.env.API_KEY

    if (!genres) {
        searchGenres = ''
    } else {
        searchGenres = `&with_genres=${12}`
    }

    if (!streaming_service) {
        providers = ''
    } else {
        providers = `&with_watch_providers=${streaming_service}`
    }

    // DELETED PROVIDERS/REGION IN URL
    let requestedURL = `https://api.themoviedb.org/3/discover/${format}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${curPg.curPage}&with_watch_monetization_types=flatrate`

    console.log(format, genres, streaming_service, curPg)

    return fetch(requestedURL)
})

// Used for Library component.
const tmdbLikes = (ids) => {
    const fetches = [];
    for (id of ids) {
        const requestedURL = `https://api.themoviedb.org/3/movie/${id}?api_key=3516458404b8ed5f73b3b631421314e1&language=en-US`
        fetches.push(fetch(requestedURL))
    }
    return Promise.all(fetches)
}

module.exports = { tmdbSearch, tmdbLikes }