//! mouse hack for cross btowser compatibility of event
function fixupMouse(event) {
  event = event || window.event;
  var e = {
    event: event,
    target: event.target ? event.target : event.srcElement,
    which: event.which
      ? event.which
      : event.button === 1
        ? 1
        : event.button === 2
          ? 3
          : event.button === 4
            ? 2
            : 1,
    x: event.x ? event.x : event.clientX,
    y: event.y ? event.y : event.clientY
  };
  return e;
}

//! OBJECT INITIALIZERS
// init movie object from class
const movie = new Movie();

// init ui object
const ui = new UI();

// init YT object
var player;
function loadYTplayer() {
  player = new YT.Player('trailer-player');
}

//init Slick Carousel Plugin //! make responsive
function slickReady() {
  $('.print-slick').slick({
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: true,
    dragable: true,
    responsive: [
      {
        breakpoint: 1921,
        settings: {
          slidesToShow: 10,
          slidesToScroll: 10
        }
      },
      {
        breakpoint: 1621,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8
        }
      },
      {
        breakpoint: 1376,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7
        }
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 321,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}

// init magnific popup plugin
function popupReady() {
  $('.popup-pic').magnificPopup({
    type: 'image',
    showCloseBtn: false,
    gallery: {
      enabled: true
    }
  });
}

//! ON LOAD GET RESULTS
//get movies and genres on DOM load
document.addEventListener('DOMContentLoaded', getMovies);
//document.addEventListener('DOMContentLoaded', getGenres);

function getMovies(page) {
  movie
    .topMovies(page)
    .then(topMoviesRes => {
      ui.printMovies(topMoviesRes);
    })
    .catch(err => console.log(err));
}

// get series
function getSeries(page) {
  movie
    .topSeries(page)
    .then(topSeriesRes => {
      ui.printSeries(topSeriesRes);
      //console.log(topSeriesRes);
    })
    .catch(err => console.log(err));
}

// //get genres -- called on document load
// function getGenres() {
//   // on load call the api  -- get genres list send them to ui
//   if (document.querySelector('#movies.active-link')) {
//     movie
//       .genreListMovies()
//       .then(genreListMoviesRes => {
//         ui.printMovieGenres(genreListMoviesRes);
//       })
//       .catch(err => console.log(err));
//   } else if (document.querySelector('#series.active-link')) {
//     movie
//       .genreListSeries()
//       .then(genreListSeriesRes => {
//         ui.printSeriesGenres(genreListSeriesRes);
//       })
//       .catch(err => console.log(err));
//   }
// }

// event listener movies link Navbar
document.getElementById('movies').addEventListener('click', () => {
  // clear dom from previews appended results
  document.querySelector('.grid').innerHTML = '';
  // call function
  getMovies();
  // clear search input if it has letters inside
  ui.clearInput();
});

//event listener series link Navbar
document.getElementById('series').addEventListener('click', () => {
  document.querySelector('.grid').innerHTML = '';
  getSeries();
  ui.clearInput();
});

//! NAVBAR AND PAGINATION
// Evt Listener for nav active link
document.querySelector('.MyNav').addEventListener('click', e => {
  // first reset counters
  moviesPage = 1;
  seriesPage = 1;
  //then set active link
  ui.activeLink(e);
  //call genre function
  //getGenres();
});

//! OPEN CLOSE MODAL
// event listener modal
document.querySelector('.grid').addEventListener('click', openModal);

function openModal(event) {
  var e = fixupMouse(event);

  if (e.target.dataset.id === 'movie') {
    const clickId = e.target.id; //! if its a movie

    // movie details and cast by id
    movie
      .searchMovieId(clickId)
      .then(searchMovieIdRes => {
        ui.printModalMovie(searchMovieIdRes);
        ui.printSimilarMovies(searchMovieIdRes);
        slickReady();
      })
      .catch(err => console.log(err));
  } else if (e.target.dataset.id === 'serie') {
    //! if its a series
    const clickId = e.target.id;

    // serie details FULL
    movie
      .searchSerieId(clickId)
      .then(searchSerieIdRes => {
        ui.printModalSerie(searchSerieIdRes);
        ui.printSimilarSeries(searchSerieIdRes);
        slickReady();
      })
      .catch(err => console.log(err));
  }
}

//! GET ACTORS

function printActor(event) {
  var e = fixupMouse(event);

  const actorId = e.target.dataset.actor;

  movie
    .getActors(actorId)
    .then(getActorRes => {
      ui.printActor(getActorRes);
      popupReady();
    })
    .catch(err => console.log(err));
}

//! EXPAND ACTOR BIO
function expand() {
  const bio = document.querySelector('.bio');
  const style = window.getComputedStyle(bio);
  const bioSize = style.getPropertyValue('max-height');

  if (bioSize == '50px') {
    bio.style.maxHeight = '300px';
    document.querySelector('.expand-btn').innerHTML = 'Close';
  } else {
    bio.style.maxHeight = '50px';
    document.querySelector('.expand-btn').innerHTML = 'Open';
  }
}

//! GO TO SIMILAR
function printSimilar(event) {
  var e = fixupMouse(event);

  if (e.target.dataset.id === 'movie') {
    const clickId = e.target.id; //! if its a movie

    // movie details and cast by id
    movie
      .searchMovieId(clickId)
      .then(searchMovieIdRes => {
        ui.printModalMovie(searchMovieIdRes);
        ui.printSimilarMovies(searchMovieIdRes);
        slickReady();
      })
      .catch(err => console.log(err));
  } else if (e.target.dataset.id === 'serie') {
    //! if its a series
    const clickId = e.target.id;

    // serie details FULL
    movie
      .searchSerieId(clickId)
      .then(searchSerieIdRes => {
        ui.printModalSerie(searchSerieIdRes);
        ui.printSimilarSeries(searchSerieIdRes);
        slickReady();
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
document.getElementById('inlineFormInputGroup').addEventListener('keyup', e => {
  const userText = document.getElementById('inlineFormInputGroup').value;

  // search only if there are atleast 3 letters
  if (userText.length >= 3) {
    // find movies and series by search keyword name
    movie
      .searchCatalogue(userText)
      .then(searchCatalogueRes => {
        ui.printSearchCat(searchCatalogueRes);

        // if no results print ''no movie found''
        if (
          searchCatalogueRes.searchMovieCatalogueInfo.results < 1 &&
          searchCatalogueRes.searchSeriesCatalogueInfo.results < 1
        ) {
          ui.noMovieFound();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  // if less than 1 letter on search input
  if (userText.length < 1) {
    //load movies
    getMovies();
    // reset counters
    moviesPage = 1;
    seriesPage = 1;
    // set active link to movies if its not there
    document.getElementById('series').classList.remove('active-link');
    document.getElementById('movies').classList.add('active-link');
    // clear dom from previous movies
    document.querySelector('.grid').innerHTML = '';
  }

  e.preventDefault();
});

//! LOAD MORE LISTENER
// globals for counter
let moviesPage = 1;
let seriesPage = 1;

window.addEventListener('scroll', loadMore);
function loadMore(e) {
  // define input const
  const userText = document.getElementById('inlineFormInputGroup').value;
  // if bottom of page
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if (document.querySelector('#movies.active-link') && !userText) {
      moviesPage++;
      getMovies(moviesPage);
      //printByGenre(moviesPage, genreId);
    } else if (document.querySelector('#series.active-link') && !userText) {
      seriesPage++;
      getSeries(seriesPage);

      // if on search mode dont load more
    } else if (userText) {
      console.log('No more Suggestions.');
    }
  }
}

// //! PRINT BY GENRE
// // get access to genre list on nav
// document
//   .querySelector('.dropdown-menu')
//   .addEventListener('click', printByGenre);

// function printByGenre(e, moviesPage, genreId) {
//   // clean dom from previous movies
//   document.querySelector('.grid').innerHTML = '';
//   // clean search input
//   ui.clearInput();
//   // fetch the data-genre of each link
//   const genreId = e.target.dataset.genre;
//   // on click of each sent data to api call
//   if (document.querySelector('#movies.active-link')) {
//     //! movies genres
//     movie
//       .movieGenre(moviesPage, genreId)
//       .then(movieGenreRes => {
//         ui.printMovieByGenre(movieGenreRes);
//       })
//       .catch(err => console.log(err));
//   } else if (document.querySelector('#series.active-link')) {
//     //! series genres

//     movie
//       .serieGenre(genreId)
//       .then(serieGenreRes => {
//         ui.printSeriesByGenres(serieGenreRes);
//       })
//       .catch(err => console.log(err));
//   }
// }
