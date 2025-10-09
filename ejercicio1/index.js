console.log('Happy developing ✨')

const salaries = {
    "John": 100,
    "Doe": 100,
    "Mary": 300,
    "Daniel": 400,
    "Micha": 200,
    "James": 200,
    "Max": 300
}

document.addEventListener('DOMContentLoaded', () => {
    const mostrar= document.getElementById('mostrar');
    mostrar.innerHTML = `La suma de todos los salario es: ${sumaSalario()}`
    mostrar.innerHTML += `Los nombres ordenados alfabeticamente con su salario son: `
})

function sumaSalario() {
let sumaSalarios = 0;
const salarios = Object.values(salaries);
for (let i = 0; i < salarios.length; i++) {
    sumaSalarios += salarios[i];
}
    console.log("se sumaron los salarios, salió: " + sumaSalarios);
return sumaSalarios;
}

