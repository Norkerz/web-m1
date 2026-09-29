const cells = document.querySelectorAll('.cell');
let currentCellIndex = null;

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

// Mostrar el bug inmediatamente al cargar
moveBug();

// Cambiar de posición cada 1 segundo
setInterval(moveBug, 1000);
