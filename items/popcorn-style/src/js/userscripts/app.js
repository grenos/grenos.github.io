//! OBJECT INITIALIZERS
// init movie object from class
const movie = new Movie();

// init ui object
const ui = new UI;

// init YT object
var player;   
function loadYTplayer() {
    player = new YT.Player('trailer-player');
}



//! ON LOAD GET RESULTS
//get movies on DOM load
document.addEventListener('DOMContentLoaded', getMovies);

function getMovies(page) {

    movie.topMovies(page)
        .then(topMoviesRes => {
            ui.printMovies(topMoviesRes);
            console.log(topMoviesRes);
        })
        .catch(err => console.log(err));
}

// get series 
function getSeries(page) {

    movie.topSeries(page)
        .then(topSeriesRes => {
            ui.printSeries(topSeriesRes);
            console.log(topSeriesRes);
        })
        .catch(err => console.log(err));
}

// event listener movies
document.getElementById('movies').addEventListener('click', () => {
    getMovies();
    ui.clearInput();
});

//event listener series
document.getElementById('series').addEventListener('click', () => {
    getSeries();
    ui.clearInput();
});





//! OPEN CLOSE MODAL 
// event listener modal 
document.querySelector('.grid').addEventListener('click', (e) => {
    if (e.target.dataset.id === 'movie') {
        const clickId = e.target.id;  //! if its a movie

        // movie details and cast by id
        movie.searchMovieId(clickId)
            .then(searchMovieIdRes => {
                ui.printModalMovie(searchMovieIdRes);
            })
            .catch(err => console.log(err));


    } else if (e.target.dataset.id === 'serie') {  //! if its a series 
        const clickId = e.target.id;

        // serie details FULL
        movie.searchSerieId(clickId)
            .then(searchSerieIdRes => {
                ui.printModalSerie(searchSerieIdRes);
            })
            .catch(err => console.log(err));
    }
})

// delete modal //* evt lstnr on html
function closeModal() {
    ui.clearModal();
}


// function for trailer video called from html
function openVideo() {

    document.querySelector('.myModal').style.overflow = 'hidden';
    document.querySelector('.video-container').style.display = 'block';

    player.playVideo();
   
}




//! SEARCH FOR RESULTS
// event listener search
document.getElementById('inlineFormInputGroup').addEventListener('keyup', (e) => {

    const userText = document.getElementById('inlineFormInputGroup').value;

    // search only if there are atleast 3 letters
    if(userText.length >= 3) {

        // find movies and series by search keyword name
        movie.searchCatalogue(userText)
            .then(searchCatalogueRes => {
                ui.printSearchCat(searchCatalogueRes);
            })
            .catch(err => {
                console.log(err);

            })
    } 
    
    if (userText.length < 1 ) {
        getMovies();
    }

    e.preventDefault();
})




//! NAVBAR ADN PAGINATION 
// Evt Listener for nav active link
document.querySelector('.navbar-nav').addEventListener('click', (e) => {

    // first reset counters
    moviesPage = 1;
    seriesPage = 1; 
    //then set active link
    ui.activeLink(e);
    //set button to show if its hidden from searhc results
    document.getElementById('load-more').style.visibility = 'visible';
});

// globals for counter
let moviesPage = 1;
let seriesPage = 1;

// set page counter
document.getElementById('load-more').addEventListener('click', () => {

  if (document.querySelector('#movies.active-link')) {

    moviesPage++;
    getMovies(moviesPage);

  } else if (document.querySelector('#series.active-link')) {

    seriesPage++;
    getSeries(seriesPage);

  }
});


// document.getElementById('openNav').addEventListener('click', () => {

//     ui.BrowseByGenre();

// })

