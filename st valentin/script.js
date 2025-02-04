function getRandomPosition() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Générer des positions aléatoires
    const randomX = Math.floor(Math.random() * (windowWidth - 200)); // 200 = largeur approximative du bouton
    const randomY = Math.floor(Math.random() * (windowHeight - 50));  // 50 = hauteur approximative du bouton

    return { x: randomX, y: randomY };
}

function maFonctionNon() { 
    const non = document.querySelector("#buttonNon");
    const position = getRandomPosition();

    // Activation du positionnement
    non.style.position = "absolute"; 
    non.style.left = position.x + "px";
    non.style.top = position.y + "px";

    // Modification du texte
    non.innerHTML = "T'es sûr ???";
}

function maFonctionOui() {
    const oui = document.querySelector("#buttonOui");
    oui.innerHTML = "Yay! ❤️";
    alert("Je savais que tu dirais OUI ! 💕");
}

window.onload = function() {
    document.querySelector("#buttonNon").addEventListener("mouseover", maFonctionNon);
    document.querySelector("#buttonOui").addEventListener("click", maFonctionOui);
};