class UI {

    printMovies (topMoviesRes) {
        let output = '';

        const topMovies = topMoviesRes.results;
        topMovies.forEach( movie => {

            if (movie.poster_path.status != 404 && movie.popularity > 8) {

                let img = movie.poster_path;
                const title = movie.original_title;
                const overview = movie.overview;   
                const bDrop = movie.backdrop_path;
                const date = movie.release_date.substring(0, 4);
                const votes = movie.vote_average;

                output += `
                        <div class="grid-item col-md-2">
                            <div class="grid-item-content">
                                <img src="http://image.tmdb.org/t/p/w500/${img}">
                                <div class="overlay"></div>
                                <div class="gall-text text-center">
                                    <h4 class="content-title">${title}</h4>
                                    <span><i class="fas fa-heart fa-sm"></i> ${votes} hearts<span>
                                    <br>
                                    <span>${date}</span>
                                </div>
                            </div>
                            </div>
                        </div>
                    `;
                document.querySelector('.grid').innerHTML = output;  

            } else {
                output = ''; //todo print "opps we couldn't find that. Try another one!"
            }
        })
    }

    printSeries (topSeriesRes) {
        let output = '';

        const topSeries = topSeriesRes.results;
        topSeries.forEach( serie => {

            if (serie.poster_path.status != 404 && serie.popularity > 5) {

                let img = serie.poster_path;
                const name = serie.name;
                const overview = serie.overview;         
                const bDrop = serie.backdrop_path;
                const date = serie.first_air_date.substring(0, 4);
                const votes = serie.vote_average;
                const lang = serie.original_language;

                output += `
                    <div class="grid-item col-md-2">
                        <div class="grid-item-content">
                            <img src="http://image.tmdb.org/t/p/w500/${img}">
                            <div class="overlay"></div>
                                <div class="gall-text">
                                    <h4 class="content-title">${name}</h4>
                                    <span><i class="fas fa-heart fa-sm"></i> ${votes} hearts<span>
                                    <br>
                                    <span>${date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.querySelector('.grid').innerHTML = output;  

            } else {
                output = ''; //todo print "opps we couldn't find that. Try another one!"
            }
        })
    }

    printSearchCat (searchCatalogueRes) {
        let output = '';

        const searchQueryMovie = searchCatalogueRes.searchMovieCatalogueInfo.results;
        searchQueryMovie.forEach( movie => {
            
            if (movie.poster_path != null && movie.popularity > 0) {

                const img = movie.poster_path;
                const pop = movie.popularity;
                const title = movie.original_title;
                const overview = movie.overview;
                const bDrop = movie.backdrop_path;
                const date = movie.release_date.substring(0, 4);
                const votes = movie.vote_average;

                output += `
                    <div class="grid-item col-md-2">
                        <div class="grid-item-content">
                            <img src="http://image.tmdb.org/t/p/w500/${img}">
                            <div class="overlay"></div>
                                <div class="gall-text">
                                    <h4 class="content-title">${title}</h4>
                                    <span><i class="fas fa-heart fa-sm"></i> ${votes} hearts<span>
                                    <br>
                                    <span>${date}</span>
                                </div>
                            </div>
                        </div>
                    </div>    
                `;
                document.querySelector('.grid').innerHTML = output;
                
            } else {
                output = '';   //todo print "opps we couldn't find that. Try another one!"
            } 
        })

        const searchQuerySerie = searchCatalogueRes.searchSeriesCatalogueInfo.results;
        searchQuerySerie.forEach( serie => {

            if (serie.poster_path != null && serie.popularity > 8) {
            
                const img = serie.poster_path;
                const pop = serie.popularity;
                const name = serie.name;
                const overview = serie.overview;
                const bDrop = serie.backdrop_path;
                const date = serie.first_air_date.substring(0, 4);
                const votes = serie.vote_average;
                const lang = serie.original_language;
                    
                output += `
                <div class="grid-item col-md-2">
                        <div class="grid-item-content">
                            <img src="http://image.tmdb.org/t/p/w500/${img}">
                            <div class="overlay"></div>
                                <div class="gall-text">
                                    <h4 class="content-title">${name}</h4>
                                    <span><i class="fas fa-heart fa-sm"></i> ${votes} hearts<span>
                                    <br>
                                    <span>${date}</span>
                                </div>
                            </div>
                        </div>
                    </div>   
                `;
                document.querySelector('.grid').innerHTML = output;

            } else {
                output = '';  //todo print "opps we couldn't find that. Try another one!"
            }
 
        })
    }






}



