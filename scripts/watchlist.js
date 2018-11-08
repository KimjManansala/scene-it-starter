//Grabbing local storage using parse into an arrays
let watchlistJSON = localStorage.getItem('watchlist')
let watchlist = JSON.parse(watchlistJSON)
//---------------------------------
const $container = $('#container-movie')

document.addEventListener('DOMContentLoaded', function () {

    console.info(watchlistJSON)
    console.info(watchlist)
    if (!watchlist) {
        watchlist = []
        
        console.error('WATCHLIST should not be null')
    }
    //make this into a function
    if(watchlist.length === 0){
        $container.html('<h1> Search for movies to add!</h1>')
    } else{
    $container.html(renderMovie(watchlist))
    }
    //---------------------

})



function renderMovie(movieArray) {
    let movieHTML = movieArray.map(RenderCurrentMovie)
    return movieHTML.join(' ')

}

function removeToWatchlist(imbdID) {
    console.info(watchlist)

    let id = imbdID
    let movie = watchlist.find(function (thisMovie) {
        return thisMovie.imdbID === id
    })

    for (let i = 0; i < watchlist.length; i++) {
        if(watchlist[i] === movie){
            watchlist.splice(i,1)
        }
    }
    watchlistJSON = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', watchlistJSON)
    if (!watchlist) {
        watchlist = []
    }
    //make this into a function
    if(watchlist.length === 0){
        $container.html('<h1> Search for movies to add!</h1>')
    } else{
    $container.html(renderMovie(watchlist))
    }
    //---------------------

    
}

function RenderCurrentMovie(array) {
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