//Grabbing local storage using parse into an arrays
let watchlistJSON = localStorage.getItem('watchlist')
let watchlist = JSON.parse(watchlistJSON)
//---



document.addEventListener('DOMContentLoaded', function () {

    const $container = $('#container-movie')

    console.log(watchlist)
    if (!watchlist) {
        watchlist = []
        console.error('WATCHLIST should not be null')
        return
    }
    $container.html(renderMovie(watchlist))


})



function renderMovie(movieArray) {
    let movieHTML = movieArray.map(currentMovie)
    return movieHTML.join(' ')

}

function removeToWatchlist(imbdID) {
    let id = imbdID
    let movie = movieData.find(function (thisMovie) {
        return thisMovie.imdbID === id
    })
    console.log('Will remove this', id)
    localStorage.removeItem(movie)
    watchlistJSON = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', watchlistJSON)

}

function currentMovie(array) {
    console.log(array)
    // console.info(`Creating movie poster of ${array.Title}`)
    let movie = `
        <div class="card" id="${array.imdbID}" type="${array.Type}">
            <img class="card-img-top" src="${array.Poster}">
            <div>
            <div class="card-body movies">
                <p class="card-title">${array.Title}</p>
                <h6 class="card-text">${array.Year}</h6>
            </div> 
                <a href="#" class="btn btn-primary" onclick="removeToWatchlist('${array.imdbID}')">Remove</a>
            </div>
        </div>
    `
    return movie
}