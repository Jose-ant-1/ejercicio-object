console.log('Happy developing ✨')

const person = [{
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

const tiposVariable = {
    "string": "text",
    "number": "number",
    "boolean": "checkbox"
};

document.addEventListener('DOMContentLoaded', () => {
    const mostrar = document.getElementById('mostrar');
    person.forEach((person) => {
        generarFormulario(person)
    })

    function comprobarTipo(formatoAComprobar) {
        return tiposVariable[formatoAComprobar] || "text";

    }

    function generarFormulario(objeto) {
        mostrar.innerHTML += `    <form>
        <label for="nombre">Nombre:</label>
        <input type="${comprobarTipo(typeof objeto.nombre)}" id="nombre" value="${Object.values(objeto)[0]}"> <br>

        <label for="edad">Edad:</label>
        <input type="${comprobarTipo(typeof objeto.edad)}" id="edad" value="${Object.values(objeto)[1]}"> <br>

        <label for="aficiones">Aficiones:</label>
        ${mostrarAficiones(objeto.aficiones)}<br>
        <label for="emancipado">Emancipado</label>
        <input id="emancipado" type="${comprobarTipo(typeof objeto.emancipado)}" ${Object.values(objeto)[3] ? "checked" : ""}><br>
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
