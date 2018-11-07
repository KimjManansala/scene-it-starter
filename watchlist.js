document.addEventListener('DOMContentLoaded', function(){

    const $container = $('#container-movie')
    let watchlistJSON = localStorage.getItem('watchlist')
    let watchlist = JSON.parse(watchlistJSON)
    if(watchlist === null){
        let watchlist = []
        console.error('WATCHLIST should not be null')
        return
    }
    console.info()
    $container.html(renderMovie(watchlist))


})


function renderMovie(movieArray) {
    let movieHTML = movieArray.map(currentMovie)
    return movieHTML.join(' ')

}

function currentMovie(array) {
    // console.info(`Creating movie poster of ${array.Title}`)
    let movie = `
        <div class="card" id="${array.imdbID}" type="${array.Type}">
            <img class="card-img-top" src="${array.Poster}">
            <div>
            <div class="card-body movies">
                <p class="card-title">${array.Title}</p>
                <h6 class="card-text">${array.Year}</h6>
            </div> 
                <a href="#" class="btn btn-primary" onclick="saveToWatchlist('${array.imdbID}')">ADD</a>
            </div>
        </div>
    `
    return movie
}