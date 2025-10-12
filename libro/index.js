console.log('Happy developing ✨')

const libros = [{
    "titulo": "El Código Da Vinci",
    "genero": "suspense",
    "autor": ["Dan Brown"],
    "paginas": 400,
    "fechaPublicacion": 2003
},{
    "titulo": "Los Pilares de la Tierra",
    "genero": "misterio",
    "autor": ["Ken Follet"],
    "paginas": 800,
    "fechaPublicacion": 1989
},{
    "titulo": "Un mundo sin fin",
    "genero": "historico",
    "autor": ["Ken Follet"],
    "paginas": 1200,
    "fechaPublicacion": 2007
},{
    "titulo": "El cabo de NuncaMuertos",
    "genero": "Terror",
    "autor": ["Adan Fidgeral", "Carolina Diaz"],
    "paginas": 900,
    "fechaPublicacion": 2017
}];

// mostrar libros con más de 600 páginas
libros.forEach((libro) => {
    libro.paginas > 600 ? console.log("libro: " + libro.titulo + " - paginas: " + libro.paginas) : "";
});

//mostrar libros publicados hace más de 20 años
libros.forEach(libro => {
    new Date().getFullYear() - libro.fechaPublicacion > 20 ? console.log(`Libro: ${libro.titulo} - año ${libro.fechaPublicacion}`) : "";
})

//libros con un unico autor
libros.forEach(libro => {
    libro.autor.length === 1 ? console.log("libro: " + libro.titulo + " - autor: " + libro.autor) : "";
});

//lista con nombres de autores y numero de libros que ha escrito
let librosAutores = [];
for (let i = 0; i < libros.length; i++) {
    let libro = libros[i];
    for (let j = 0; j < libro.autor.length; j++) {
        let autor = libro.autor[j];

        let autorExistente = librosAutores.find(a=> a.autor === autor);

        if (autorExistente) {
            autorExistente.cantidadLibros++;
        } else {
            librosAutores.push({
                autor: autor,
                cantidadLibros: 1
            });
        }
    }
}
console.log(librosAutores)


document.addEventListener("DOMContentLoaded", function() {
    // Construimos todo el HTML directamente
    document.getElementById("mostrar").innerHTML = `
    <h2>Lista de Libros</h2>
    <label for="ordenar">Ordenar por: </label>
    <select id="ordenar" onchange="ordenarLibros(this.value)">
      <option value="titulo">Título</option>
      <option value="genero">Género</option>
      <option value="fechaPublicacion">Fecha de publicación</option>
    </select>
    <table border="1" id="tabla">
      <tr>
        <th>Título</th>
        <th>Género</th>
        <th>Fecha de publicación</th>
      </tr>
      ${libros.map(libro => `
        <tr>
          <td>${libro.titulo}</td>
          <td>${libro.genero}</td>
          <td>${libro.fechaPublicacion}</td>
        </tr>
      `).join('')}
    </table>
  `;
});

// Función global para ordenar libros
function ordenarLibros(criterio) {
    const tabla = document.getElementById("tabla");
    let librosOrdenados = libros.slice(); // copiar array

    if (criterio === "titulo") {
        // ordenar alfabéticamente (de la A a la Z)
        librosOrdenados.sort(function(a, b) {
            return a.titulo.localeCompare(b.titulo);
        });
    }
    if (criterio === "fechaPublicacion") {
        // ordenar por año (de más antiguo a más nuevo)
        librosOrdenados.sort(function(a, b) {
            return a.fechaPublicacion - b.fechaPublicacion;
        });
    }
    if (criterio === "genero") {
        // ordenar por género (de la A a la Z)
        librosOrdenados.sort(function (a, b) {
            return a.genero.localeCompare(b.genero);
        });
    }

    // Reconstruir filas de la tabla
    tabla.innerHTML = `
    <tr>
      <th>Título</th>
      <th>Género</th>
      <th>Fecha de publicación</th>
    </tr>
    ${librosOrdenados.map(libro => `
      <tr>
        <td>${libro.titulo}</td>
        <td>${libro.genero}</td>
        <td>${libro.fechaPublicacion}</td>
      </tr>
    `).join('')}
  `;
}




