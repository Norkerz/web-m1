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
let currentBugSpeed = 1000;

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

function getBugIntervalSpeed(currentScore) {
    if (currentScore >= 15) return 450;
    if (currentScore >= 10) return 600;
    if (currentScore >= 5) return 800;
    return 1000;
}

function endGame() {
    gameStarted = false;

    // Detener intervalos
    clearInterval(bugIntervalId);
    clearInterval(timerIntervalId);
    bugIntervalId = null;
    timerIntervalId = null;
    currentBugSpeed = 1000;

    // Eliminar bug visible del tablero
    if (currentCellIndex !== null) {
        cells[currentCellIndex].classList.remove('bug');
        currentCellIndex = null;
    }

    // Cambiar texto del botón y reactivarlo
    startBtn.textContent = 'Jugar de nuevo';
    startBtn.disabled = false;
}

// Manejador de clics en las celdas
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!gameStarted) return;

        if (index === currentCellIndex) {
            score++;
            scoreDisplay.textContent = score;

            const newSpeed = getBugIntervalSpeed(score);
            if (newSpeed !== currentBugSpeed) {
                currentBugSpeed = newSpeed;
                clearInterval(bugIntervalId);
                bugIntervalId = setInterval(moveBug, currentBugSpeed);
            }

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

    // Reiniciar estado, puntuación, tiempo y velocidad
    gameStarted = true;
    score = 0;
    timeLeft = 30;
    currentBugSpeed = 1000;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    startBtn.textContent = 'Jugando...';
    startBtn.disabled = true;

    // Iniciar juego
    moveBug();
    bugIntervalId = setInterval(moveBug, currentBugSpeed);

    timerIntervalId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
});
