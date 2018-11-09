//TODO

//PREVENT DEFAULT ON BUTTON
//BETTER CSS
//CREATE MORE READBLE CODE
// Redesign the application to your own aesthetic
// Some movies that come back from the API don’t have image urls. Maybe add a default “no image found” image for those movies!
// Allow users to rate and/or review movies that are on their watchlist 
// Let users click on movies to show more details about the movie (rotten tomatoes rating, synopsis, etc.)



const $container = $("#container-movie")
document.getElementById('search-form').addEventListener('input', findSearchMovie)

function findSearchMovie(evt) {
    evt.preventDefault()
    let searchString = evt.target.value.toLowerCase();

    if (!searchString) {
        $container.html(`<h1>Search for a movie<h1>`)
    } else {
        let urlEncodedSearchString = encodeURIComponent(searchString)
        axios.get("https://www.omdbapi.com/?apikey=3430a78&s=" + urlEncodedSearchString)
            .then(function (res) {
                console.info('this is the result', res)
                console.info('this is the other result-->', res.data.Search)
                movieData = res.data.Search
                if (!movieData) {
                    renderTooManyToList()
                }
                //----------------------------
                //NEEDS WORK
                //------------------------------
            
                for(let i = 0; i  < movieData.length; i++){
                    console.info(movieData.Poster)
                    if(movieData.Poster === 'N/A'){
                        movieData.Poster = 'no_image.png'
                    }
                }
                $container.html(renderMovie(movieData))
                return movieData
            })
            .catch(function (error) {
                console.log(error);
              });

    }
}
//
//Function to add movie to a watchlist
//s
function renderTooManyToList() {
    $container.html(`<p id="too-many-result-p">Too many results
    Or movie not in Database
    Please make another search</p>`)
    return
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