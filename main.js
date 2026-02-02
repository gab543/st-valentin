// --- PERSONNAGE SVG ---
const getCharacterSVG = (state = 'normal') => {
    const isSad = state === 'sad';
    return `
    <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <!-- Ears -->
        <circle cx="25" cy="25" r="12" fill="#fecdd3" />
        <circle cx="75" cy="25" r="12" fill="#fecdd3" />
        <circle cx="25" cy="25" r="7" fill="#fda4af" />
        <circle cx="75" cy="25" r="7" fill="#fda4af" />
        <!-- Body/Head -->
        <circle cx="50" cy="55" r="40" fill="#fecdd3" />
        <!-- Eyes -->
        ${isSad ? `
            <path d="M 30 50 L 40 45 M 60 45 L 70 50" stroke="#4c0519" stroke-width="3" fill="none" />
        ` : `
            <circle cx="35" cy="48" r="4" fill="#4c0519" />
            <circle cx="65" cy="48" r="4" fill="#4c0519" />
        `}
        <!-- Blush -->
        <circle cx="28" cy="58" r="5" fill="#fda4af" opacity="0.6" />
        <circle cx="72" cy="58" r="5" fill="#fda4af" opacity="0.6" />
        <!-- Mouth -->
        <path d="${isSad ? 'M 45 65 Q 50 60 55 65' : 'M 45 62 Q 50 68 55 62'}" fill="none" stroke="#4c0519" stroke-width="2.5" stroke-linecap="round" />
        <!-- Small Heart on belly -->
        <path d="M 50 82 C 45 78 42 82 42 85 C 42 88 50 92 50 92 C 50 92 58 88 58 85 C 58 82 55 78 50 82" fill="#f43f5e" />
    </svg>
    `;
};

// --- NAVIGATION ---
function showStep(stepId) {
    document.querySelectorAll('.step-section').forEach(s => s.classList.remove('active'));
    document.getElementById(stepId).classList.add('active');
}

// --- MUSIQUE ET PLAYLIST ---
const audio = document.getElementById('bg-audio');
const musicToggle = document.getElementById('music-toggle');
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseIcon = document.getElementById('play-pause-icon');
const musicMenu = document.getElementById('music-menu');
const closeMenu = document.getElementById('close-menu');
const playlistContainer = document.getElementById('playlist-container');
const volumeSlider = document.getElementById('volume-slider');
const menuVolumeSlider = document.getElementById('menu-volume-slider');

const tracks = [
    { id: 'josman', title: "J'aime bien - Josman", url: "assets/music/j-aime-bien.m4a", cover: "assets/covers/josman.jpg" },
    { id: 'jazz', title: "Jazz Romantique", url: "assets/music/jazz.mp3", cover: "assets/covers/Beats.jpg" },
    { id: 'lofi', title: "Lofi Calm Vibes", url: "assets/music/Lofi.mp3", cover: "assets/covers/LoFi.jpg" },
    { id: 'calme', title: "Douceur Piano", url: "assets/music/piano.mp3", cover: "assets/covers/Piano.jpg" }
];

let currentTrackId = 'josman';
let isPlaying = false;

function initPlaylist() {
    playlistContainer.innerHTML = '';
    tracks.forEach(track => {
        const card = document.createElement('div');
        card.className = `music-card gap-4 group ${track.id === currentTrackId ? 'active' : ''}`;
        card.id = `track-${track.id}`;
        card.innerHTML = `
            <div class="flex-shrink-0 w-12 h-12 md:w-full md:h-auto md:aspect-square bg-rose-200 rounded-lg overflow-hidden shadow-sm">
                <img src="${track.cover}" alt="${track.title}" class="w-full h-full object-cover">
            </div>
            <div class="text-sm font-bold text-rose-600 line-clamp-1 md:line-clamp-2 md:mt-2 w-full">
                ${track.title}
            </div>
        `;
        card.onclick = () => selectTrack(track.id);
        playlistContainer.appendChild(card);
    });
}

function selectTrack(trackId) {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return;

    currentTrackId = trackId;
    audio.src = track.url;

    document.querySelectorAll('.music-card').forEach(c => c.classList.remove('active'));
    document.getElementById(`track-${trackId}`).classList.add('active');

    if (isPlaying) audio.play().catch(() => { });
}

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseIcon.innerText = "▶️";
    } else {
        if (!audio.src) selectTrack(currentTrackId);
        audio.play().catch(() => { });
        playPauseIcon.innerText = "⏸️";
    }
    isPlaying = !isPlaying;
}

musicToggle.addEventListener('click', () => musicMenu.classList.toggle('open'));
closeMenu.addEventListener('click', () => musicMenu.classList.remove('open'));
playPauseBtn.addEventListener('click', togglePlayPause);

// Slider volume
volumeSlider.addEventListener('input', (e) => { const vol = e.target.value * 0.5; audio.volume = vol; menuVolumeSlider.value = e.target.value; });
menuVolumeSlider.addEventListener('input', (e) => { const vol = e.target.value * 0.5; audio.volume = vol; volumeSlider.value = e.target.value; });

audio.src = tracks.find(t => t.id === currentTrackId).url;
audio.volume = 0.25;
initPlaylist();

// --- ÉPREUVE 1 ---
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const attemptsText = document.getElementById('attempts-text');
let yesScale = 1, attempts = 0;

function moveNoButton() {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 300;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
    yesScale += 0.15;
    yesBtn.style.transform = `scale(${Math.min(yesScale, 3)})`;
    attempts++;
    attemptsText.style.opacity = "1";
    if (attempts > 5) noBtn.innerText = "Vraiment ? 🥺";
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', moveNoButton);
yesBtn.addEventListener('click', () => { showStep('step-2'); startDodgeGame(); });

// --- ÉPREUVE 2 ---
let lives = 3, timer = 20, gameInterval, heartInterval, gameRunning = false;
const gameArea = document.getElementById('game-area');
const player = document.getElementById('player');
const livesDisplay = document.getElementById('lives-display');
const timerDisplay = document.getElementById('timer-display');

player.innerHTML = getCharacterSVG();

function startDodgeGame() {
    lives = 3; timer = 20; gameRunning = true;
    livesDisplay.innerText = "Vies : ❤️❤️❤️";
    timerDisplay.innerText = "20s";
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
    heart.innerText = "❤️"; heart.className = "absolute text-2xl select-none transition-all duration-3000 linear";
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
    document.getElementById('game-message-title').innerText = "Trop d'amour ! 😵💘";
    document.getElementById('game-message-body').innerText = "Le petit ours a besoin de repos... Réessaie !";
}

function winGame() {
    gameRunning = false; clearInterval(gameInterval); clearInterval(heartInterval);
    document.getElementById('game-message').classList.remove('hidden');
    document.getElementById('game-message-title').innerText = "Bravo ! ✨";
    document.getElementById('game-message-body').innerText = "Il a survécu à la tempête. Une dernière épreuve...";
    const btn = document.getElementById('game-retry-btn');
    btn.innerText = "Passer à la suite ➜";
    btn.onclick = () => { showStep('step-3'); initMaze(); };
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

// --- ÉPREUVE 3 : Labyrinthe ---
const mazeGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 0, 5, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 5, 1, 1, 0, 3, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 5, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let playerPos = { r: 1, c: 1 };
let collectedHearts = 0;
const totalHearts = 3;

function initMaze() {
    const container = document.getElementById('maze-container');
    container.innerHTML = ''; collectedHearts = 0; updateHeartMeter();
    mazeGrid.forEach((row, r) => {
        row.forEach((cell, c) => {
            const div = document.createElement('div');
            div.className = `w-8 h-8 md:w-12 md:h-12 flex items-center justify-center ${cell === 0 ? 'maze-wall' : 'maze-path'}`;
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

window.moveMaze = (dr, dc) => {
    if (document.getElementById('step-3').classList.contains('active')) {
        const nr = playerPos.r + dr, nc = playerPos.c + dc;
        if (mazeGrid[nr] && mazeGrid[nr][nc] !== 0) {
            playerPos = { r: nr, c: nc };
            updatePlayerPos();
        }
    }
}

window.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') moveMaze(-1, 0);
    if (e.key === 'ArrowDown') moveMaze(1, 0);
    if (e.key === 'ArrowLeft') moveMaze(0, -1);
    if (e.key === 'ArrowRight') moveMaze(0, 1);
});

// --- SUCCÈS ---
window.showSuccess = () => {
    showStep('step-success'); createHearts();
}

function createHearts() {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.innerText = ["❤️", "💖", "✨", "🌸", "💘"][Math.floor(Math.random() * 5)];
            h.className = "heart-particle text-3xl";
            h.style.left = Math.random() * 100 + "vw"; h.style.top = "-50px";
            document.body.appendChild(h);
            const anim = h.animate([
                { top: '-50px', transform: `rotate(0deg) translateX(0)` },
                { top: '110vh', transform: `rotate(360deg) translateX(${Math.random() * 100 - 50}px)` }
            ], { duration: 3000 + Math.random() * 3000, easing: 'linear' });
            anim.onfinish = () => h.remove();
        }, i * 150);
    }
}
