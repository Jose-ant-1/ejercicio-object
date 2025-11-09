import { pelis } from "./data/film.js";
import { countries } from "./data/filtrospelis.js";
import { genders } from "./data/filtrospelis.js";

// FILTROS

function filtrarPorTitulo(lista, texto) {
    return lista.filter(p => p.Title.toLowerCase().includes(texto.toLowerCase()));
}

function filtrarPorDirector(lista, texto) {
    return lista.filter(p => p.Director.toLowerCase().includes(texto.toLowerCase()));
}

function filtrarPorActores(lista, texto) {
    return lista.filter(p => p.Actors.toLowerCase().includes(texto.toLowerCase()));
}

function filtrarPorPaises(lista, pais) {
    if (pais === "todos") return lista;
    return lista.filter(p => {
        const paises = Array.isArray(p.Country) ? p.Country.join(" ") : p.Country;
        return paises.toLowerCase().includes(pais.toLowerCase());
    });
}

// HACER HTML

function mostrarMenu() {
    return generarFiltroPais() + generarCheckBoxGeneros() + generarBoton();
}

function generarFiltroPais() {
    return `
        <div>
            País de rodaje:
            <br>
            <select id="ciudad">
                <option value="todos">Todos los países</option>
                ${countries.map(pais => `<option value="${pais}">${pais}</option>`).join("")}
            </select>
        </div>`;
}

function generarCheckBoxGeneros() {
    const generosOrdenados = [...genders].sort((a, b) => a.localeCompare(b));
    return `
        <div>
            Géneros:<br>
            <input type="checkbox" id="todosGeneros"><label for="todosGeneros">Todos</label>
            ${generosOrdenados.map(gender => `
                <input id="${gender}" name="generos" value="${gender}" type="checkbox">
                <label for="${gender}">${gender}</label>`).join("")}
        </div>`;
}

function generarBoton() {
    return `<button id="btnBuscar" type="button">Buscar</button>`;
}

function mostrarPeliculas(lista) {
    if (lista.length === 0) return `<p>No se encontraron películas.</p>`;
    return lista.map(p => `
        <div class="pelicula">
            <p><strong>${p.Title}</strong></p>
            <p>${p.Genre}</p>
            <p>${p.Director}</p>
        </div>`).join("");
}

function cargarMenu(lista) {

    function comprobarCheckBoxGeneros() {
        const todos = document.getElementById("todosGeneros");
        const generos = Array.from(document.querySelectorAll('input[name="generos"]'));

        if (!todos || generos.length === 0) return;

        todos.addEventListener('change', () => {
            generos.forEach(genero => genero.checked = todos.checked);
        });

        generos.forEach(genero => {
            genero.addEventListener("change", () => {
                const todosMarcados = generos.every(x => x.checked);
                todos.checked = todosMarcados;
            });
        })

    }

    const mostrar = document.getElementById("mostrar");
    mostrar.innerHTML = mostrarMenu() + mostrarPeliculas(lista);

    const btn = document.getElementById("btnBuscar");
    btn.addEventListener("click", buscarPelicula);

    comprobarCheckBoxGeneros();

}

// FILTRAR

function buscarPelicula() {
    const texto = document.getElementById("buscar").value.trim().toLowerCase();

    const buscarPorTitulo = document.getElementById("titulo")?.checked;
    const buscarPorDirector = document.getElementById("director")?.checked;
    const buscarPorActor = document.getElementById("actor")?.checked;
    const paisSeleccionado = document.getElementById("ciudad").value;

    const todosGeneros = document.getElementById("todosGeneros")?.checked;
    // Sólo los checkboxes marcados
    const generosSeleccionados = Array.from(document.querySelectorAll('input[name="generos"]:checked'))
        .map(g => g.value);

    let resultados = [];

    if (buscarPorTitulo) resultados.push(...filtrarPorTitulo(pelis, texto));
    if (buscarPorDirector) resultados.push(...filtrarPorDirector(pelis, texto));
    if (buscarPorActor) resultados.push(...filtrarPorActores(pelis, texto));

    // Si no hay texto, mostramos todas las pelis (base completa)
    if (!texto) resultados = [...pelis];

    // Quitar duplicados por título
    const unicos = Array.from(new Set(resultados.map(p => p.Title)))
        .map(t => resultados.find(p => p.Title === t));

    // Filtro por país (aplica sobre los únicos)
    let filtrados = filtrarPorPaises(unicos, paisSeleccionado);

    // Filtro por géneros: si NO está "Todos" y hay géneros seleccionados
    if (!todosGeneros && generosSeleccionados.length > 0) {
        filtrados = filtrados.filter(p => {
            const generosPeli = p.Genre.toLowerCase();
            // coincide si la película contiene al menos uno de los géneros seleccionados
            return generosSeleccionados.some(g => generosPeli.includes(g.toLowerCase()));
        });
    }

    // Finalmente recargamos menú y resultados
    cargarMenu(filtrados);
}


document.addEventListener("DOMContentLoaded", () => {
    cargarMenu(pelis);
});
