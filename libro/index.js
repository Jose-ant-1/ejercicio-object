console.log('Happy developing ✨')

const libros = [
    {
    "titulo": "El Código Da Vinci",
    "genero": "suspense",
    "autor": ["Dan Brown"],
    "paginas": 400,
    "fechaPublicacion": "2003-10-02"
    },
    {
    "titulo": "Los Pilares de la Tierra",
    "genero": "misterio",
    "autor": ["Ken Follet"],
    "paginas": 800,
    "fechaPublicacion": "1989-12-12"
    },
    {
    "titulo": "Un mundo sin fin",
    "genero": "historico",
    "autor": ["Ken Follet"],
    "paginas": 1200,
    "fechaPublicacion": "2007-11-29"
    },
    {
    "titulo": "El cabo de NuncaMuertos",
    "genero": "Terror",
    "autor": ["Adan Fidgeral", "Carolina Diaz"],
    "paginas": 900,
    "fechaPublicacion": "2017-04-02"
    },
    {
        "titulo": "El golfo de siempreVivos",
        "genero": "suspense",
        "autor": ["Carolina Diaz"],
        "paginas": 900,
        "fechaPublicacion": "2019-10-28"
    }
];

// mostrar libros con más de 600 páginas

function filtrarPorPaginas(listaAComprobar, cantidadPaginas) {
    return listaAComprobar.filter(libro => libro.paginas > cantidadPaginas).map(libro => libro.titulo);
}
/*
libros.forEach((libro) => {
    libro.paginas > 600 ? console.log("libro: " + libro.titulo + " - paginas: " + libro.paginas) : "";
});
*/

//mostrar libros publicados hace más de 20 años
function filtrarPorAnyo(listaAComprobar, anyo) {
    return listaAComprobar.filter(libro => {
        const fechaLibro = new Date(libro.fechaPublicacion);
        const anyoLibro = fechaLibro.getFullYear();
        const anyoActual = new Date().getFullYear();
        const antiguedad = anyoActual - anyoLibro;
        return antiguedad > anyo;
    });
}

//mostrar libros con un solo autor
function librosConUnAutor(listaAComprobar) {
    return listaAComprobar.filter(libro => libro.autor.length === 1).map(libro => libro.titulo);
}

//mostrar autores y libros que ha escrito
function contarLibrosPorAutor(listaLibros) {
    const contador = {};

    listaLibros.forEach(libro => {
        libro.autor.forEach(nombre => {
            contador[nombre] = (contador[nombre] || 0) + 1;
        });
    });

    return Object.entries(contador).map(([autor, cantidad]) => ({
        autor,
        cantidadLibros: cantidad
    }));
}

/*
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
//console.log(librosAutores)
*/

document.addEventListener("DOMContentLoaded", () => {
    // tomamos los géneros únicos
    let generos = []
    libros.forEach(libro => {
        let genero = libro.genero.toLowerCase();
        if (!generos.includes(genero)) {
            generos.push(genero);
        }
    });

    // Construimos todo el HTML directamente
    document.getElementById("mostrar").innerHTML = `
    <h2>Lista de Libros</h2>

    <!-- Filtrar por género -->
        <b>Filtrar por género:</b><br>
        <label><input type="radio" name="genero" value="todos">Todos</label>
        ${generos.map(genero => `
            <label><input type="radio" name="genero" value="${genero}"> ${genero}</label>
        `).join('')}

    <br>
    <!--ordenar segun la opcion-->
    <label for="ordenar">Ordenar por: </label>
    <select id="ordenar" onchange="ordenarLibros(this.value)">
      <option value="titulo">Título</option>
      <option value="genero">Género</option>
      <option value="fechaPublicacion">Fecha de publicación</option>
    </select>
<!--mostrar los libros seleccionados-->
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

    // Agregar evento al grupo de radio buttons
    document.querySelectorAll('input[name="genero"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            filtrarPorGenero(e.target.value);
        });
    });
});

// Función para filtrar libros por género
function filtrarPorGenero(genero) {
    if (genero === "todos") {
        actualizarTabla(libros);
    } else {
        const filtrados = libros.filter(libro => libro.genero.toLowerCase() === genero.toLowerCase());
        actualizarTabla(filtrados);
    }
}

// Función global para ordenar libros
function ordenarLibros(criterio) {
    let librosOrdenados = libros.slice(); // copiar array

    if (criterio === "titulo") {
        librosOrdenados.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }
    if (criterio === "fechaPublicacion") {
        librosOrdenados.sort((a, b) => a.fechaPublicacion - b.fechaPublicacion);
    }
    if (criterio === "genero") {
        librosOrdenados.sort((a, b) => a.genero.localeCompare(b.genero));
    }

    actualizarTabla(librosOrdenados);
}

// Función para reconstruir tabla según una lista
function actualizarTabla(lista) {
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = `
    <tr>
      <th>Título</th>
      <th>Género</th>
      <th>Fecha de publicación</th>
    </tr>
    ${lista.map(libro => `
      <tr>
        <td>${libro.titulo}</td>
        <td>${libro.genero}</td>
        <td>${libro.fechaPublicacion}</td>
      </tr>
    `).join('')}
  `;
}
