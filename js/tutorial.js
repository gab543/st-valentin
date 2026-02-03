// js/tutorial.js
export function showTutorial(title, text) {
    return new Promise(resolve => {
        document.getElementById('tutorial-title').innerText = title;
        document.getElementById('tutorial-text').innerText = text;
        const popup = document.getElementById('tutorial-popup');
        popup.classList.remove('hidden');
        popup.classList.add('flex');

        const btn = document.getElementById('yes-btn-tuto');
        btn.onclick = () => {
            popup.classList.add('hidden');
            resolve();
        };
    });
}
