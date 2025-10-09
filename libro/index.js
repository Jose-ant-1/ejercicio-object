console.log('Happy developing ✨')

const libros = [{
    "titulo": "El Código Da Vinci",
    "genero": "suspense",
    "autor": "Dan Brown",
    "paginas": 400,
    "fechaPublicacion": 2003
},{
    "titulo": "Los Pilares de la Tierra",
    "genero": "misterio",
    "autor": "Ken Follet",
    "paginas": 800,
    "fechaPublicacion": 1989
},{
    "titulo": "Un mundo sin fin",
    "genero": "historico",
    "autor": "Ken Follet",
    "paginas": 1200,
    "fechaPublicacion": 207
},{
    "titulo": "El cabo de NuncaMuertos",
    "genero": "Terror",
    "autor": ["Adan Fidgeral", "Carolina Diaz"],
    "paginas": 900,
    "fechaPublicacion": 207
}];

libros.forEach((libro) => {
    libro.paginas > 600 ? console.log("libro: " + libro.titulo + " - paginas: " + libro.paginas) : "";
});

document.addEventListener('DOMContentLoaded', () => {
//mostrar el titulo de los libros con mas de 600 páginas
    const mostrar = document.getElementById('mostrar');

});




