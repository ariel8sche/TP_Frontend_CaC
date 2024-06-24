
//Convierte los parametros GET de la URL en un objeto
let queryStrings = new URLSearchParams(window.location.search);
let url = Object.fromEntries(queryStrings.entries());

//Consumir API-Rest de Series
const key = {
    method: 'GET',
    headers :{
        accept: 'application/json',
        Authorization: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
    }
}

const fetchDetalles = () => {
    fetch(`https://api.themoviedb.org/3/movie/${url.id}?language=es-ES`,key)
    .then(response => response.json())
    .then(responseTransform => {
        let pelicula = responseTransform;
        console.log(pelicula);
        if (pelicula.overview == "") { //Para no dejar las sinopsis vacias
            pelicula.overview = "Accusamus numquam eos debitis quod deleniti sed delectus ipsam quaerat saepe soluta veritatis excepturi libero atque porro assumenda repellat ab dolor, corporis unde? Quibusdam dolor eveniet molestias? Molestiae, sunt accusantium! Sed ipsum atque magni temporibus aliquid laboriosam deserunt vel. Nulla quidem, blanditiis ipsam, corrupti similique eius eum dicta, numquam adipisci saepe voluptatem explicabo accusamus. Porro sapiente impedit similique nulla voluptatibus.Tenetur velit adipisci nobis sequi, quis ullam necessitatibus nesciunt consequuntur eum non molestiae quaerat, iusto nihil quo soluta unde at ea debitis deserunt voluptatibus id commodi magnam culpa ut. Iste?"
        }
        if (pelicula.poster_path == null) {
            var origen = "../img/imageNotFound.jpg"
        }
        else {
            var origen = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`
        }
        const generos = pelicula.genres.map(genero => genero.name) //para extraer los objetos del array
        const lanzamiento = new Date(pelicula.release_date)
        const divDetalles = document.querySelector('#detalles');
        const tarjeta = `
                <img src="${origen}" alt="${pelicula.title}" >
                <div class="serie_flex">
                    <h2>${pelicula.title}</h2>
                    <p><i><b>${pelicula.tagline}</b></i></p>
                    <div class="overview"><b>Sinopsis:</b><br>${pelicula.overview}</div>
                    <div class="detalles-flex"> 
                        <div><a href="https://www.imdb.com/title/${pelicula.imdb_id}" target="_blank"><svg class="logo_imdb" height="25" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fill-rule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg></a></div>
                        <p><b>Título original:</b> ${pelicula.original_title}</p>
                        <p><b>Rating:</b> ${pelicula.vote_average} (${pelicula.vote_count} votos)</p>
                        <p><b>Lanzamiento:</b> ${lanzamiento.getFullYear()}</p>
                        <p><b>Géneros:</b> ${generos.join(', ')}</p>
                    </div>
                </div>
            `;
            divDetalles.insertAdjacentHTML('beforeend',tarjeta);
        const fondo = document.querySelector('#main_detalles')
        fondo.setAttribute ("style", `background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),url(https://image.tmdb.org/t/p/w500/${pelicula.backdrop_path});background-size: cover`)
        ;
    })
    .catch(error => console.error(error));
}

const fetchSimilares = () => {
    fetch(`https://api.themoviedb.org/3/movie/${url.id}/similar?language=es-ES`,key)
    .then(response => response.json())
    .then(responseTransform => {
        let similares = responseTransform.results;
        const asideSimilar = document.querySelector('#similares');
        for (let i=0; i<6; i++){
            if (similares[i].poster_path == null) {
                var origen = "../img/imageNotFound.jpg"
            }
            else {
                var origen = `https://image.tmdb.org/t/p/w500/${similares[i].poster_path}`

            }
            const tarjeta = `
                <div class="card-similares">
                    <a href="movie_details.html?id=${similares[i].id}">
                        <img src="${origen}" alt="${similares[i].title}">
                        <div class="overlay-similares">
                            <p class="overlay-text">${similares[i].title}</p>
                            <p class="overlay-text"><b>${similares[i].vote_average}</b></p>
                        </div>
                    </a>
                </div>`;
                asideSimilar.insertAdjacentHTML('beforeend',tarjeta);
                }
        const titulo = '<h4>Películas similares</h4>'
        asideSimilar.insertAdjacentHTML('beforebegin',titulo);
        })
        
        
    .catch(error => console.error(error));
}

fetchDetalles()
fetchSimilares()