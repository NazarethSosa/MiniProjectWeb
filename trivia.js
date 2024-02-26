document.getElementById("comenzarjuego").addEventListener("click", startgame);

let currentQuestionIndex;
let score;
let triviaData;

function startgame() {
    document.getElementById("game-container").style.display = "block";
    document.getElementById("trivia-container").style.display = "none";
    currentQuestionIndex = 0;
    score = 0;
    cargarPreguntas();
}

function cargarPreguntas() {
    fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        const preguntasAleatorias = obtenerPreguntasAleatorias(data, 3);
        triviaData = preguntasAleatorias;
        mostrarPregunta();
    })
    .catch(error => {
        console.error('Error al cargar las preguntas:', error);
    });
}

function obtenerPreguntasAleatorias(preguntas, cantidad) {
    const preguntasAleatorias = [];
    const preguntasDisponibles = preguntas.slice();

    for (let i = 0; i < cantidad; i++) {
        const index = Math.floor(Math.random() * preguntasDisponibles.length);
        preguntasAleatorias.push(preguntasDisponibles.splice(index, 1)[0]);
    }

    return preguntasAleatorias;
}

function mostrarPregunta() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const resultContainer = document.getElementById("result-container");
    const playAgainBtn = document.getElementById("play-again-btn");

    const currentQuestion = triviaData[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("btn", "btn-primary", "mx-1");
        button.addEventListener("click", () => verificarRespuesta(option));
        optionsContainer.appendChild(button);
    });

    resultContainer.textContent = "";
    playAgainBtn.classList.add("d-none");
}

function verificarRespuesta(opcionSeleccionada) {
    const currentQuestion = triviaData[currentQuestionIndex];
    if (opcionSeleccionada === currentQuestion.correct_answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < triviaData.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    const resultContainer = document.getElementById("result-container");
    const playAgainBtn = document.getElementById("play-again-btn");
    resultContainer.textContent = `Tu resultado: ${score}/${triviaData.length}`;
    playAgainBtn.classList.remove("d-none");
}

document.getElementById("play-again-btn").addEventListener("click", resetGame);

function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    startgame();
}
