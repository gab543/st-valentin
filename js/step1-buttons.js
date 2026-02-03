// js/step1-buttons.js
import { showStep } from './ui.js';
import { showTutorial } from './tutorial.js';
import { startDodgeGame } from './step2-dodge.js';

export function initStep1() {
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
    }

    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);

    yesBtn.addEventListener('click', () => {
        showStep('step-2');
        showTutorial("Épreuve 2 💔", "Évite les cœurs brisés pendant 10 secondes !")
            .then(startDodgeGame);
    });
}
