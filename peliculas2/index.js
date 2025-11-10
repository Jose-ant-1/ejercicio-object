import { pelis } from "./filmList.js";
import { countries } from "./filtrospelis.js";
import { genders } from "./filtrospelis.js";

function filtrarPorTitulo(listaAFiltrar, tituloABuscar) {
    return listaAFiltrar.filter(p => p.Title.toLowerCase().includes(tituloABuscar.toLowerCase()));
}

function filtrarPorDirector(listaAFiltrar, DirectorABuscar) {
    return listaAFiltrar.filter(p => p.Director.toLowerCase().includes(DirectorABuscar.toLowerCase()));
}

function filtrarPorActor(listaAFiltrar, ActorABuscar) {
    return listaAFiltrar.filter(p => p.Actors.toLowerCase().includes(ActorABuscar.toLowerCase()));
}

function mostrarGeneros() {
    const pelisOrdenadas = [...genders].sort((a, b) => a.localeCompare(b));
    return `
        <div>
            Géneros:<br>
            <input type="checkbox" id="todosGeneros"><label for="todosGeneros">Todos</label>
            ${pelisOrdenadas.map(gender => `
                <input id="${gender}" name="generos" value="${gender}" type="checkbox">
                <label for="${gender}">${gender}</label>`).join("")}
        </div>`;
}

function mostrarPaises() {
    return `
    <div>
    <select name="pais" id="pais">
        <option value="todosPaises">Todos los paises</option>
        ${countries.map(country =>
        `<option value="${country}">${country}</option>`).join('')}
    
    </select> 
    </div>
    `;
}

function mostrarPelis(listaAMostrar) {
    if (listaAMostrar.length < 0) return `<p>No se encontraron películas</p>`;
    return `
        ${listaAMostrar.map(peli => 
            `
                <div>
                    <p>
                        <b>Titulo:</b> ${peli.Title} <br>
                        <b>Director:</b> ${peli.Director}<br>
                        <b>Actores:</b> ${peli.Actors}<br>
                        <b>Géneros:</b> ${peli.Genre}<br>
                        <b>Lugares de Rodaje:</b> ${peli.Country}<br>                
                    </p>
                </div>
            `).join('')}
    `;

}

function mostrarBoton() {
    return `
        <button id="btnBuscar" type="button">Buscar</button>
    `;
}

function cargarMenu() {
    return mostrarPaises() + mostrarGeneros() + mostrarBoton();
}

function mostrarMenu() {

    // Inicializamos la lógica de los checkbox de géneros
    function comprobarCheckBoxGeneros() {
        const todos = document.getElementById("todosGeneros");
        const generos = [...(document.querySelectorAll('input[name="generos"]'))];

        todos.addEventListener("change", () => {
            generos.forEach(g => g.checked = todos.checked);
        });

        generos.forEach(g => {
            g.addEventListener("change", () => {
                todos.checked = generos.every(x => x.checked);
            });
        });
    }

    // Seleccionamos el contenedor donde vamos a mostrar todo
    const mostrar = document.getElementById("mostrar");
    // Insertamos el HTML del menú y las películas
    mostrar.innerHTML = cargarMenu() + mostrarPelis(pelis);

    comprobarCheckBoxGeneros();

    // Inicializamos el listener del botón de buscar
    const btn = document.getElementById("btnBuscar");
    btn.addEventListener("click", buscarPelicula);

}

function buscarPelicula() {

    const buscar = document.getElementById("buscar").value.trim().toLowerCase();
    const titulo = document.getElementById("titulo").checked;
    const director = document.getElementById("director").checked;
    const actor = document.getElementById("actor").checked;
    const pais = document.getElementById("pais").value;
    const todosGeneros = document.getElementById("todosGeneros")?.checked;

    const generosSeleccionados = Array.from(document.querySelectorAll("input[name=generos]:checked")).map(g=>g.value);

    let resultado = [];

    if (titulo) resultado.push(...filtrarPorTitulo(pelis, titulo));
    if (director) resultado.push(...filtrarPorDirector(pelis, director));
    if (actor) resultado.push(...filtrarPorActor(pelis, actor));

    if (!buscar) resultado = [...pelis];



}



document.addEventListener("DOMContentLoaded", () => {
    mostrarMenu()
})
