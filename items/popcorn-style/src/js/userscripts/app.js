//! mouse hack for cross btowser compatibility of event 
 
function fixupMouse( event ) {
  event = event || window.event;
  var e = { event: event,
      target: event.target ? event.target : event.srcElement,
      which: event.which ? event.which :
          event.button === 1 ? 1 :
          event.button === 2 ? 3 : 
          event.button === 4 ? 2 : 1,
      x: event.x ? event.x : event.clientX,
      y: event.y ? event.y : event.clientY
  };
  return e;
  }


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

//init Slick Carousel Plugin
function slickReady(){

    $('.print-slick').slick({
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows: true,
    });
}


//! ON LOAD GET RESULTS
//get movies and genres on DOM load
document.addEventListener('DOMContentLoaded', getMovies);
document.addEventListener('DOMContentLoaded', getGenres);

function getMovies(page) {

    movie.topMovies(page)
        .then(topMoviesRes => {
            ui.printMovies(topMoviesRes);
            //console.log(topMoviesRes);
        })
        .catch(err => console.log(err));
}

// get series 
function getSeries(page) {

    movie.topSeries(page)
        .then(topSeriesRes => {
            ui.printSeries(topSeriesRes);
            //console.log(topSeriesRes);
        })
        .catch(err => console.log(err));
}

//get genres -- called from navbar listener also
function getGenres() {
    
    // on load call the api  -- get genres list send them to ui
    if (document.querySelector('#movies.active-link')) {
        
        movie.genreListMovies()
            .then(genreListMoviesRes => {
                ui.printMovieGenres(genreListMoviesRes);
                //console.log(genreListMoviesRes);
            })
            .catch(err => console.log(err));

    } else if (document.querySelector('#series.active-link')) {

        movie.genreListSeries()
            .then(genreListSeriesRes => {
                ui.printSeriesGenres(genreListSeriesRes);
                //console.log(genreListSeriesRes);
            })
            .catch(err => console.log(err));
    }
}

// event listener movies link Navbar
document.getElementById('movies').addEventListener('click', () => {
    // call function
    getMovies();
    // clear search input if it has letters inside
    ui.clearInput();
    // clear dom from previews appended results
    document.querySelector('.grid').innerHTML = '';
});

//event listener series link Navbar
document.getElementById('series').addEventListener('click', () => {
    getSeries();
    ui.clearInput();
    document.querySelector('.grid').innerHTML = '';
});




//! OPEN CLOSE MODAL 
// event listener modal 
document.querySelector('.grid').addEventListener('click', openModal);

function openModal (event) {
    
    var e = fixupMouse( event );
    
    if (e.target.dataset.id === 'movie') {
        const clickId = e.target.id;  //! if its a movie

        // movie details and cast by id
        movie.searchMovieId(clickId)
            .then(searchMovieIdRes => {
                ui.printModalMovie(searchMovieIdRes);
                ui.printSimilarMovies(searchMovieIdRes);
                slickReady()
            })
            .catch(err => console.log(err));


    } else if (e.target.dataset.id === 'serie') {  //! if its a series 
        const clickId = e.target.id;
        
        // serie details FULL
        movie.searchSerieId(clickId)
            .then(searchSerieIdRes => {
                ui.printModalSerie(searchSerieIdRes);
                ui.printSimilarSeries(searchSerieIdRes);
                slickReady()
            })
            .catch(err => console.log(err));

            
    }
}

//! GO TO SIMILAR
function printSimilar(event) { 

    var e = fixupMouse( event );

    if (e.target.dataset.id === 'movie') {
        const clickId = e.target.id;  //! if its a movie

        // movie details and cast by id
        movie.searchMovieId(clickId)
            .then(searchMovieIdRes => {
                ui.printModalMovie(searchMovieIdRes);
                ui.printSimilarMovies(searchMovieIdRes);
                slickReady()
            })
            .catch(err => console.log(err));


    } else if (e.target.dataset.id === 'serie') {  //! if its a series 
        const clickId = e.target.id;
       
        // serie details FULL
        movie.searchSerieId(clickId)
            .then(searchSerieIdRes => {
                ui.printModalSerie(searchSerieIdRes);
                ui.printSimilarSeries(searchSerieIdRes);
                slickReady()
            })
            .catch(err => console.log(err));
            
    }

}


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
               
                // if no results print ''no movie found''
                if ( searchCatalogueRes.searchMovieCatalogueInfo.results < 1 && searchCatalogueRes.searchSeriesCatalogueInfo.results < 1) {
                    ui.noMovieFound();
                };

            })
            .catch(err => {
                console.log(err);

            })
    } 
    
    // if less than 1 letter on search input
    if (userText.length < 1 ) {
        getMovies();
        // load more button shows up again
        document.getElementById('load-more').style.visibility = 'visible';
        // clear dom from previous movies
        document.querySelector('.grid').innerHTML = '';
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
    //call genre function
    //getGenres(); 
    //set button to show if its hidden from searhc results
    document.getElementById('load-more').style.visibility = 'visible';
});



//! LOAD MORE BUTTON
// globals for counter
let moviesPage = 1;
let seriesPage = 1;

document.getElementById('load-more').addEventListener('click', loadMore)
    
function loadMore () {

 
  if (document.querySelector('#movies.active-link')) {

    moviesPage++;
    getMovies(moviesPage); 
    //printByGenre(event, moviesPage);
    
    
  } else if (document.querySelector('#series.active-link')) {

    seriesPage++;
    getSeries(seriesPage);

  }
  
}


//! PRINT BY GENRE
// get access to genre list on nav 
document.querySelector('.dropdown-menu').addEventListener('click', printByGenre);

function printByGenre (e) {

     // clean dom from previous movies
     document.querySelector('.grid').innerHTML = '';
     // clean search input
     ui.clearInput();
     //show load more button if coming from search
     document.getElementById('load-more').style.visibility = 'visible';
     // fetch the data-genre of each link
     const genreId = e.target.dataset.genre;
 
     
     // on click of each sent data to api call
     if (document.querySelector('#movies.active-link')) {  //! movies genres
         
         movie.movieGenre(moviesPage, genreId)
             .then(movieGenreRes => {
                 ui.printMovieByGenre(movieGenreRes);
                 //console.log(movieGenreRes);
             })
             .catch(err => console.log(err));
 
     } else if (document.querySelector('#series.active-link')) { //! series genres
        
         movie.serieGenre(seriesPage, genreId)
             .then(serieGenreRes => {
                 ui.printSeriesByGenres(serieGenreRes);
                 //console.log(serieGenreRes);
             })
             .catch(err => console.log(err));
 
     }

};






