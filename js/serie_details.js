
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
    fetch(`https://api.themoviedb.org/3/tv/${url.id}?language=es-ES`,key)
    .then(response => response.json())
    .then(responseTransform => {
        let serie = responseTransform;
        console.log(serie);
        if (serie.overview == "") { //Para no dejar las sinopsis vacias
            serie.overview = "Accusamus numquam eos debitis quod deleniti sed delectus ipsam quaerat saepe soluta veritatis excepturi libero atque porro assumenda repellat ab dolor, corporis unde? Quibusdam dolor eveniet molestias? Molestiae, sunt accusantium! Sed ipsum atque magni temporibus aliquid laboriosam deserunt vel. Nulla quidem, blanditiis ipsam, corrupti similique eius eum dicta, numquam adipisci saepe voluptatem explicabo accusamus. Porro sapiente impedit similique nulla voluptatibus.Tenetur velit adipisci nobis sequi, quis ullam necessitatibus nesciunt consequuntur eum non molestiae quaerat, iusto nihil quo soluta unde at ea debitis deserunt voluptatibus id commodi magnam culpa ut. Iste?"
        }
        if (serie.poster_path == null) {
            var origen = "../img/imageNotFound.jpg"
        }
        else {
            var origen = `https://image.tmdb.org/t/p/w500/${serie.poster_path}`
        }
        const generos = serie.genres.map(genero => genero.name) //para extraer los objetoss del array
        const plataformas = serie.networks.map(plataforma => plataforma.name)
        const lanzamiento = new Date(serie.first_air_date)
        const divDetalles = document.querySelector('#detalles');
        const tarjeta = `
                <img src="${origen}" alt="${serie.name}" >
                <div class="serie_flex">
                    <h2>${serie.name}</h2>
                    <p><i><b>${serie.tagline}</b></i></p>
                    <div class="overview"><b>Sinopsis:</b><br>${serie.overview}</div>
                    <div class="detalles-flex"> 
                        <p><b>Título original:</b> ${serie.original_name}</p>    
                        <p><b>Rating:</b> ${serie.vote_average} (${serie.vote_count} votos)</p>
                        <p><b>Lanzamiento:</b> ${lanzamiento.getFullYear()}</p>
                        <div class="url"><b>Géneros:</b> ${generos.join(', ')}</div>
                        <p><b>Plataforma:</b> ${plataformas.join(', ')}</p>
                        <div class="url"><b>Sitio oficial: </b><a href="${serie.homepage}" target=_blank>${serie.homepage}</a></div>
                    </div>
                </div>
            `;
            divDetalles.insertAdjacentHTML('beforeend',tarjeta);
        const fondo = document.querySelector('#main_detalles')
        fondo.setAttribute ("style", `background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),url(https://image.tmdb.org/t/p/w500/${serie.backdrop_path});background-size: cover`)
        ;
    })
    .catch(error => console.error(error));
}

const fetchSimilares = () => {
    fetch(`https://api.themoviedb.org/3/tv/${url.id}/similar?language=es-ES`,key)
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
                    <a href="serie_details.html?id=${similares[i].id}">
                        <img src="${origen}" alt="${similares[i].name}">
                        <div class="overlay-similares">
                            <p class="overlay-text">${similares[i].name}</p>
                            <p class="overlay-text"><b>${similares[i].vote_average}</b></p>
                        </div>
                    </a>
                </div>`;
                asideSimilar.insertAdjacentHTML('beforeend',tarjeta);
                }
        const titulo = '<h4>Series similares</h4>'
        asideSimilar.insertAdjacentHTML('beforebegin',titulo);
        })
        
        
    .catch(error => console.error(error));
}

fetchDetalles()
fetchSimilares()