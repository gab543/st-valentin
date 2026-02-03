import { getCharacterSVG, showStep } from './ui.js';

const mazeGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 0, 5, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 5, 1, 0, 0, 3, 0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 5, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let playerPos = { r: 1, c: 1 };
let collectedHearts = 0;
const totalHearts = 3;

export function initMaze() {
    const container = document.getElementById('maze-container');
    container.innerHTML = ''; collectedHearts = 0; updateHeartMeter();
    mazeGrid.forEach((row, r) => {
        row.forEach((cell, c) => {
            const div = document.createElement('div');
            div.className = `w-7 h-7 md:w-12 md:h-12 flex items-center justify-center ${cell === 0 ? 'maze-wall' : 'maze-path'}`;
            div.id = `maze-cell-${r}-${c}`;
            if (cell === 3) div.innerHTML = `<span id="exit-icon" class="text-2xl opacity-30 grayscale transition-all">🏠</span>`;
            if (cell === 5) div.innerHTML = `<span class="collectible-pulse text-xl">💖</span>`;
            container.appendChild(div);
        });
    });
    updatePlayerPos();
}

function updateHeartMeter() {
    for (let i = 1; i <= totalHearts; i++) {
        const span = document.getElementById(`meter-${i}`);
        if (i <= collectedHearts) { span.classList.remove('grayscale', 'opacity-30'); span.classList.add('scale-125'); }
        else { span.classList.add('grayscale', 'opacity-30'); span.classList.remove('scale-125'); }
    }
}

function updatePlayerPos() {
    document.querySelectorAll('.maze-player-container').forEach(el => el.remove());
    const currentCell = mazeGrid[playerPos.r][playerPos.c];
    if (currentCell === 5) {
        mazeGrid[playerPos.r][playerPos.c] = 1; collectedHearts++; updateHeartMeter();
        document.getElementById(`maze-cell-${playerPos.r}-${playerPos.c}`).innerHTML = '';
        if (collectedHearts === totalHearts) {
            document.getElementById('maze-hint').innerText = "Cœur reconstitué ! La sortie est ouverte ! ✨";
            const exit = document.getElementById('exit-icon');
            exit.classList.remove('opacity-30', 'grayscale'); exit.classList.add('scale-125', 'drop-shadow-lg');
        } else {
            document.getElementById('maze-hint').innerText = `Encore ${totalHearts - collectedHearts} éclats !`;
        }
    }
    if (currentCell === 3 && collectedHearts === totalHearts) {
        setTimeout(() => showStep('step-final'), 400); return;
    }
    const pCell = document.getElementById(`maze-cell-${playerPos.r}-${playerPos.c}`);
    const playerContainer = document.createElement('div');
    playerContainer.className = "maze-player-container w-6 h-6 md:w-9 md:h-9 z-10 transition-all";
    playerContainer.innerHTML = getCharacterSVG();
    pCell.appendChild(playerContainer);
}


// --- SWIPE MOBILE LABYRINTHE ---
let touchStartX = 0;
let touchStartY = 0;

const mazeContainer = document.getElementById('maze-container');

mazeContainer.addEventListener('touchstart', e => {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
}, { passive: true });

mazeContainer.addEventListener('touchend', e => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;

    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return; // petit mouvement ignoré

    if (Math.abs(dx) > Math.abs(dy)) {
        // horizontal
        if (dx > 0) slideMaze(0, 1);   // droite
        else slideMaze(0, -1);         // gauche
    } else {
        // vertical
        if (dy > 0) slideMaze(1, 0);   // bas
        else slideMaze(-1, 0);         // haut
    }
}, { passive: true });

// Déplacement fluide dans le labyrinthe
function slideMaze(dr, dc) {
    if (!document.getElementById('step-3').classList.contains('active')) return;

    let nr = playerPos.r;
    let nc = playerPos.c;

    function step() {
        const nextR = nr + dr;
        const nextC = nc + dc;

        if (mazeGrid[nextR] && mazeGrid[nextR][nextC] !== 0) {
            nr = nextR;
            nc = nextC;
            playerPos = { r: nr, c: nc };
            updatePlayerPos();
            setTimeout(step, 80); // vitesse du slide
        }
    }

    step();
}

// Garder compatibilité clavier + boutons
window.moveMaze = slideMaze;

window.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') moveMaze(-1, 0);
    if (e.key === 'ArrowDown') moveMaze(1, 0);
    if (e.key === 'ArrowLeft') moveMaze(0, -1);
    if (e.key === 'ArrowRight') moveMaze(0, 1);
});
