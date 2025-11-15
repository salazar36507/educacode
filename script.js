// ===============================================================
//  DATOS DE SUBTEMAS
// ===============================================================
const subtemas = {
    1: {
        1: {
            titulo: "¿Qué es programar?",
            contenido:
                "Programar es darle instrucciones a una computadora para que realice tareas. Es como enseñarle paso a paso qué debe hacer."
        },
        2: {
            titulo: "Pensamiento lógico",
            contenido:
                "El pensamiento lógico permite analizar problemas, dividirlos en partes y proponer soluciones ordenadas."
        },
        3: {
            titulo: "Entrada, Proceso y Salida",
            contenido:
                "Todo programa sigue un flujo: recibe datos (entrada), los transforma (proceso) y muestra un resultado (salida)."
        }
    },

    2: {
        1: {
            titulo: "Estructura básica de HTML",
            contenido:
                "Un archivo HTML contiene etiquetas como <!DOCTYPE>, <html>, <head> y <body>, que organizan la página."
        },
        2: {
            titulo: "Etiquetas principales",
            contenido:
                "HTML usa etiquetas como <h1>, <p>, <img>, <a> para mostrar títulos, textos, imágenes y enlaces."
        },
        3: {
            titulo: "Imágenes, enlaces y listas",
            contenido:
                "HTML permite insertar imágenes con <img>, enlaces con <a> y listas con <ul>, <ol>."
        }
    },

    3: {
        1: {
            titulo: "Selectores y pseudoclases",
            contenido:
                "Los selectores permiten aplicar estilos a elementos, y las pseudoclases agregan efectos como hover."
        },
        2: {
            titulo: "Flexbox y Grid",
            contenido:
                "Flexbox y Grid son sistemas modernos de CSS para organizar elementos en filas y columnas."
        },
        3: {
            titulo: "Animaciones CSS",
            contenido:
                "CSS permite crear animaciones con @keyframes, transitions y transform."
        }
    }
};

// ===============================================================
//  ESTADO DE AVANCE (SE GUARDA EN LOCALSTORAGE)
// ===============================================================
let progreso = JSON.parse(localStorage.getItem("progresoEducaCode")) || {
    mod1: { completados: 0 },
    mod2: { completados: 0 },
    mod3: { completados: 0 }
};

// ===============================================================
//  ABRIR SUBTEMA
// ===============================================================
let moduloActual = 0;
let subtemaActual = 0;

function abrirSubtema(mod, sub) {
    moduloActual = mod;
    subtemaActual = sub;

    const data = subtemas[mod][sub];

    document.getElementById("titulo-subtema").innerText = data.titulo;
    document.getElementById("contenido-subtema").innerText = data.contenido;

    document.getElementById("modal-subtema").classList.remove("hidden");
}

// Cerrar modal
function cerrarSubtema() {
    document.getElementById("modal-subtema").classList.add("hidden");
}

// ===============================================================
//  MARCAR SUBTEMA COMO COMPLETADO
// ===============================================================
function marcarCompletado() {
    let current = progreso["mod" + moduloActual];

    if (!current.completadosList) current.completadosList = [];

    if (!current.completadosList.includes(subtemaActual)) {
        current.completadosList.push(subtemaActual);
        current.completados++;
    }

    actualizarProgreso();
    guardarProgreso();
    cerrarSubtema();
}

// ===============================================================
//  ACTUALIZAR BARRA DE PROGRESO
// ===============================================================
function actualizarProgreso() {
    for (let i = 1; i <= 3; i++) {
        const mod = progreso["mod" + i];
        const porcentaje = (mod.completados / 3) * 100;

        document.getElementById("prog" + i).style.width = porcentaje + "%";

        // desbloquear módulo siguiente
        if (porcentaje === 100 && i < 3) {
            document.getElementById("mod" + (i + 1)).classList.remove("bloqueado");
        }
    }
}

function guardarProgreso() {
    localStorage.setItem("progresoEducaCode", JSON.stringify(progreso));
}

actualizarProgreso();

// ===============================================================
//  QUIZZES
// ===============================================================
const quizzes = {
    1: [
        {
            pregunta: "¿Qué es programar?",
            opciones: ["Dar órdenes a una computadora", "Crear imágenes", "Diseñar escenarios"],
            correcta: 0
        },
        {
            pregunta: "El pensamiento lógico sirve para:",
            opciones: ["Analizar problemas", "Tocar guitarra", "Correr rápido"],
            correcta: 0
        }
    ],

    2: [
        {
            pregunta: "¿Qué etiqueta define el cuerpo del documento?",
            opciones: ["<head>", "<body>", "<title>"],
            correcta: 1
        },
        {
            pregunta: "¿Qué etiqueta sirve para títulos?",
            opciones: ["<p>", "<img>", "<h1>"],
            correcta: 2
        }
    ],

    3: [
        {
            pregunta: "¿Qué sistema de CSS organiza elementos en filas?",
            opciones: ["Flexbox", "Hover", "Span"],
            correcta: 0
        },
        {
            pregunta: "¿Qué permite las animaciones?",
            opciones: ["@keyframes", "<animate>", "animation-js"],
            correcta: 0
        }
    ]
};

let quizActual = 0;

// ===============================================================
//  INICIAR QUIZ
// ===============================================================
function iniciarQuiz(mod) {
    quizActual = mod;

    const quizData = quizzes[mod];

    const contenedor = document.getElementById("quiz-preguntas");
    contenedor.innerHTML = "";

    quizData.forEach((q, index) => {
        let bloque = `
            <div class="pregunta">
                <h3>${q.pregunta}</h3>
                ${q.opciones
                    .map(
                        (op, i) =>
                            <label><input type="radio" name="p${index}" value="${i}"> ${op}</label><br>
                    )
                    .join("")}
            </div>
        `;

        contenedor.innerHTML += bloque;
    });

    document.getElementById("quiz-titulo").innerText = "Quiz del Módulo " + mod;
    document.getElementById("modal-quiz").classList.remove("hidden");
}

// cerrar quiz
function cerrarQuiz() {
    document.getElementById("modal-quiz").classList.add("hidden");
}

// ===============================================================
//  FINALIZAR QUIZ
// ===============================================================
function finalizarQuiz() {
    let respuestas = document.querySelectorAll(".pregunta");
    let correctas = 0;

    respuestas.forEach((p, index) => {
        const seleccionada = document.querySelector(input[name="p${index}"]:checked);

        if (seleccionada && parseInt(seleccionada.value) === quizzes[quizActual][index].correcta) {
            correctas++;
        }
    });

    if (correctas >= quizzes[quizActual].length / 2) {
        alert("¡Aprobaste el quiz! Módulo desbloqueado.");

        document.getElementById("mod" + (quizActual + 1)).classList.remove("bloqueado");
    } else {
        alert("Necesitás más del 50% para aprobar.");
    }

    cerrarQuiz();
}