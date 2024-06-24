let bandera = false
let pagina = 1
let busqueda = ""

//Consumir API-Rest de Series
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
    fetch(`https://api.themoviedb.org/3/search/tv?query=${busqueda}&include_adult=false&language=es-ES&page=${pagina}`,key)
    .then(response => response.json())
    .then(responseTransform => {
        console.log(responseTransform);  
        let series = responseTransform.results;
        const divPopular = document.querySelector('#popular-list');
        series.forEach(serie => {
            if (serie.overview == "") {
                serie.overview = "Accusamus numquam eos debitis quod deleniti sed delectus ipsam quaerat saepe soluta veritatis excepturi libero atque porro assumenda repellat ab dolor, corporis unde? Quibusdam dolor eveniet molestias? Molestiae, sunt accusantium! Sed ipsum atque magni temporibus aliquid laboriosam deserunt vel. Nulla quidem, blanditiis ipsam, corrupti similique eius eum dicta, numquam adipisci saepe voluptatem explicabo accusamus. Porro sapiente impedit similique nulla voluptatibus.Tenetur velit adipisci nobis sequi, quis ullam necessitatibus nesciunt consequuntur eum non molestiae quaerat, iusto nihil quo soluta unde at ea debitis deserunt voluptatibus id commodi magnam culpa ut. Iste?"
            }
            if (serie.poster_path == null) {
                var origen = "../img/imageNotFound.jpg"
            }
            else {
                var origen = `https://image.tmdb.org/t/p/w500/${serie.poster_path}`
            }
            const tarjeta = `
                <div class="card">
                    <a href="serie_details.html?id=${serie.id}"><img src="${origen}" class="card-img-top" alt="${serie.name}">
                        <div class="card-body">
                            <p class="card-text">${serie.name}</p>
                        </div>
                        <div class="overlay">
                        <p class="overlay-text"><b>Sinopsis:</b><br>${serie.overview}</p>
                        <p><b>Rating: ${serie.vote_average}</b></p>
                        </div>
                        </a>
                </div>
            `;
            divPopular.insertAdjacentHTML('beforeend',tarjeta);
        });
        
    })
    .catch(error => console.error(error));
}   

const fetchSeries = (page) => {
    fetch(`https://api.themoviedb.org/3/tv/popular?language=es-ES&page=${page}`,key)
    .then(response => response.json())
    .then(responseTransform => {
        console.log(responseTransform);  
        let series = responseTransform.results;
        const divPopular = document.querySelector('#popular-list');
        series.forEach(serie => {
            if (serie.overview == "") {
                serie.overview = "Accusamus numquam eos debitis quod deleniti sed delectus ipsam quaerat saepe soluta veritatis excepturi libero atque porro assumenda repellat ab dolor, corporis unde? Quibusdam dolor eveniet molestias? Molestiae, sunt accusantium! Sed ipsum atque magni temporibus aliquid laboriosam deserunt vel. Nulla quidem, blanditiis ipsam, corrupti similique eius eum dicta, numquam adipisci saepe voluptatem explicabo accusamus. Porro sapiente impedit similique nulla voluptatibus.Tenetur velit adipisci nobis sequi, quis ullam necessitatibus nesciunt consequuntur eum non molestiae quaerat, iusto nihil quo soluta unde at ea debitis deserunt voluptatibus id commodi magnam culpa ut. Iste?"
            }
            if (serie.poster_path == null) {
                var origen = "../img/imageNotFound.jpg"
            }
            else {
                var origen = `https://image.tmdb.org/t/p/w500/${serie.poster_path}`
            }
            const tarjeta = `
                <div class="card">
                    <a href="serie_details.html?id=${serie.id}"><img src="${origen}" class="card-img-top" alt="${serie.name}">
                        <div class="card-body">
                            <p class="card-text">${serie.name}</p>
                        </div>
                        <div class="overlay">
                        <p class="overlay-text"><b>Sinopsis:</b><br>${serie.overview}</p>
                        <p><b>Rating: ${serie.vote_average}</b></p>
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
        fetchSeries(pagina);   
    }


})

// FUNCION PARA CARGAR MAS TARJETAS AL HACER SCROLL ()
// window.onscroll = function(){
//     if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight){
//         pagina ++;
//         fetchSeries(pagina);
//     }
// }


fetchSeries(pagina)

