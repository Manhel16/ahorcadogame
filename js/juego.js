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
  "viento",
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
  "ultracrepidario",
  "xenofobia",
  "paradigma",
  "cacofonia",
  "hipotetico",
  "metamorfosis",
  "quisquilloso",
  "anacronismo",
  "sibilancia",
  "trascendental",
  "uberrimo",
  "ventrilocuo",
  "yoctosegundo",
  "zurcir",
];

var dificultad = localStorage.getItem("dificultad");
var palabraSecreta = elegirPalabra();
var letrasUsadas = [];
var intentosRestantes = 6;
var canciones = [
  '../audioFondo/Doom OST - E1M1 - At Doom\'s Gate.mp3',
  '../audioFondo/Mozart - Lacrimosa.mp3',
  '../audioFondo/PVZ2 - Dr.zombie theme.mp3',
  '../audioFondo/Vanilla Ice - Ice Ice Baby Instrumental.mp3',
  '../audioFondo/Cheel - Blue Dreams.mp3',
  '../audioFondo/Better Call Saul Theme by Little Barrie.mp3',
  '../audioFondo/LAKEY INSPIRED - Better Days.mp3'
];
var audioFondo;
function reproducirCancionAleatoria() {
  var cancionIndex = Math.floor(Math.random() * canciones.length);
  audioFondo = new Audio(canciones[cancionIndex]);
  audioFondo.addEventListener('ended', function () {
    reproducirCancionAleatoria();
  });

  audioFondo.play();
  audioFondo.volume = 0.6;
}

window.addEventListener('load', function() {
  reproducirCancionAleatoria();
});
document.getElementById("secreta").textContent = ocultarPalabra(
  palabraSecreta,
  letrasUsadas
);

function elegirPalabra() {
  if (dificultad === "facil") {
    return dificultadFacil[Math.floor(Math.random() * dificultadFacil.length)];
  } else {
    return dificultadDificil[
      Math.floor(Math.random() * dificultadDificil.length)
    ];
  }
}

function ocultarPalabra(palabra, letrasAdivinadas) {
  return palabra.replace(
    new RegExp(`[^${letrasAdivinadas.join("")}\\s]`, "gi"),
    "_ "
  );
}

function palabraAdivinada(palabra, letrasAdivinadas) {
  return (
    palabra.replace(
      new RegExp(`[${letrasAdivinadas.join("")}\\s]`, "gi"),
      ""
    ) === ""
  );
}

const letras = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "Ñ",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

document.addEventListener("DOMContentLoaded", function () {
  var ubiletras = document.getElementById("ABC");

  for (var i = 0; i < letras.length; i++) {
    let div = document.createElement("div");
    div.className = "letras";
    div.innerHTML = letras[i];
    ubiletras.appendChild(div);

    div.addEventListener("click", function () {
      var letraSeleccionada = this.textContent.trim().toUpperCase();

      if (!palabraSecreta.toUpperCase().includes(letraSeleccionada)) {
        intentosRestantes--;
        cambiarimagen();
      }

      if (letrasUsadas.indexOf(letraSeleccionada) === -1) {
        letrasUsadas.push(letraSeleccionada);

        document.getElementById("usadas").textContent =
          "LETRAS UTILIZADAS: " + letrasUsadas.join(", ");
        document.getElementById("secreta").textContent = ocultarPalabra(
          palabraSecreta,
          letrasUsadas
        );

        if (
          intentosRestantes === 0 ||
          palabraAdivinada(palabraSecreta, letrasUsadas)
        ) {
          mostrarFinJuego();
        }
      }

      var elemento = this;
      elemento.classList.add("seleccionado");
      setTimeout(function () {
        elemento.style.display = "none";
      }, 500);
    });
  }

  // Cargar el ranking al cargar la página (fuera del bucle)
  mostrarRanking();
});

// Función para mostrar el ranking
function mostrarRanking() {
  var rankingContainer = document.getElementById("ranking");
  rankingContainer.innerHTML = "<h3>Ranking de Jugadores</h3>";

  // Obtener datos del localStorage
  var rangkingdatos = [];

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith("jugador_")) {
      var jugadorData = JSON.parse(localStorage.getItem(key));
      rangkingdatos.push(jugadorData);
    }
  }

  // Ordenar el ranking por tiempo (ascendente)
  rangkingdatos.sort(function (a, b) {
    return a.tiempo - b.tiempo;
  });

  // Mostrar los jugadores en el ranking
  var numJugadoresAMostrar = Math.min(5, rangkingdatos.length);
  for (var i = 0; i < numJugadoresAMostrar; i++) {
    if (i === 0) {
      rankingContainer.innerHTML +=
        "<p>" +
        "<i class='fa-light fa-crown' style='color: #fbff00;'></i>" +
        (i + 1) +
        ". " +
        rangkingdatos[i].nombre +
        " - " +
        rangkingdatos[i].tiempo.toFixed(2) +
        " segundos</p>";
    } else {
      rankingContainer.innerHTML +=
        "<p>" +
        (i + 1) +
        ". " +
        rangkingdatos[i].nombre +
        " - " +
        rangkingdatos[i].tiempo.toFixed(2) +
        " segundos</p>";
    }
  }

  // Guardar el ranking (solo los tres primeros) en el localStorage
  localStorage.setItem(
    "rankingdatos",
    JSON.stringify(rangkingdatos.slice(0, 5))
  );
}

// Función para mostrar el fin del juego
function mostrarFinJuego() {
  var mensaje = document.getElementById("fin");
  mensaje.style.display = "block";
  var mensajeText = "";
  audioFondo.pause();

  if (
    intentosRestantes === 0 ||
    palabraAdivinada(palabraSecreta, letrasUsadas)
  ) {
    var tiempoInicio = localStorage.getItem("tiempoInicio");
    var tiempoFin = new Date().getTime();
    var tiempoTranscurrido = (tiempoFin - tiempoInicio) / 1000; // Tiempo en segundos

    // Guardar la información del jugador en localStorage solo si ganó la partida
    if (palabraAdivinada(palabraSecreta, letrasUsadas)) {
      var jugador = {
        nombre: localStorage.getItem("nombre"),
        tiempo: tiempoTranscurrido,
      };

      localStorage.setItem(
        "jugador_" + new Date().getTime(),
        JSON.stringify(jugador)
      );
    }

    // Mostrar el ranking en la página principal solo si ganó la partida
    if (palabraAdivinada(palabraSecreta, letrasUsadas)) {
      mostrarRanking();
    }

    if (intentosRestantes === 0) {
      mensajeText = "HAS PERDIDO. La palabra era: " + palabraSecreta;
      document.getElementById("perdedor").style.display = "block";
      var audioperder = document.getElementById("audioPerder");
      audioperder.play();
    } else {
      document.getElementById("confeti").style.display = "block";
      mensajeText = "¡FELICIDADES! Has adivinado la palabra.";
      // Reproduce el sonido de victoria
      var audioGanar = document.getElementById("audioGanar");
      audioGanar.play();
    }

    mensaje.textContent = mensajeText;
    mensaje.innerHTML +=
      '<button class ="boton" onclick="volverAJugar()">Volver a Jugar</button>';
    mensaje.innerHTML +=
      '<button class ="boton" onclick="salir()">Salir</button>';
  }
}

// Función para mostrar el ranking
function mostrarRanking() {
  var rankingContainer = document.getElementById("ranking");
  rankingContainer.innerHTML = "<h3>Ranking de Jugadores</h3>";

  // Obtener datos del localStorage
  var rankingDatos = [];

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith("jugador_")) {
      var jugadorData = JSON.parse(localStorage.getItem(key));
      rankingDatos.push(jugadorData);
    }
  }

  // Ordenar el ranking por tiempo (ascendente)
  rankingDatos.sort(function (a, b) {
    return a.tiempo - b.tiempo;
  });

  // Mostrar los jugadores en el ranking
  var numJugadoresAMostrar = Math.min(5, rankingDatos.length);
  for (var i = 0; i < numJugadoresAMostrar; i++) {
    if (i === 0) {
      rankingContainer.innerHTML +=
        "<p>" +
        "<i class='fa-light fa-crown' style='color: #fbff00;'></i>" +
        (i + 1) +
        ". " +
        rankingDatos[i].nombre +
        " - " +
        rankingDatos[i].tiempo.toFixed(2) +
        " segundos</p>";
    } else {
      rankingContainer.innerHTML +=
        "<p>" +
        (i + 1) +
        ". " +
        rankingDatos[i].nombre +
        " - " +
        rankingDatos[i].tiempo.toFixed(2) +
        " segundos</p>";
    }
  }

  // Guardar el ranking (solo los tres primeros) en el localStorage
  localStorage.setItem(
    "rankingDatos",
    JSON.stringify(rankingDatos.slice(0, 5))
  );
}
function cambiarimagen() {
  var imagen = document.getElementById("foto");
  var nombreImagenActual = imagen.src.split("/").pop();
  var transiciones = {
    "caballete.png": "../imagenes/cabeza.png",
    "cabeza.png": "../imagenes/cuerpo.png",
    "cuerpo.png": "../imagenes/brazoizq.png",
    "brazoizq.png": "../imagenes/brazoder.png",
    "brazoder.png": "../imagenes/pierizq.png",
    "pierizq.png": "../imagenes/perder.png",
  };

  var letraActual = letrasUsadas[letrasUsadas.length - 1];
  var letraEnPalabra = palabraSecreta.indexOf(letraActual) !== -1;

  if (!letraEnPalabra && nombreImagenActual in transiciones) {
    imagen.style.filter = "blur(15px)";
    setTimeout(function () {
      imagen.src = transiciones[nombreImagenActual];
      imagen.style.filter = "none";
    }, 300);
  }
}
function volverAJugar() {
  location.reload();
  reproducirCancionAleatoria();
}
div.addEventListener("mouseover", function () {
  div.style.animation = "moverBorde 1s infinite"; // Puedes ajustar la duración según tus necesidades
});

// Elimina la animación cuando el mouse sale del elemento
div.addEventListener("mouseout", function () {
  div.style.animation = "none";
});
function salir() {
  alert("¡Gracias por jugar! Hasta luego.");
  window.location.href = "menu.html";
}

function finalizarJuego() {
  return (
    intentosRestantes === 0 || palabraAdivinada(palabraSecreta, letrasUsadas)
  );
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
