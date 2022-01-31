const fetch = require('node-fetch')

const tmdbSearch = ((format, genres, streaming_service, curPg) => {
    let searchGenres
    let providers
    const apiKey = process.env.API_KEY

    if (!genres) {
        searchGenres = ''
    } else {
        searchGenres = `&with_genres=${genres.replace(',', '|')}`
    }

    // searchGenres = ''

    if (!streaming_service) {
        providers = ''
    } else {
        providers = `&with_watch_providers=${streaming_service.replace(',', '|')}`
    }

    // DELETED PROVIDERS/REGION IN URL
    let requestedURL = `https://api.themoviedb.org/3/discover/${format}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${curPg.curPage}${searchGenres}${providers}&watch_region=US&with_watch_monetization_types=flatrate`


    console.log('Requested URL: ' + requestedURL);

    return fetch(requestedURL)
})

// Used for Library component.
const tmdbLikes = (ids) => {
    const fetches = [];
    const apiKey = process.env.API_KEY;
    for (id of ids) {
        const requestedURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        
        fetches.push(fetch(requestedURL))
    }
    return Promise.all(fetches)
}

module.exports = { tmdbSearch, tmdbLikes }