// --- PERSONNALISATION VIA LE LIEN ---
const urlParams = new URLSearchParams(window.location.search);
const playerName = urlParams.get('name') || "toi";
const gender = urlParams.get('gender') || "x"; // f, m, x
const from = urlParams.get('sender') || "ton admirateur secret";

// Petits ajustements de texte selon genre
let crushWord = "mon amour";
if (gender === "m") crushWord = "mon valentin";
if (gender === "f") crushWord = "ma valentine";


// --- PERSONNAGE SVG ---


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
const yesBtnTuto = document.getElementById('yes-btn-tuto');
const shareBackBtn = document.getElementById('share-back-btn');

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
//-- POP-UP TUTORIEL ---
function showTutorial(title, text) {
    return new Promise((resolve) => {
        document.getElementById('tutorial-title').innerText = title;
        document.getElementById('tutorial-text').innerText = text;
        document.getElementById('tutorial-popup').classList.remove('hidden');
        document.getElementById('tutorial-popup').classList.add('flex');

        // Ajoutez un écouteur d'événements pour fermer le tutoriel
        document.getElementById('yes-btn-tuto').addEventListener('click', () => {
            closeTutorial();
            resolve(); // Résoudre la promesse lorsque le tutoriel est fermé
        });
    });
}

function closeTutorial() {
    document.getElementById('tutorial-popup').classList.add('hidden');
}

window.addEventListener('load', () => {
    document.getElementById('main-title').innerText =
        `${playerName}… veux-tu être ${crushWord} ? 💘`
    document.querySelector('title').innerText = `${crushWord} ❤️`;
    showTutorial(
        "Épreuve 1 💘",
        "Essaie de cliquer sur NON 😏… ou choisis la bonne réponse 💖"
    );
});


yesBtnTuto.addEventListener('click', () => {
    closeTutorial();
});


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
yesBtn.addEventListener('click', () => {
    showStep('step-2');
    showTutorial(
        "Épreuve 2 💔",
        "Déplace le petit ours avec ta souris ou ton doigt et évite les cœurs brisés ! Tiens 10 secondes !"
    ).then(() => {
        startDodgeGame(); // Lancer le jeu après la confirmation du tutoriel
    });
});

// --- ÉPREUVE 2 ---

// --- ÉPREUVE 3 : Labyrinthe ---

// --- SUCCÈS ---
window.showSuccess = () => {
    showStep('step-success');
    document.getElementById('final-message').innerText =
        `${playerName}… alors… tu veux être mon ${crushWord} pour de vrai ? 💍💖`;
    createHearts();


    const message = `J’ai dit OUI ${from} 😳💘`;

    if (navigator.share) {
        shareBackBtn.onclick = () => {
            navigator.share({
                title: "Réponse à ta question 💖",
                text: message
            });
        };
    } else {
        // fallback copier
        shareBackBtn.onclick = () => {
            navigator.clipboard.writeText(message);
            shareBackBtn.innerText = "Message copié ! 💖";
            setTimeout(() => shareBackBtn.innerText = "Lui envoyer ma réponse 💌", 2000);
        };
    }
};

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
