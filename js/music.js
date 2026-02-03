// js/music.js
let currentTrackId = 'josman';
let isPlaying = false;

const tracks = [
    { id: 'josman', title: "J'aime bien - Josman", url: "assets/music/j-aime-bien.m4a", cover: "assets/covers/josman.jpg" },
    { id: 'jazz', title: "Jazz Romantique", url: "assets/music/jazz.mp3", cover: "assets/covers/Beats.jpg" },
    { id: 'lofi', title: "Lofi Calm Vibes", url: "assets/music/Lofi.mp3", cover: "assets/covers/LoFi.jpg" },
    { id: 'calme', title: "Douceur Piano", url: "assets/music/piano.mp3", cover: "assets/covers/Piano.jpg" }
];

export function initMusic() {
    const audio = document.getElementById('bg-audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPauseIcon = document.getElementById('play-pause-icon');
    const playlistContainer = document.getElementById('playlist-container');
    const volumeSlider = document.getElementById('volume-slider');
    const menuVolumeSlider = document.getElementById('menu-volume-slider');

    function selectTrack(trackId) {
        const track = tracks.find(t => t.id === trackId);
        currentTrackId = trackId;
        audio.src = track.url;
        if (isPlaying) audio.play().catch(() => { });
    }

    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
            playPauseIcon.innerText = "▶️";
        } else {
            audio.play().catch(() => { });
            playPauseIcon.innerText = "⏸️";
        }
        isPlaying = !isPlaying;
    }

    playPauseBtn.addEventListener('click', togglePlayPause);

    volumeSlider.addEventListener('input', e => {
        audio.volume = e.target.value * 0.5;
        menuVolumeSlider.value = e.target.value;
    });

    menuVolumeSlider.addEventListener('input', e => {
        audio.volume = e.target.value * 0.5;
        volumeSlider.value = e.target.value;
    });

    audio.src = tracks[0].url;
    audio.volume = 0.25;
}
