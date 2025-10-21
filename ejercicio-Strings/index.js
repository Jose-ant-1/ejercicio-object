// 1) Reemplazar cada carácter por el siguiente en el alfabeto
function shiftStringNext(cadena) {
    let salida = '';
    for (let caracter of cadena) {
        //convertir carácter a código UTF-16
        const codigoUTF16DeCadaCaracter = caracter.charCodeAt(0);
        if (codigoUTF16DeCadaCaracter >= 65 && codigoUTF16DeCadaCaracter <= 90) { // A-Z
            salida += (caracter === 'Z') ? 'A' : String.fromCharCode(codigoUTF16DeCadaCaracter + 1);
        } else if (codigoUTF16DeCadaCaracter >= 97 && codigoUTF16DeCadaCaracter <= 122) { // a-z
            salida += (caracter === 'z') ? 'a' : String.fromCharCode(codigoUTF16DeCadaCaracter + 1);
        } else {
            salida += caracter;
        }
    }
    return salida;
}

// 2) Extraer un número especificado de caracteres
function truncate_string(cadena, caracteresAMostrar) {
    if (caracteresAMostrar <= 0) return '';
    return cadena.substring(0, caracteresAMostrar);
}

// 3) Abreviar un nombre
function abbrev_name(nombre) {
    //trim para eliminar espacios en blanco de los extremos, split para separar en array según el espacio (\s+ ppor si hay más de 1 espacio que cunete como 1)
    const nombreSeparado = nombre.trim().split(/\s+/);
    if (nombreSeparado.length === 0) return '';
    if (nombreSeparado.length === 1) return nombreSeparado[0];
    // nombreSeparado[nombreSeparado.length - 1] toma el ultimo apellido
    return nombreSeparado[0] + ' ' + nombreSeparado[nombreSeparado.length - 1].charAt(0) + '.';
}

// 4) Ocultar una dirección de correo electrónico
function protect_email(email) {
    //dividimos correo por el @
    const [local, dominio] = email.split('@');
    if (!dominio) return email;
    const shown = local.length > 5 ? local.slice(0,5) : local.charAt(0);
    return shown + '...' + '@' + dominio;
}

// 5) Convertir una cadena en "parametrizada"
function string_parameterize(str) {
    return str
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// 6) Capitalizar la primera letra de cada palabra
function capitalize_Words(str) {
    return str.replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1));
}

// 7) Invertir mayúsculas y minúsculas
function swapcase(str) {
    let out = '';
    for (let ch of str) {
        if (ch >= 'a' && ch <= 'z') out += ch.toUpperCase();
        else if (ch >= 'A' && ch <= 'Z') out += ch.toLowerCase();
        else out += ch;
    }
    return out;
}

// 8) Convertir a camel case
function camelize(str) {
    if (!/[\s_-]/.test(str)) return str;
    const parts = str.trim().split(/[\s_-]+/).filter(Boolean);
    if (parts.length === 0) return '';
    const first = parts[0].toLowerCase();
    const rest = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1));
    return first + rest.join('');
}

// 9) Des-camelizar una cadena
function uncamelize(str, sep = ' ') {
    const withSep = str.replace(/([a-z0-9])([A-Z])/g, `$1${sep}$2`);
    return withSep.toLowerCase();
}

// ----------------------------------------------------------------
// Mostrar los resultados usando innerHTML
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const out = document.getElementById('out');
    out.innerHTML = `
<h2>1) shiftStringNext</h2>
<p>${shiftStringNext("abc XYZ z!")}</p>

<h2>2) truncate_string</h2>
<p>${truncate_string("Robin Singh", 4)}</p>

<h2>3) abbrev_name</h2>
<p>${abbrev_name("Robin Singh")}</p>

<h2>4) protect_email</h2>
<p>${protect_email("robin_singh@example.com")}</p>

<h2>5) string_parameterize</h2>
<p>${string_parameterize("Robin Singh from USA.")}</p>

<h2>6) capitalize_Words</h2>
<p>${capitalize_Words('js string exercises')}</p>

<h2>7) swapcase</h2>
<p>${swapcase('AaBbc')}</p>

<h2>8) camelize</h2>
<p>${camelize("JavaScript Exercises")}</p>

<h2>9) uncamelize</h2>
<p>${uncamelize('helloWorld', '-')}</p>
`;
})

