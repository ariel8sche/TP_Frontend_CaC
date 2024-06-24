let bandera = false
let pagina = 1
let busqueda = ""

//Consumir API-Rest de peliculas
const key = {
    method: 'GET',
    headers :{
        accept: 'application/json',
        Authorization: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
    }
}

//Buscar presionando la tecla Enter en el input
document.querySelector('#buscarSeries')
    .addEventListener("keyup", function(k) {
        if (k.keyCode === 13) {
            document.querySelector("#botonBuscar").click();
        }
    });

//buscar presionando el icono de busqueda
document.querySelector('#botonBuscar')
    .addEventListener('click',function(){
        busqueda = document.querySelector('#buscarSeries').value
        console.log(busqueda);
        pagina = 1
        const divPopular = document.querySelector('#popular-list');
        divPopular.innerHTML = ""
        fetchBusqueda(busqueda,pagina)
        console.log(pagina);
        bandera = true
})



const fetchBusqueda = (busqueda,pagina) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${busqueda}&include_adult=false&language=es-ES&page=${pagina}`,key)
    .then(response => response.json())
    .then(responseTransform => {
        console.log(responseTransform);  
        let movies = responseTransform.results;
        const divPopular = document.querySelector('#popular-list');
        movies.forEach(movie => {
            if (movie.overview == "") {
                movie.overview = "Accusamus numquam eos debitis quod deleniti sed delectus ipsam quaerat saepe soluta veritatis excepturi libero atque porro assumenda repellat ab dolor, corporis unde? Quibusdam dolor eveniet molestias? Molestiae, sunt accusantium! Sed ipsum atque magni temporibus aliquid laboriosam deserunt vel. Nulla quidem, blanditiis ipsam, corrupti similique eius eum dicta, numquam adipisci saepe voluptatem explicabo accusamus. Porro sapiente impedit similique nulla voluptatibus.Tenetur velit adipisci nobis sequi, quis ullam necessitatibus nesciunt consequuntur eum non molestiae quaerat, iusto nihil quo soluta unde at ea debitis deserunt voluptatibus id commodi magnam culpa ut. Iste?"
            }
            if (movie.poster_path == null) {
                var origen = "../img/imageNotFound.jpg"
            }
            else {
                var origen = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            }
            const tarjeta = `
                <div class="card">
                    <a href="movie_details.html?id=${movie.id}"><img src="${origen}" class="card-img-top" alt="${movie.title}">
                        <div class="card-body">
                            <p class="card-text">${movie.title}</p>
                        </div>
                        <div class="overlay">
                        <p class="overlay-text"><b>Sinopsis:</b><br>${movie.overview}</p>
                        <p><b>Rating: ${movie.vote_average}</b></p>
                        </div>
                        </a>
                </div>
            `;
            divPopular.insertAdjacentHTML('beforeend',tarjeta);
        });
        
    })
    .catch(error => console.error(error));
}

const fetchPeliculas  = (page) => {
    fetch(`https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${page}`,key)
    .then(response => response.json())
    .then(responseTransform => {
        console.log(responseTransform);  
        let peliculas = responseTransform.results;
        const divPopular = document.querySelector('#popular-list');
        peliculas.forEach(pelicula => {
            if (pelicula.overview == "") {
                pelicula.overview = "Accusamus numquam eos debitis quod deleniti sed delectus ipsam quaerat saepe soluta veritatis excepturi libero atque porro assumenda repellat ab dolor, corporis unde? Quibusdam dolor eveniet molestias? Molestiae, sunt accusantium! Sed ipsum atque magni temporibus aliquid laboriosam deserunt vel. Nulla quidem, blanditiis ipsam, corrupti similique eius eum dicta, numquam adipisci saepe voluptatem explicabo accusamus. Porro sapiente impedit similique nulla voluptatibus.Tenetur velit adipisci nobis sequi, quis ullam necessitatibus nesciunt consequuntur eum non molestiae quaerat, iusto nihil quo soluta unde at ea debitis deserunt voluptatibus id commodi magnam culpa ut. Iste?"
            }
            if (pelicula.poster_path == null) {
                var origen = "../img/imageNotFound.jpg"
            }
            else {
                var origen = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`
            }
            const tarjeta = `
                <div class="card" >
                    <a href="movie_details.html?id=${pelicula.id}"><img src="${origen}" class="card-img-top" alt="${pelicula.title}">
                        <div class="card-body">
                            <p class="card-text">${pelicula.title}</p>
                        </div>
                        <div class="overlay">
                            <p class="overlay-text"><b>Sinopsis:</b><br>${pelicula.overview}</p>
                            <p><b>Rating: ${pelicula.vote_average}</b></p>
                        </div>
                    </a>
                </div>
            `;
            divPopular.insertAdjacentHTML('beforeend',tarjeta);
        });
        
    })
    .catch(error => console.error(error));
}

let boton_siguiente = document.querySelector('#boton_siguiente')
boton_siguiente.addEventListener('click',function(){
    pagina ++
    if (bandera) {
        fetchBusqueda(busqueda,pagina)
    } else {
        fetchPeliculas(pagina);
    }


})
fetchPeliculas(pagina)
