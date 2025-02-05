const phrases = ["T'es sûre ???", "Vraiment sûre ?", "Pas de regrets ?", "😢", "Change d'avis !"];

function getRandomPosition() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Générer des positions aléatoires
    const randomX = Math.floor(Math.random() * (windowWidth - 200)); // 200 = largeur approximative du bouton
    const randomY = Math.floor(Math.random() * (windowHeight - 50));  // 50 = hauteur approximative du bouton

    return { x: randomX, y: randomY };
}

function createHeart() {
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5000); // Supprime le cœur après 5 secondes
}

let ouiScale = 1;
let trys = 0;

function maFonctionNon() { 
    const oui= document.getElementById('buttonOui')
    const non = document.querySelector("#buttonNon");
    const position = getRandomPosition();

    

    ouiScale += 1; // Incrémente la taille
    oui.style.transform = `scale(${ouiScale})`;

    trys += 1;
    console.log(trys)
    // Texte aléatoire
    non.innerHTML = phrases[Math.floor(Math.random() * phrases.length)];
    if(trys <= 10){
        non.style.position = "absolute"; 
        non.style.left = position.x + "px";
        non.style.top = position.y + "px";
    }
    else{
        non.innerHTML = "bon d'accord j'abandonne";
        non.style.top = "50 %";
        non.style.left = "50 %";
    }

}

function maFonctionNonClick(){
    messageFinal2.classList.add('show');
}

function maFonctionOui() {
    const oui = document.querySelector("#buttonOui");
    const music = document.getElementById("loveMusic");

    messageFinal.classList.add("show");
    oui.disabled = true;
    music.play();
    //alert("Je savais que tu dirais OUI ! 💕");
}

window.onload = function() {
    document.querySelector("#buttonNon").addEventListener("mouseover", maFonctionNon)
    document.querySelector("#buttonOui").addEventListener("click", maFonctionOui);
    document.querySelector("#buttonNon").addEventListener("click", maFonctionNonClick)
    setInterval(createHeart, 500); // Crée un cœur toutes les 0.5s
    document.querySelector("#buttonOui").style.transition = "transform 0.3s ease";  // Transition douce pour le grossissement
    document.querySelector("#buttonNon").style.transition = "top 0.3s ease, left 0.3s ease"; // Transition douce pour le mouvement
    
}
