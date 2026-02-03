// js/success.js
import { playerName, crushWord, from } from './config.js';
import { showStep } from './ui.js';

export function showSuccess() {
    showStep('step-success');

    document.getElementById('final-message').innerText =
        `${playerName}… alors… tu veux être ${crushWord} pour de vrai ? 💍💖`;

    const message = `J’ai dit OUI ${from} 😳💘`;
    const shareBackBtn = document.getElementById('share-back-btn');

    if (navigator.share) {
        shareBackBtn.onclick = () => navigator.share({
            title: "Réponse à ta question 💖",
            text: message
        });
    } else {
        shareBackBtn.onclick = () => {
            navigator.clipboard.writeText(message);
            shareBackBtn.innerText = "Message copié ! 💖";
        };
    }
}

window.showSuccess = showSuccess;
