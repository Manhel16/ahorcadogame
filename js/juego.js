// Array de palabras sencillas
var dificultadFacil = [
    "sol",
    "casa",
    "perro",
    "flor",
    "libro",
    "agua",
    "manzana",
    "gato",
    "amarillo",
    "pelota",
    "radio",
    "cielo",
    "hoja",
    "arbol",
    "rojo",
    "azul",
    "raton",
    "mesa",
    "lapiz",
    "puerta",
    "mar",
    "luna",
    "ojo",
    "dedo",
    "nieve",
    "nube",
    "nariz",
    "silla",
    "viento"
];

// Array de palabras más difíciles
var dificultadDificil = [
    "quimera",
    "esdrujula",
    "onomatopeya",
    "xylophone",
    "psicologia",
    "jazz",
    "cianuro",
    "zodiaco",
    "bizarro",
    "oximoron",
    "criptografia",
    "antitesis",
    "gargantuesco",
    "inefable",
    "quintaesencia",
    "ultracrepídario",
    "xenofobia",
    "paradigma",
    "cacofonia",
    "hipotetico",
    "metamorfosis",
    "quisquilloso",
    "anacronismo",
    "sibilancia",
    "trascendental",
    "ubérrimo",
    "ventrilocuo",
    "yoctosegundo",
    "zurcir"
];
var dificultad = localStorage.getItem("dificultad");
var nombre = localStorage.getItem("nombre");
var palabraSecreta = elegirPalabra();
    var letrasUsadas = [];
    var intentosRestantes = 6;

    document.getElementById("secreta").textContent = ocultarPalabra(palabraSecreta, letrasUsadas);

    document.querySelectorAll(".letras").forEach(function (letra) {
        letra.addEventListener("click", function () {
            var letraSeleccionada = letra.textContent.trim().toUpperCase();

            if (!palabraSecreta.toUpperCase().includes(letraSeleccionada)) {
                intentosRestantes--;
                cambiarimagen();
            }

            if (letrasUsadas.indexOf(letraSeleccionada) === -1) {
                letrasUsadas.push(letraSeleccionada);

                document.getElementById("usadas").textContent = "LETRAS UTILIZADAS: " + letrasUsadas.join(", ");
                document.getElementById("secreta").textContent = ocultarPalabra(palabraSecreta, letrasUsadas);

                if (intentosRestantes === 0 || palabraAdivinada(palabraSecreta, letrasUsadas)) {
                    mostrarFinJuego();
                }
            }

            var elemento = this;
            elemento.classList.add('seleccionado');
            setTimeout(function () {
                elemento.style.display = "none";
            }, 500);
        });
    });
function finalizarJuego() {
    return intentosRestantes === 0 || palabraAdivinada(palabraSecreta, letrasUsadas);
}
function elegirPalabra() {
    if (dificultad === "facil") {
        return dificultadFacil[Math.floor(Math.random() * dificultadFacil.length)];
    }else{
        return dificultadDificil[Math.floor(Math.random() * dificultadDificil.length)];
    }
}

function ocultarPalabra(palabra, letrasAdivinadas) {
    return palabra.replace(new RegExp(`[^${letrasAdivinadas.join("")}\\s]`, "gi"), "_ ");
}

function palabraAdivinada(palabra, letrasAdivinadas) {
    return palabra.replace(new RegExp(`[${letrasAdivinadas.join("")}\\s]`, "gi"), "") === "";
}


// const palabras = ['casa', 'abecedario', 'camion', 'armario', 'mono', 'animal', 'pais', 'pizza', 'almendra', 'mujer', 'madre', 'hijo'];
// var palabraSecreta = elegirPalabra();
// var letrasUsadas = [];
// var intentosRestantes = 6;
// var contadorIntentos = document.getElementById("intentos");
// document.getElementById("secreta").textContent = ocultarPalabra(palabraSecreta, letrasUsadas);

// document.querySelectorAll(".letras").forEach(function (letra) {
//     letra.addEventListener("click", function () {
//         var letraSeleccionada = letra.textContent.toUpperCase();
//         if (letrasUsadas.indexOf(letraSeleccionada) === -1) {
//             letrasUsadas.push(letraSeleccionada);

//             if (palabraSecreta.indexOf(letraSeleccionada) === -1) {
//                 intentosRestantes--;
//                 cambiarimagen();
//             }

//             document.getElementById("usadas").textContent = "LETRAS UTILIZADAS: " + letrasUsadas.join(", ");
//             document.getElementById("secreta").textContent = ocultarPalabra(palabraSecreta, letrasUsadas);

//             if (intentosRestantes === 0 || palabraAdivinada(palabraSecreta, letrasUsadas)) {
//                 mostrarFinJuego();
//             }
//         }
//     });
// });
// function mostrarFinJuego() {
//     var mensaje = document.getElementById("fin");
//     mensaje.style.display = "block";
//     var mensajeText = "";
//     if (intentosRestantes === 0) {
//         mensajeText = "HAS PERDIDO. La palabra era: " + palabraSecreta;
//     } else {
//         mensajeText = "¡FELICIDADES! Has adivinado la palabra.";
//     }
//     mensaje.textContent = mensajeText;
//     mensaje.innerHTML += '<button onclick="volverAJugar()">Volver a Jugar</button>';
//     mensaje.innerHTML += '<button onclick="salir()">Salir</button>';
// }

// function cambiarimagen() {
//     var imagen = document.getElementById('foto');
//     var nombreImagenActual = imagen.src.split('/').pop();
//     var transiciones = {
//         "caballete.png": "/imagenes/cabeza.png",
//         "cabeza.png": "/imagenes/cuerpo.png",
//         "cuerpo.png": "/imagenes/brazoizq.png",
//         "brazoizq.png": "/imagenes/brazoder.png",
//         "brazoder.png": "/imagenes/pierizq.png",
//         "pierizq.png": "/imagenes/perder.png"
//     };

//     var letraActual = letrasUsadas[letrasUsadas.length - 1];
//     var letraEnPalabra = palabraSecreta.indexOf(letraActual) !== -1;

//     if (!letraEnPalabra && nombreImagenActual in transiciones) {
//         imagen.style.filter = "blur(15px)";
//         setTimeout(function () {
//             imagen.src = transiciones[nombreImagenActual];
//             imagen.style.filter = "none";
//         }, 300);

//         setTimeout(function () {
//             if (intentosRestantes === 0 || palabraAdivinada(palabraSecreta, letrasUsadas)) {
//                 mostrarFinJuego();
//             } else {
//                 intentosRestantes--;
//             }
//         }, 700);
//     }
// }
// function volverAJugar() {
//     location.reload();
// }

// function salir() {
//     // Aquí puedes redirigir a otra página, cerrar la ventana, etc.
//     alert("¡Gracias por jugar! Hasta luego.");
// }
