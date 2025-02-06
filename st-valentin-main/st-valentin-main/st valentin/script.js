
document.addEventListener("DOMContentLoaded", function() {
    // Cache tous les éléments avec la classe hidden au chargement
    document.querySelectorAll(".hidden").forEach(el => el.style.display = "none");

    const phrases = ["T'es sûre ???", "Vraiment sûre ?", "Pas de regrets ?", "😢", "Change d'avis !"];
    const oui = document.querySelector("#buttonOui");
    const non = document.querySelector("#buttonNon");
    const messageFinaloui = document.querySelector("#messageFinaloui");
    const messageFinalnon = document.querySelector("#messageFinalnon");
    const suivant = document.querySelector("#suivant");
    const epreuve1 = document.querySelector("#epreuve1");
    const epreuve2 = document.querySelector("#epreuve2");
    const music = document.getElementById("loveMusic");
    const avis = document.querySelector("#changeAvis")


    function getRandomPosition() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const randomX = Math.floor(Math.random() * (windowWidth - 200));
        const randomY = Math.floor(Math.random() * (windowHeight - 50));
        return { x: randomX, y: randomY };
    }

    function createHeart() {
        const heart = document.createElement('span');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.animationDuration = (3 + Math.random() * 2) + 's';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }

    let ouiScale = 1;
    let trys = 0;

    // Vérifie si un des deux messages est affiché
    function isMessageOpen() {
        return messageFinaloui.classList.contains("show") || messageFinalnon.classList.contains("show");
    }

    function maFonctionNon() { 
        if (isMessageOpen()) return;  // Bloque l'interaction si un message est affiché
        const position = getRandomPosition();

        ouiScale += 1;
        oui.style.transform = `scale(${ouiScale})`;
        trys += 1;
        non.innerHTML = phrases[Math.floor(Math.random() * phrases.length)];
        if (trys <= 10) {
            non.style.position = "absolute"; 
            non.style.left = position.x + "px";
            non.style.top = position.y + "px";
        } else {
            non.innerHTML = "bon d'accord j'abandonne";
            non.style.position = "absolute";  
            non.style.textAlign = "center";
            non.style.left = "50%";
        }
    }

    function toggleMessage(message) {
        // Cache tous les messages
        document.querySelectorAll(".hidden").forEach(el => el.style.display = "none");
        // Affiche le message souhaité
        if (message) 
        message.classList.add("show");
        message.classList.remove("hidden")
        message.style.display = "block"
    }

    function maFonctionNonClick() {
        if (isMessageOpen()) return;  // Bloque l'interaction si un message est affiché
        toggleMessage(messageFinalnon);
    }

    function maFonctionOui() {
        if (isMessageOpen()) return;  // Bloque l'interaction si un message est affiché

        toggleMessage(messageFinaloui);
        oui.disabled = true;
        music.play();
    }

    function maFonctionAvis(){
        messageFinalnon.classList.add("hidden");
        messageFinalnon.classList.remove("show");
        non.classList.remove("show");
        non.classList.add("hidden");
        oui.style.transform = 'scale(1)';
        ouiScale = 1
    }

    window.onload = function() {
        // On s'assure que les messages sont cachés au début
        epreuve2.classList.add("hidden")
        messageFinaloui.classList.add("hidden");
        messageFinalnon.classList.add("hidden");

        non.addEventListener("mouseover", maFonctionNon);
        oui.addEventListener("click", maFonctionOui);
        non.addEventListener("click", maFonctionNonClick);
        avis.addEventListener("click", maFonctionAvis);
        setInterval(createHeart, 500);

        oui.style.transition = "transform 0.3s ease";  
        non.style.transition = "top 0.3s ease, left 0.3s ease"; 
    }
});
