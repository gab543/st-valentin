import { getCharacterSVG, showStep } from './ui.js';
import { initMaze } from './step3-maze.js';
import { showTutorial } from './tutorial.js';
import { playerName } from './config.js';

let lives = 3, timer = 10, gameInterval, heartInterval, gameRunning = false;
const gameArea = document.getElementById('game-area');
const player = document.getElementById('player');
const livesDisplay = document.getElementById('lives-display');
const timerDisplay = document.getElementById('timer-display');

player.innerHTML = getCharacterSVG();

export function startDodgeGame() {
    lives = 3; timer = 10; gameRunning = true;
    livesDisplay.innerText = "Vies : ❤️❤️❤️";
    timerDisplay.innerText = "10s";
    player.innerHTML = getCharacterSVG('normal');
    gameInterval = setInterval(() => {
        timer--; timerDisplay.innerText = `${timer}s`;
        if (timer <= 0) winGame();
    }, 1000);
    heartInterval = setInterval(spawnHeart, 400);
}

function spawnHeart() {
    if (!gameRunning) return;
    const heart = document.createElement('div');
    heart.innerText = "💔"; heart.className = "absolute text-2xl select-none transition-all duration-3000 linear";
    heart.style.left = (Math.random() * 90 + 5) + "%"; heart.style.top = "-50px";
    gameArea.appendChild(heart);
    let top = -50;
    const speed = 2 + Math.random() * 3;
    function animateHeart() {
        if (!gameRunning) { heart.remove(); return; }
        top += speed;
        heart.style.top = top + "px";
        const pRect = player.getBoundingClientRect();
        const hRect = heart.getBoundingClientRect();
        if (hRect.left < pRect.right - 10 && hRect.right > pRect.left + 10 &&
            hRect.top < pRect.bottom - 10 && hRect.bottom > pRect.top + 10) { loseLife(); heart.remove(); return; }
        if (top < gameArea.offsetHeight) requestAnimationFrame(animateHeart); else heart.remove();
    }
    requestAnimationFrame(animateHeart);
}

function loseLife() {
    lives--; livesDisplay.innerText = "Vies : " + "❤️".repeat(lives);
    player.innerHTML = getCharacterSVG('sad');
    setTimeout(() => { if (gameRunning) player.innerHTML = getCharacterSVG('normal'); }, 600);
    if (lives <= 0) gameOver();
}

function gameOver() {
    gameRunning = false; clearInterval(gameInterval); clearInterval(heartInterval);
    document.getElementById('game-message').classList.remove('hidden');
    document.getElementById('game-message-title').innerText = "Plus d'amour ! 😵💔";
    document.getElementById('game-message-body').innerText = "Le petit ours a besoin de repos... Réessaie !";
}

function winGame() {
    gameRunning = false; clearInterval(gameInterval); clearInterval(heartInterval);
    document.getElementById('game-message').classList.remove('hidden');
    document.getElementById('game-message-title').innerText = "Bravo ! ✨";
    document.getElementById('game-message-body').innerText = `Incroyable ${playerName} 😳 Il a survécu à la tempête. Dernière épreuve...`;;
    const btn = document.getElementById('game-retry-btn');
    btn.innerText = "Passer à la suite ➜";
    btn.onclick = () => {
        showStep('step-3');
        initMaze();
        showTutorial(
            "Épreuve 3 🧩",
            "Sur téléphone, fais glisser ton doigt pour faire filer le personnage jusqu'au mur. Récupère les 3 cœurs pour ouvrir la sortie !"
        );
    };
    ;
}

document.getElementById('game-retry-btn').onclick = () => {
    document.getElementById('game-message').classList.add('hidden'); startDodgeGame();
};

// --- Déplacement joueur ---
gameArea.addEventListener('mousemove', e => {
    const rect = gameArea.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(30, Math.min(rect.width - 30, x));
    player.style.left = x + "px";
});

// --- Déplacement tactile mobile ---
let touchOffsetX = 0;
gameArea.addEventListener('touchstart', e => {
    touchOffsetX = e.touches[0].clientX - player.getBoundingClientRect().left;
});
gameArea.addEventListener('touchmove', e => {
    e.preventDefault();
    const rect = gameArea.getBoundingClientRect();
    let x = e.touches[0].clientX - rect.left - touchOffsetX + player.offsetWidth / 2;
    x = Math.max(30, Math.min(rect.width - 30, x));
    player.style.left = x + "px";
}, { passive: false });
