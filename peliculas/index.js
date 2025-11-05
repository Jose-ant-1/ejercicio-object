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

function filtrarPorPaises(listaAFiltrar, paisABuscar) {
    return listaAFiltrar.filter((pelicula) => {
        const paises = pelicula.Country.join(" ");
        return paises.toLowerCase().includes(paisABuscar.toLowerCase());

    });
}


document.addEventListener("DOMContentLoaded", () => {
    const mostrar = document.getElementById("mostrar");
    // el filtro de pais
    mostrar.innerHTML += generarFiltroPais();
    // los checkBox de los géneros
    mostrar.innerHTML += generarCheckBoxGeneros();
    // y el botón de búsqueda
    mostrar.innerHTML += generarBoton();
    // también mostramos todas las películas antes de empezar el filtrado
    mostrar.innerHTML += mostrarPeliculas(pelis)

    const btnBuscar = document.getElementById("btnBuscar");
    /*
    btnBuscar.addEventListener("click", buscarPelicula);

    function buscarPelicula() {
        const texto = document.getElementById("buscar").value.trim().toLowerCase();

        const buscarPorTitulo = document.getElementById("titulo").checked;
        const buscarPorDirector = document.getElementById("director").checked;
        const buscarPorActor = document.getElementById("actor").checked;

        let resultado = [];

        if (buscarPorTitulo) {
            resultado.push(...filtrarPorTitulo(pelis,texto));
        }
        if (buscarPorDirector) {
            resultado.push(...filtrarPorDirector(pelis,texto));
        }
        if (buscarPorActor) {
            resultado.push(...filtrarPorActores(pelis,texto));
        }
        mostrar.innerHTML = generarFiltroPais() + generarCheckBoxGeneros() + generarBoton();

        mostrar.innerHTML += mostrarPeliculas(resultado);

        document.getElementById("btnBuscar").addEventListener("click", buscarPelicula);
    }
*/
});

function buscarPelicula() {
    const texto = document.getElementById("buscar").value.trim().toLowerCase();

    const buscarPorTitulo = document.getElementById("titulo").checked;
    const buscarPorDirector = document.getElementById("director").checked;
    const buscarPorActor = document.getElementById("actor").checked;

    let resultados = [];

    // Si no hay texto → mostrar todas
    if (!texto) {
        document.getElementById("mostrar").innerHTML =
            generarFiltroPais() +
            generarCheckBoxGeneros() +
            generarBoton() +
            mostrarTodasLasPeliculas(pelis);
        return;
    }

    // Filtramos según los checkboxes seleccionados
    if (buscarPorTitulo) {
        resultados.push(...filtrarPorNombre(pelis, texto));
    }
    if (buscarPorDirector) {
        resultados.push(...filtrarPorDirector(pelis, texto));
    }
    if (buscarPorActor) {
        resultados.push(...filtrarPorActores(pelis, texto));
    }

    // Mostrar resultados
    const mostrar = document.getElementById("mostrar");
    mostrar.innerHTML =
        generarFiltroPais() +
        generarCheckBoxGeneros() +
        generarBoton();

    if (unicos.length > 0) {
        mostrar.innerHTML += mostrarTodasLasPeliculas(unicos);
    } else {
        mostrar.innerHTML += `<p>No se encontraron películas.</p>`;
    }
}


function generarFiltroPais() {
    return `
            <div>
            Pais de rodaje:
            <br>
            <select name="ciudad" id="ciudad">
                <option value="todos">Todos los paises</option>
                    ${countries.map(pais => {
                        return `<option value="${pais}">${pais}</option>`;
                        }).join("")
                    }
            </select>  
        </div>
    `;
}



function generarCheckBoxGeneros() {
    return `        
        <div>
            Géneros:<br>
            <input type="checkbox" value="todosGeneros" id="todosGeneros" name="todosGeneros"><label for="todosGeneros">Todos</label>
            ${genders.map(gender =>
                `<input id="${gender}" name="${gender}" value="${gender}" type="checkbox">
                 <label for="${gender}">${gender}</label>`).
            join("")
                }       
        </div>`;
}

function mostrarPeliculas(listaAMostrar) {
    return listaAMostrar.map(pelicula => `
          <div class="pelicula">
            <p><strong>${pelicula.Title}</strong></p>
            <p>${pelicula.Genre}</p>
            <p>${pelicula.Director}</p>
          </div>
    `)
        .join('');
}

function generarBoton() {
    return `<button type="button" onclick="buscarPelicula()">Buscar</button>`;
}




