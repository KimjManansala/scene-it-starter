//TODO
//CLEAN CODE
//PREVENT DEFAULT THING
// CREATE A REMOVE BUTTON ON WATCHLIST
//BETTER CSS
//CREATAE READBLE CODE


const $container = $("#container-movie")
document.getElementById('search-form').addEventListener('input', findSearchMovie)

function findSearchMovie(evt) {
    evt.preventDefault()
    let searchString = evt.target.value.toLowerCase();
    console.info('This is the search string', searchString)
    if (!searchString) {
        $container.html(`<h1>Search for a movie<h1>`)

    } else {
        let urlEncodedSearchString = encodeURIComponent(searchString)
        axios.get("http://www.omdbapi.com/?apikey=3430a78&s=" + urlEncodedSearchString)
            .then(function (res) {
                console.log('This is results data.search of the api', res.data.Search)
                movieData = res.data.Search
                console.info(movieData)
                if (!res.data.Search) {
                    renderMovieList($container)
                }
                $container.html(renderMovie(res.data.Search))
                // return res
            })
    }
}
//
//Function to add movie to a watchlist
//s
function renderMovieList($container) {
    $container.html(`<p id="too-many-result-p">Too many results
    Or movie not in Database
    Please make another search</p>`)
    return
}

function renderTooManyToList() {

}

function saveToWatchlist(imdbID) {
    // preventDefault()
    console.info('This is the imbdid', imdbID)
    let movie = movieData.find(function (thisMovie) {
        return thisMovie.imdbID === imdbID
    })
    console.info('This is the movie that will be saved', movie)
    let watchlistJSON = localStorage.getItem('watchlist')
    let watchlist = JSON.parse(watchlistJSON)
    if (watchlist === null) {
        watchlist = []
    }

    for (let i = 0; i < watchlist.length; i++) {
        if (movie.imdbID === watchlist[i].imdbID) {
            console.error('Already in watchlist')
            return
        }
    }
    watchlist.push(movie)
    watchlistJSON = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', watchlistJSON)

    console.log('this is the watchlist array', watchlist)
}

// ----------
// Render functions
// ---------

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