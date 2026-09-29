const cells = document.querySelectorAll('.cell');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');

let currentCellIndex = null;
let score = 0;
let timeLeft = 30;
let gameStarted = false;
let bugIntervalId = null;
let timerIntervalId = null;

function getRandomCellIndex() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * cells.length);
    } while (newIndex === currentCellIndex && cells.length > 1);
    return newIndex;
}

function moveBug() {
    if (currentCellIndex !== null) {
        cells[currentCellIndex].classList.remove('bug');
    }

    currentCellIndex = getRandomCellIndex();
    cells[currentCellIndex].classList.add('bug');
}

function endGame() {
    gameStarted = false;

    // Detener intervalos
    clearInterval(bugIntervalId);
    clearInterval(timerIntervalId);
    bugIntervalId = null;
    timerIntervalId = null;

    // Eliminar bug visible del tablero
    if (currentCellIndex !== null) {
        cells[currentCellIndex].classList.remove('bug');
        currentCellIndex = null;
    }

    // Cambiar texto del botón
    startBtn.textContent = 'Jugar de nuevo';
}

// Manejador de clics en las celdas
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!gameStarted) return;

        if (index === currentCellIndex) {
            score++;
            scoreDisplay.textContent = score;
            moveBug();
        }
    });
});

// Manejador del botón Jugar / Jugar de nuevo
startBtn.addEventListener('click', () => {
    if (gameStarted) return; // Evita múltiples intervalos si se pulsa durante la partida

    // Limpiar intervalos previos por seguridad
    clearInterval(bugIntervalId);
    clearInterval(timerIntervalId);

    // Reiniciar estado, puntuación y tiempo
    gameStarted = true;
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    startBtn.textContent = 'Jugar de nuevo';

    // Iniciar juego
    moveBug();
    bugIntervalId = setInterval(moveBug, 1000);

    timerIntervalId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
});
