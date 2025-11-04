import { pelis } from "./data/film.js";
import { countries } from "./data/filtrospelis.js";
import { genders } from "./data/filtrospelis.js";

function filtrarPorNombre(listaAFiltrar, nombre) {
    return listaAFiltrar.filter((pelicula) => pelicula.Title.toLowerCase().includes(nombre.toLowerCase()));
}

function filtrarPorDirector(listaAFiltrar, director) {
    return listaAFiltrar.filter((pelicula) => pelicula.Director.toLowerCase().includes(director.toLowerCase()));
}

function filtrarPorActores(listaAFiltrar, actorABuscar) {
    return listaAFiltrar.filter((pelicula) => pelicula.Actors.toLowerCase().includes(actorABuscar.toLowerCase()));
}

//console.log(filtrarPorNombre(pelis, "e"))
//console.log(filtrarPorDirector(pelis, "N/A"))
//console.log(filtrarPorActores(pelis, "j"));

function filtrarPorGeneros(listaAFiltrar, generosABuscar) {
    const generos = generosABuscar.toLowerCase().split(",").map(g => g.trim());
    let i = 0;
    return listaAFiltrar.filter(pelicula => {
        const generoPelicula = pelicula.Genre.toLowerCase();

        // Recorremos todos los géneros buscados
        for (let i = 0; i < generos.length; i++) {
            if (generoPelicula.includes(generos[i])) {
                return true; // basta con que uno coincida → condición OR
            }
        }
        return false; // si ninguno coincide
    });

}

//console.log(filtrarPorGeneros(pelis, "Horror,                                Sci-Fi"));

function filtrarPorPaises(listaAFiltrar, paisABuscar) {
    return listaAFiltrar.filter((pelicula) => {
        const paises = pelicula.Country.join(" ");
        return paises.toLowerCase().includes(paisABuscar.toLowerCase());

    });
}

console.log(filtrarPorPaises(pelis,"uk").map(p => p.Title))




