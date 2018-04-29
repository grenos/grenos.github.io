class UI {


    //! TOP RATED SECTION
    printMovies (topMoviesRes) {
        let output = ''; 

        const topMovies = topMoviesRes.results;
        const filteredMovies = topMovies.reduce((acc, movie) => {
            
            if (movie.backdrop_path == null) {
                movie.rejectionReason = 'no backdrop'
                acc.rejects.push(movie)
                return acc
            }
            if (movie.poster_path == null) {
                movie.rejectionReason = 'no photo'
                acc.rejects.push(movie)
                return acc
            }
            if (movie.popularity < 4) {
                movie.rejectionReason = 'bad rating'
                acc.rejects.push(movie)
                return acc
            }
                acc.matches.push(movie)
                return acc
                }, { matches: [], rejects: [] })
               
            
            filteredMovies.matches.forEach( movie => {

                let img = movie.poster_path;
                const title = movie.title;
                const date = movie.release_date.substring(0, 4);
                const votes = movie.vote_average; 
                const id = movie.id;  

                output = `
                        <div class="grid-item col-md-2">
                            <div class="grid-item-content">
                                <img src="http://image.tmdb.org/t/p/w500/${img}">
                                <div id="${id}" class="overlay" data-id="movie"></div>
                                <div class="gall-text text-center">
                                    <h4 id="${id}" class="content-title" data-id="movie">${title}</h4>
                                    <span id="${id}" data-id="movie"><i class="fas fa-heart fa-sm"></i> ${votes} hearts<span>
                                    <br>
                                    <span id="${id}" data-id="movie">${date}</span>  
                                </div>
                            </div>
                            </div>
                        </div>
                    `;
                document.querySelector('.grid').innerHTML += output;  
        })
    }

    printSeries (topSeriesRes) {
        let output = '';

        const topSeries = topSeriesRes.results;
        const filteredSeries = topSeries.reduce((acc, serie) => {

            if (serie.backdrop_path == null) {
                serie.rejectionReason = 'no backdrop'
                acc.rejects.push(serie)
                return acc
            }
            if (serie.poster_path == null) {
                serie.rejectionReason = 'no photo'
                acc.rejects.push(serie)
                return acc
            }
            if (serie.popularity < 4) {
                serie.rejectionReason = 'bad rating'
                acc.rejects.push(serie)
                return acc
            }
                acc.matches.push(serie)
                return acc
                }, { matches: [], rejects: [] })
            
            
            filteredSeries.matches.forEach( serie => {

                let img = serie.poster_path;
                const name = serie.name;       
                const date = serie.first_air_date.substring(0, 4);
                const votes = serie.vote_average;
                const id = serie.id;

                output = `
                    <div class="grid-item col-md-2">
                        <div class="grid-item-content">
                            <img src="http://image.tmdb.org/t/p/w500/${img}">
                            <div id="${id}" class="overlay" data-id="serie"></div>
                                <div class="gall-text">
                                    <h4 id="${id}" class="content-title" data-id="serie">${name}</h4>
                                    <span id="${id}" data-id="serie"><i class="fas fa-heart fa-sm"></i> ${votes} hearts<span>
                                    <br>
                                    <span id="${id}" data-id="serie">${date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.querySelector('.grid').innerHTML += output;   
        });
    }


    //! SEARCH SECTION
    printSearchCat (searchCatalogueRes) {

        let output = '';

        const searchQueryMovie = searchCatalogueRes.searchMovieCatalogueInfo.results;
        const filteredMovies = searchQueryMovie.reduce((acc, movie) => {

            if (movie.backdrop_path == null) {
                movie.rejectionReason = 'no backdrop'
                acc.rejects.push(movie)
                return acc
            }
            if (movie.poster_path == null) {
                movie.rejectionReason = 'no photo'
                acc.rejects.push(movie)
                return acc
            }
            if (movie.popularity < 4) {
                movie.rejectionReason = 'bad rating'
                acc.rejects.push(movie)
                return acc
            }
                acc.matches.push(movie)
                return acc
                }, { matches: [], rejects: [] })
            
            
            filteredMovies.matches.forEach( movie => {

                const img = movie.poster_path;
                const title = movie.title;
                const date = movie.release_date.substring(0, 4);
                const votes = movie.vote_average;
                const id = movie.id;

                output += `
                    <div class="grid-item col-md-2">
                        <div class="grid-item-content">
                            <img src="http://image.tmdb.org/t/p/w500/${img}">
                            <div id="${id}" class="overlay" data-id="movie"></div>
                                <div class="gall-text">
                                    <h4 id="${id}" class="content-title" data-id="movie">${title}</h4>
                                    <span id="${id}" data-id="movie"><i class="fas fa-heart fa-sm"></i> ${votes} hearts<span>
                                    <br>
                                    <span id="${id}" data-id="movie">${date}</span>
                                </div>
                            </div>
                        </div>
                    </div>    
                `;
                document.querySelector('.grid').innerHTML = output;
            });


            const searchQuerySerie = searchCatalogueRes.searchSeriesCatalogueInfo.results;
            const filteredSeries = searchQuerySerie.reduce((acc, serie) => {

                if (serie.backdrop_path == null) {
                    serie.rejectionReason = 'no backdrop'
                    acc.rejects.push(serie)
                    return acc
                }
                if (serie.poster_path == null) {
                    serie.rejectionReason = 'no photo'
                    acc.rejects.push(serie)
                    return acc
                }
                if (serie.popularity < 4) {
                    serie.rejectionReason = 'bad rating'
                    acc.rejects.push(serie)
                    return acc
                }
                    acc.matches.push(serie)
                    return acc
                    }, { matches: [], rejects: [] })
            
                
                filteredSeries.matches.forEach( serie => {
                    
                    const img = serie.poster_path;
                    const name = serie.name;
                    const date = serie.first_air_date.substring(0, 4);
                    const votes = serie.vote_average;
                    const id = serie.id;
                        
                    output += `
                    <div class="grid-item col-md-2">
                            <div class="grid-item-content">
                                <img src="http://image.tmdb.org/t/p/w500/${img}">
                                <div id="${id}" class="overlay" data-id="serie"></div>
                                    <div class="gall-text">
                                        <h4 id="${id}" class="content-title" data-id="serie">${name}</h4>
                                        <span id="${id}" data-id="serie"><i class="fas fa-heart fa-sm"></i> ${votes} hearts<span>
                                        <br>
                                        <span id="${id}" data-id="serie">${date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    `;
                    document.querySelector('.grid').innerHTML = output;

                });   
                
                // remove load more button on search results
                document.getElementById('load-more').style.visibility = 'hidden';
    }

    
    // //! MNODAL SECTION
    printModalMovie (searchMovieIdRes) {
        
        //console.log(searchMovieIdRes);
        //prevent scrolling under the modal
        document.querySelector('body').style.overflow = 'hidden';
    
        //shortcut find cast 
        const castInfo = searchMovieIdRes.movieCastInfo;
        // get only the first 10 actors
        const cast = castInfo.cast.slice(0,10);

        //loop through the cast and output it as one string 
        let actors = '';
        cast.forEach( cast => {
             actors += cast.name + ', ';    
        });

        // loop through the genres and print individualy 
        const getGenre = searchMovieIdRes.movieDetailsInfo.genres;
        let genres = '';
        getGenre.forEach( genre => {
            genres += `
                <span class="badge badge-pill badge-light">${genre.name}</span> 
            `;
        });
  
            //shortcut find movie details
            const movieInfo = searchMovieIdRes.movieDetailsInfo;

            const bDrop = movieInfo.backdrop_path, 
                budget = movieInfo.budget,
                site = movieInfo.homepage, 
                imdb = movieInfo.imdb_id, 
                lang = movieInfo.original_language, 
                title = movieInfo.title, 
                overview = movieInfo.overview, 
                pop = movieInfo.popularity,
                img = movieInfo.poster_path,
                date = movieInfo.release_date.substring(0, 4), 
                run = movieInfo.runtime, 
                tag = movieInfo.tagline,
                votes = movieInfo.vote_average;
                
            
                let output = '';

                output = `
                    <div class="myModal">
                        <i class="far fa-times-circle" id="close-modal" onclick="closeModal()"></i>
                        <a href="http://www.imdb.com/title/${imdb}" target="_blank"><i class="fab fa-imdb"></i></a>
                        <a href="http://www.amazon.com/s/ref=nb_ss_d?tag=chriscoyier-20&url=search-alias%3Ddvd&field-keywords=${title}" target="_blank"><i class="fab fa-amazon"></i></a>
                        <a href="http://www.netflix.com/Search?lnkctr=srchrd-ips&v1=${title}" target="_blank"><span class="icon-netflix"></span></a>
                        <a href="${site}" target="_blank"><i class="fas fa-globe"></i></a>
                        <div class="col-md-12 title">
                            <h2 class="modal-title">${title}</h2>
                            <h4 class="modal-title">${tag}</h4>
                        </div>
                        <div class="col-md-8 ml-auto text">
                            <p class="overview"><span>Overview:</span> ${overview}</p>
                        </div>
                        <div class="col-md-6 ml-auto text">
                            <p class="actors"><span>Cast:</span> ${actors}</p>
                        </div>
                        <div class="col-md-5 ml-auto list">
                        <ul class="list-group">
                            <li class="list-group-item title">Movie Info:</li>
                            <li class="list-group-item ml-5"><p>Language: <span>${lang}</span></p></li>
                            <li class="list-group-item ml-5"><p>Release Date: <span>${date}</span></p></li>
                            <li class="list-group-item ml-5"><p>Runtime: <span>${run}</span> minutes</p></li>
                            <li class="list-group-item ml-5"><p>Popularity: <span><i class="fas fa-heart fa-sm"></i> ${votes}</span> votes (${pop})</p></li>
                            <li class="list-group-item ml-5"><p>Budget: $<span>${budget}</span></p></li>
                        </ul>
                        </div>
                        <div class="col-md-5 ml-auto genres">
                            <div class="ml-5">${genres}</div> 
                        </div>
                        ${searchMovieIdRes.movieDetailsInfo.videos.results < 1 ? '' :  
                            `<div class="col-md-5 ml-auto genres">
                                <button type="button" class="btn btn-outline-light trailer-btn" onclick="openVideo()">Trailer</button> 
                            </div>
                            <div class="col-md-12 mx-auto video-container">
                                <iframe src="https://www.youtube.com/embed/${movieInfo.videos.results[0].key}?enablejsapi=1&fs=0&iv_load_policy=3&rel=0&showinfo=0" id="trailer-player" frameborder="0" allowfullscreen class="video"></iframe> 
                            </div> `} 
                            
                            ${searchMovieIdRes.movieDetailsInfo.similar.results < 1 ? '' : `
                            <div class="mx-auto col-md-1">
                                <button type="button" class="btn btn-outline-light similar-btn" onclick="ui.openSimilar()"> Similar</button> 
                            </div>
                            <div class="container-fluid carousel-container">
                                <div class="print-slick" onclick="printSimilar(${window.event})"></div>
                            </div>`}
                    </div>
                `;
                document.querySelector('.modal-container').innerHTML = output;
                
                // set background in CSS
                const modalBg = document.querySelector('.myModal');
                modalBg.style.backgroundImage = `linear-gradient(45deg, rgba(0,0,0,1) 0%,rgba(0,0,0,1) 15%,rgba(255,255,255,.15) 15%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.75) 40%,rgba(0,0,0,0.75) 100%), url(http://image.tmdb.org/t/p/w1280/${bDrop})`; 

                // Tell youtube API to load player
                loadYTplayer();
    }

    printModalSerie (searchSerieIdRes) {
        //console.log(searchSerieIdRes);
        //prevent scrolling under the modal
        document.querySelector('body').style.overflow = 'hidden';

        const cast = searchSerieIdRes.credits.cast.slice(0,10);

        let actors = '';
        cast.forEach( cast => {
             actors += cast.name + ', ';
        });

        const getCreators = searchSerieIdRes.created_by;
        let creators = '';
        getCreators.forEach( person => {
             creators += person.name + ', ';
        });

        // loop through the genres and print individualy 
        const getGenre = searchSerieIdRes.genres;
        let genres = '';
        getGenre.forEach( genre => {
            genres += `
                <span class="badge badge-pill badge-light">${genre.name}</span> 
            `;
        });

        const bDrop = searchSerieIdRes.backdrop_path, 
              name = searchSerieIdRes.name, 
              site = searchSerieIdRes.homepage, 
              lang = searchSerieIdRes.original_language, 
              overview = searchSerieIdRes.overview, 
              pop = searchSerieIdRes.popularity, 
              votes = searchSerieIdRes.vote_average, 
              firstD = searchSerieIdRes.first_air_date.substring(0, 4),
              lastD = searchSerieIdRes.last_air_date,
              id = searchSerieIdRes.id;
              

        let output = '';

         output = `
            <div class="myModal">
            <i class="far fa-times-circle" id="close-modal" onclick="closeModal()"></i>
            <a href="http://www.imdb.com/find?s=tt&q=${name}" target="_blank"><i class="fab fa-imdb"></i></a>
            <a href="http://www.amazon.com/s/ref=nb_ss_d?tag=chriscoyier-20&url=search-alias%3Ddvd&field-keywords=${name}" target="_blank"><i class="fab fa-amazon"></i></a>
            <a href="http://www.netflix.com/Search?lnkctr=srchrd-ips&v1=${name}" target="_blank"><span class="icon-netflix"></span></a>
            <a href="${site}" target="_blank"><i class="fas fa-globe"></i></a>
                <div class="col-md-12 title">
                    <h2 class="modal-title">${name}</h2>
                </div>
                <div class="col-md-8 ml-auto text">
                    <p class="overview"><span>Overview:</span> ${overview}</p>
                </div>
                <div class="col-md-6 ml-auto text">
                    <p class="actors"><span>Cast:</span> ${actors}</p>
                </div>
                <div class="col-md-5 ml-auto list">
                <ul class="list-group">
                    <li class="list-group-item title">Series Info:</li>
                    <li class="list-group-item ml-5"><p>Creators: <span>${creators}</span></p></li>
                    <li class="list-group-item ml-5"><p>Network: <span>${searchSerieIdRes.networks[0].name}</span></p></li>
                    <li class="list-group-item ml-5"><p>Language: <span>${lang}</span></p></li>
                    <li class="list-group-item ml-5"><p>Series Started: <span>${firstD}</span> Latest Air Date: <span>${lastD}</span></p></li>
                    <li class="list-group-item ml-5"><p>Runtime: ~ <span>${searchSerieIdRes.episode_run_time[0]}</span> minutes</p></li>
                    <li class="list-group-item ml-5"><p>Popularity: <span><i class="fas fa-heart fa-sm"></i> ${votes}</span> votes (${pop})</p></li>
                </ul>
                </div>
                <div class="col-md-5 ml-auto genres">
                    <div class="ml-5">${genres}</div> 
                </div>
                ${searchSerieIdRes.videos.results < 1 ? '' : ` 
                    <div class="col-md-5 ml-auto genres">
                        <button type="button" class="btn btn-outline-light trailer-btn" onclick="openVideo()">Trailer</button> 
                    </div>
                    <div class="col-md-12 mx-auto video-container">
                        <iframe src="https://www.youtube.com/embed/${searchSerieIdRes.videos.results[0].key}?enablejsapi=1&fs=0&iv_load_policy=3&rel=0&showinfo=0" id="trailer-player" frameborder="0" allowfullscreen class="video"></iframe> 
                    </div> `}  
                
                ${searchSerieIdRes.similar.results < 1 ? '' : `
                    <div class="mx-auto col-md-1">
                        <button type="button" class="btn btn-outline-light similar-btn" onclick="ui.openSimilar()"> Similar</button> 
                    </div>
                    <div class="container-fluid carousel-container" onclick="printSimilar(${window.event})">
                        <div class="print-slick"></div>
                    </div>`}
            </div>
        `;
        document.querySelector('.modal-container').innerHTML = output;

        // set background in CSS
        const modalBgS = document.querySelector('.myModal');
        modalBgS.style.backgroundImage = `linear-gradient(45deg, rgba(0,0,0,1) 0%,rgba(0,0,0,1) 15%,rgba(255,255,255,.15) 15%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.75) 40%,rgba(0,0,0,0.75) 100%), url(http://image.tmdb.org/t/p/w1280/${bDrop})`;

        // Tell youtube API to load player
        loadYTplayer();
    }

    //! SIMILAR 
    printSimilarMovies (searchMovieIdRes) {
       
        let poster = '';
        searchMovieIdRes.movieDetailsInfo.similar.results.forEach( movie => {
            poster += `
                <div class="slick-item">
                    <img src="http://image.tmdb.org/t/p/w154/${movie.poster_path}"  id="${movie.id}" data-id="movie" alt="Similar">
                </div>
            `;
        }) 
        
        document.querySelector('.print-slick').innerHTML = poster;
        
    }

    printSimilarSeries (searchSerieIdRes) {
        
        let poster = '';
        searchSerieIdRes.similar.results.forEach( serie => {
            poster += `
                <div class="slick-item">
                    <img src="http://image.tmdb.org/t/p/w154/${serie.poster_path}"  id="${serie.id}" data-id="serie" alt="Similar">
                </div>
            `;
        })
        
        document.querySelector('.print-slick').innerHTML = poster;
        
    }

    openSimilar () {

        document.querySelector('.similar-btn').classList.toggle('sm-btn-active');
        document.querySelector('.carousel-container').classList.toggle('car-cont-active');
    }

    clearModal () {
        const modal = document.querySelector('.myModal');
        const video = document.querySelector('.video-container');

        if (video && video.style.display === 'block') {
            video.style.display = 'none';
            player.stopVideo();
            
            
        }  else if (modal) {
            modal.remove();
            //set back to auto
            document.querySelector('body').style.overflow = 'auto';
        }
    }

    //! NAVBAR SECTION
    clearInput () {
        document.getElementById('inlineFormInputGroup').value = '';
    }

    noMovieFound () {
        //clear results
        document.querySelector('.grid').innerHTML = '';

        //print message
        let output = '';
        
        output = `
            <div class="container text-center">
                <div class="no-movie-found">
                    <h2>Wops! We couldn't find that! Try another one! :)</h2>
                    <img src="https://media.giphy.com/media/323W9jGIsDzUFUuOtd/giphy.gif">
                </div>
            </div>
        `;

        document.querySelector('.grid').innerHTML = output;
    }

    activeLink (e) {
        const movies = document.getElementById('movies');
        const series = document.getElementById('series');
        const clicked = e.target.id;
        
        // if movies is clicked add class and remove from series
        if (clicked === 'movies') {

            series.classList.remove('active-link');
            movies.classList.add('active-link');
     
        //else add class to series and remove from movies
        } else if (clicked === 'series') {

            movies.classList.remove('active-link');
            series.classList.add('active-link');
        }
    }



    //! PRINT BY GENRE
    printMovieGenres (genreListMoviesRes) {

        const movieGenre = genreListMoviesRes.genres;
        let output = '';

        movieGenre.forEach( genre => {
            
            const id = genre.id;
            const name = genre.name;

            output += `
                <a class="dropdown-item" data-genre="${id}" href="#">${name}</a>
            `
            document.querySelector('.dropdown-menu').innerHTML = output;

        });
    }

    printSeriesGenres (genreListSeriesRes) {

        const serieGenre = genreListSeriesRes.genres;
        let output = '';

        serieGenre.forEach( genre => {
            
            const id = genre.id;
            const name = genre.name;

            output += `
                <a class="dropdown-item" data-genre="${id}" href="#">${name}</a>
            `
            document.querySelector('.dropdown-menu').innerHTML = output;

        });
    }

    printMovieByGenre (movieGenreRes) {

        let output = ''; 

        const movieGenre = movieGenreRes.results;
        const filteredMovies = movieGenre.reduce((acc, movie) => {
            
            if (movie.poster_path == null) {
                movie.rejectionReason = 'no photo'
                acc.rejects.push(movie)
                return acc
            }
            if (movie.popularity < 4) {
                movie.rejectionReason = 'bad rating'
                acc.rejects.push(movie)
                return acc
            }
                acc.matches.push(movie)
                return acc
                }, { matches: [], rejects: [] })
               
            
            filteredMovies.matches.forEach( movie => {

                let img = movie.poster_path;
                const title = movie.original_title;
                const date = movie.release_date.substring(0, 4);
                const votes = movie.vote_average; 
                const id = movie.id;  

                output = `
                        <div class="grid-item col-md-2">
                            <div class="grid-item-content">
                                <img src="http://image.tmdb.org/t/p/w500/${img}">
                                <div id="${id}" class="overlay" data-id="movie"></div>
                                <div class="gall-text text-center">
                                    <h4 id="${id}" class="content-title" data-id="movie">${title}</h4>
                                    <span id="${id}" data-id="movie"><i class="fas fa-heart fa-sm"></i> ${votes} hearts<span>
                                    <br>
                                    <span id="${id}" data-id="movie">${date}</span>   
                                </div>
                            </div>
                            </div>
                        </div>
                    `;
                document.querySelector('.grid').innerHTML += output;  
        });

    }

    printSeriesByGenres (serieGenreRes) {

        let output = '';

        const seriesGenre = serieGenreRes.results;
        const filteredSeries = seriesGenre.reduce((acc, serie) => {

            if (serie.poster_path == null) {
                serie.rejectionReason = 'no photo'
                acc.rejects.push(serie)
                return acc
            }
            if (serie.popularity < 4) {
                serie.rejectionReason = 'bad rating'
                acc.rejects.push(serie)
                return acc
            }
                acc.matches.push(serie)
                return acc
                }, { matches: [], rejects: [] })
            
            
            filteredSeries.matches.forEach( serie => {

                let img = serie.poster_path;
                const name = serie.name;       
                const date = serie.first_air_date.substring(0, 4);
                const votes = serie.vote_average;
                const id = serie.id;

                output = `
                    <div class="grid-item col-md-2" id="genre">
                        <div class="grid-item-content">
                            <img src="http://image.tmdb.org/t/p/w500/${img}">
                            <div id="${id}" class="overlay" data-id="serie"></div>
                                <div class="gall-text">
                                    <h4 id="${id}" class="content-title" data-id="serie">${name}</h4>
                                    <span id="${id}" data-id="serie"><i class="fas fa-heart fa-sm"></i> ${votes} hearts<span>
                                    <br>
                                    <span id="${id}" data-id="serie">${date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.querySelector('.grid').innerHTML += output;   
        });

    }  

}



//! IMPORTANT

//TODO ///// fix genre pagination

// TODO /// RESPONSIVE