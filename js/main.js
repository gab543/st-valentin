// js/main.js
import { playerName, crushWord } from './config.js';
import { initMusic } from './music.js';
import { initStep1 } from './step1-buttons.js';
import { showTutorial } from './tutorial.js';
import { showSuccess } from './success.js';

window.addEventListener('load', () => {
    document.getElementById('main-title').innerText =
        `${playerName}… veux-tu être ${crushWord} ? 💘`;
    document.querySelector('title').innerText = `${crushWord} ❤️`;

    initMusic();
    initStep1();

    showTutorial(
        "Épreuve 1 💘",
        "Essaie de cliquer sur NON 😏… ou choisis la bonne réponse 💖"
    );
});
