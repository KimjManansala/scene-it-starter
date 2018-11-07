document.addEventListener('DOMContentLoaded', init);





function init() {
    const container = document.getElementById("container-movie")
    document.getElementById('search-form').addEventListener('input', function (evt) {
        evt.preventDefault()
        console.log('---------')
        let searchString = evt.target.value.toLowerCase();
        let filteredData = movieData.filter(function (movie) {
            let foundInTitle = movie.Title.toLowerCase().indexOf(searchString) > -1
            let foundInYear = movie.Year.toLowerCase().indexOf(searchString) > -1
            let foundInIMDBID = movie.imdbID.toLowerCase().indexOf(searchString) > -1
            console.log('---------')
            console.log('found in title', foundInTitle, 'Found in data', movie.Title)
            return foundInTitle || foundInYear || foundInIMDBID;

        })

        if (searchString === '' || searchString === null) {
            container.innerHTML = "<h1>Seach for a movie</h1>"
        }else {
            container.innerHTML = `${renderMovie(filteredData)}
            <div class="other-movie-container">
                <h2>If you didn't find what you are looking for</h2>
                <h2 class="other-movie"> You may enjoy these</h2>
                <hr>
            </div>
            ${renderMovie(movieData)}
            `
            
        }

    });
}



function saveToWatchlist (imdbID){
    console.info(imdbID)
    let movie = movieData.find(function(thisMovie){
        return thisMovie.imdbID == imdbID
    })
    console.info(movie)
    let watchlistJSON = localStorage.getItem('watchlist')
    let watchlist = JSON.parse(watchlistJSON)
    if(watchlist === null){
        let watchlist = []
        console.error('WATCHLIST should not be null')
        return
    }
    watchlist.push(movie)
    watchlistJSON = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', watchlistJSON)

    
    console.log(watchlist)
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