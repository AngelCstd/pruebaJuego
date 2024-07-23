const palabra = document.querySelector("#palabra"),
    botones = document.querySelectorAll(".opciones"),
    comienza = document.querySelector("#comenzar"),
    timeTomado = document.querySelector("#tiempoTomado"),
    timeTotal = document.querySelector("#tiempoTotal"),
    correctas = document.querySelector("#respuestasCorrectas"),
    contestadas = document.querySelector("#preguntasContestadas");
    promedio = document.querySelector("#promedio");
let data,
    currentObject = {},
    respuestasCorrectas = 0,
    preguntasContestadas = 0,
    startTime,
    endTime,
    tiempoTomado,
    tiempoTotal = 0

async function cargarDatos() {
    data = await fetch("ejercicios.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud fetch:', error);
        });
}

function cambiarPalabras() {
    currentObject = data[Math.round(Math.random()*29)]
    palabra.innerHTML = currentObject.palabra
    botones.forEach(element =>{
        element.innerHTML = ""
    })
    currentObject.opciones.forEach((element) => {
        let boton = botones[Math.round(Math.random()*3)]
        while(boton.innerHTML != ""){
            boton = botones[Math.round(Math.random()*3)]
        }
        boton.innerHTML = element
    });
}
function verificarRespuesta(element) {
    if(element.innerHTML.toLowerCase() === currentObject.palabra.toLowerCase()){
        respuestasCorrectas++;
    }
    preguntasContestadas++;
}
function tomarTiempo() {
    endTime = performance.now()
    tiempoTomado = endTime - startTime;
    tiempoTotal += tiempoTomado
    startTime = performance.now()
}
function mostrarStats() {
    timeTomado.innerHTML = "Tiempo de respuesta: " +tiempoTomado;
    timeTotal.innerHTML = "Tiempo total: " + tiempoTotal;
    correctas.innerHTML = "Respuestas correctas: " + respuestasCorrectas;
    contestadas.innerHTML = "Preguntas contestadas: " + preguntasContestadas;
    promedio.innerHTML = "Promedio de tiempo: " + (tiempoTotal / preguntasContestadas);
}
async function comenzar() {
    comienza.style.display = "none"
    startTime = performance.now()
    await cargarDatos()
    cambiarPalabras()
}
function comprobar(event) {
    verificarRespuesta(event.target)
    tomarTiempo();
    cambiarPalabras();
    mostrarStats();
}

comienza.addEventListener("click", comenzar)
botones.forEach(element =>{
    element.addEventListener("click", comprobar)
})