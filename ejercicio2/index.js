console.log('Happy developing ✨')

const personas = [{
    "nombre":"Noon",
    "edad":6,
    "aficiones":["Deporte","Lectura","Viajar", "juegos"],
    "emancipado":true
    },
    {
    "nombre":"Dori",
    "edad":16,
    "aficiones":["Juegos","Lectura","dormir"],
    "emancipado":false
}]

document.addEventListener('DOMContentLoaded', () => {
    const mostrar = document.getElementById('mostrar');
    personas.forEach((person) => {
        generarFormulario(person)
    })

    function generarFormulario(objeto) {
        mostrar.innerHTML += `    <form>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" value="${objeto.nombre}"> <br>

        <label for="edad">Edad:</label>
        <input type="number" id="edad" value="${objeto.edad}"> <br>

        <label for="aficiones">Aficiones:</label>
        ${mostrarAficiones(objeto.aficiones)}<br>
        <label for="emancipado">Emancipado</label>
        <input id="emancipado" type="checkbox" ${objeto.emancipado ? "checked" : ""}><br>
        <button type="submit">Enviar</button>
    </form> </br>`
    }
});

function mostrarAficiones(aficiones) {
    let aficionesConFormato = "";
    aficiones.forEach(aficion => {
        aficionesConFormato += `<button id="${aficion}" type="button">${aficion}</button>`
    });
    return aficionesConFormato;
}
