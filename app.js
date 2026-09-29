const cells = document.querySelectorAll('.cell');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

let currentCellIndex = null;
let score = 0;
let gameStarted = false;
let bugIntervalId = null;

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

// Manejador de clics en las celdas
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        // Si el juego no ha comenzado, no hacer nada
        if (!gameStarted) return;

        // Comprobamos si la celda clicada contiene el bug
        if (index === currentCellIndex) {
            score++;
            scoreDisplay.textContent = score;
            moveBug(); // Cambia de posición inmediatamente tras acertar
        }
    });
});

// Manejador del botón Jugar
startBtn.addEventListener('click', () => {
    if (gameStarted) return; // Evita crear múltiples intervalos si se pulsa de nuevo

    gameStarted = true;
    score = 0;
    scoreDisplay.textContent = score;

    moveBug(); // Muestra el primer bug inmediatamente
    bugIntervalId = setInterval(moveBug, 1000); // Comienza a moverse cada 1 segundo
});
