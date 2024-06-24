const key = {
    method: 'GET',
    headers :{
        accept: 'application/json',
        Authorization: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
    }
}

const fetchPeliculas  = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&language=es-ES&page=1&sort_by=vote_count.desc`,key)
    .then(response => response.json())
    .then(responseTransform => {
        let peliculas = responseTransform.results;
        const divPopular = document.querySelector('#peliculas_destacadas');
        peliculas.forEach(pelicula => {
            const tarjeta = `
                <div class="card" >
                    <a href="/pages/movie_details.html?id=${pelicula.id}"><img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="card-img-top" alt="${pelicula.title}">
                        <div class="card-body">
                            <p class="card-text">${pelicula.title}</p>
                        </div>
                        <div class="overlay">
                            <p class="overlay-text"><b>Sinopsis:</b><br>${pelicula.overview}</p>
                            <p class="overlay-text">Rating:<b> ${pelicula.vote_average}</b></p>
                        </div>
                    </a>
                </div>
            `;
            divPopular.insertAdjacentHTML('beforeend',tarjeta);
            });
//        const backgroundMovies = document.querySelector('.peliculas');
//        backgroundMovies.setAttribute ("style", `background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)),url(https://image.tmdb.org/t/p/w500/${peliculas[Math.floor(Math.random()*19)].backdrop_path});background-size: 1920px;background-repeat: no-repeat;`)
    })
    .catch(error => console.error(error));
}

fetchPeliculas()



const fetchSeries = () => {
    fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=es-ES&page=1&sort_by=vote_count.desc`,key)
    .then(response => response.json())
    .then(responseTransform => {
        console.log(responseTransform);  
        let series = responseTransform.results;
        const divPopular = document.querySelector('#series_destacadas');
        series.forEach(serie => {
            const tarjeta = `
                <div class="card" >
                    <a href="/pages/serie_details.html?id=${serie.id}"><img src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" class="card-img-top" alt="${serie.title}">
                        <div class="card-body">
                            <p class="card-text">${serie.name}</p>
                            </div>
                            <div class="overlay">
                            <p class="overlay-text"><b>Sinopsis:</b><br>${serie.overview}</p>
                            <p class="overlay-text">Rating: <b>${serie.vote_average}</b></p>
                        </div>
                    </a>
                </div>
            `;
            divPopular.insertAdjacentHTML('beforeend',tarjeta);
        });
        
    })
    .catch(error => console.error(error));
}

fetchSeries()