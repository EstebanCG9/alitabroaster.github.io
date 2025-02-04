
const btnSi = document.getElementById('yesButton');
const btnNo = document.getElementById('noButton');

let index = -1;
let moveCount = 0;

// Secuencia de textos para el botón "Sí"
const letters = [
  "dime que si",
  "si porfavorcito",
  "hazme feliz",
  "no me dejes triste",
  "por favor, sí",
  "acepta mi invitación",
  "eres mi todo",
  "basta de negarme",
  "solo un sí"
];

// Arreglo de imágenes GIF para cambiar (puedes agregar o modificar URLs)
const gifImages = [
  "https://media1.tenor.com/m/-ptLXrkiRi4AAAAd/pug-vergonha-zap.gif",
  "https://c.tenor.com/YbjmlWL6C2kAAAAC/tenor.  gif",
  "https://media1.tenor.com/m/eJZCTIp-_5YAAAAC/puppy-dog.gif",
  "https://media1.tenor.com/m/yZyUW4dMJ9QAAAAd/pibble-gmail.gif",
  "https://media1.tenor.com/m/lgMX_EEn70QAAAAd/pibble-gmail.gif",
  "https://media1.tenor.com/m/LEHgkyYJfbAAAAAd/pibble.gif",
  "https://media1.tenor.com/m/cDJj3LEw0UIAAAAd/gmail-dog.gif",
  "https://media1.tenor.com/m/1lLvKVYglJsAAAAC/gmail-pibble.gif",
  "https://media1.tenor.com/m/izjHW_czepQAAAAd/gmail-pibble.gif"
  
];

// Crea el objeto Audio utilizando la ruta local
const duckSound = new Audio("patosound.mp3");
function shootConfetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        particleCount: count,
        spread: 70
    };

    confetti({
        ...defaults,
        angle: 60,
        startVelocity: 75
    });
    confetti({
        ...defaults,
        angle: 120,
        startVelocity: 75
    });
}

// Función para redirigir a la página "yes.html" al hacer click en el botón "Sí"
function nextPage() {
    window.location.href = "yes.html";
    
}

// Función para mover el botón "No", actualizar el texto del botón "Sí", cambiar la imagen GIF y reproducir el sonido
function moveButton() {
    // Cacheo de elementos DOM
    const noButton = document.getElementById("noButton");
    const yesButton = document.getElementById("yesButton");
    const gifImg = document.querySelector(".gif_container img");
    const container = document.querySelector(".container");

    // Validación de elementos críticos
    if (!noButton || !yesButton || !gifImg || !container) {
        console.error("Elementos críticos no encontrados!");
        return;
    }

    // Función para reproducir sonido con manejo de errores
    const playDuckSound = () => {
        try {
            duckSound.currentTime = 0;
            duckSound.play().catch(() => {
                console.warn("La reproducción automática fue bloqueada. Haz click primero en la página!");
            });
        } catch (error) {
            console.error("Error con el audio:", error);
        }
    };

    // Función para mover el botón con transición suave
    const moveNoButton = () => {
        noButton.style.transition = "all 0.3s ease-out"; // Transición suave
        
        const containerRect = container.getBoundingClientRect();
        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;

        // Cálculo seguro de posición
        const maxX = Math.max(0, containerRect.width - buttonWidth);
        const maxY = Math.max(0, containerRect.height - buttonHeight);

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        noButton.style.position = "absolute";
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    };

    // Función para actualizar texto del botón Sí
    const updateYesButtonText = () => {
        moveCount = (moveCount < letters.length) ? moveCount + 1 : letters.length;
        yesButton.innerText = (moveCount < letters.length) 
            ? letters[moveCount] 
            : "YA CHAU 😭";

        // Añadir efecto de escala al cambiar texto
        yesButton.style.transform = "scale(1.1)";
        setTimeout(() => { yesButton.style.transform = "scale(1)"; }, 200);
    };

    // Función para actualizar GIF
    const updateGif = () => {
        index = (index + 1) % gifImages.length;
        gifImg.style.opacity = 0; // Fade out
        
        setTimeout(() => {
            gifImg.src = gifImages[index];
            gifImg.style.opacity = 1; // Fade in
        }, 300);
    };

    // Ejecutar flujo completo
    playDuckSound();
    moveNoButton();
    updateYesButtonText();
    updateGif();

    // Añadir efecto de sacudida al contenedor después de 5 movimientos
    if (moveCount >= 5) {
        container.style.animation = "shake 0.5s";
        setTimeout(() => { container.style.animation = ""; }, 500);
    }
}

// Añadir al CSS:
/*

*/
function createCountdown() {
    const countdownContainer = document.createElement('div');
    countdownContainer.className = 'countdown-style';
    document.querySelector('.container').prepend(countdownContainer);

    function updateCountdown() {
        const now = new Date();
        let valentinesDay = new Date(now.getFullYear(), 1, 14); // Febrero es el mes 1 (0-index)
        
        // Si ya pasó este año, calcular para el próximo año
        if (now > valentinesDay) {
            valentinesDay = new Date(now.getFullYear() + 1, 1, 14);
        }

        const diff = valentinesDay - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownContainer.innerHTML = `
             <strong>⏳ Faltan ${days} días ${hours}h ${minutes}m ${seconds}s<br></strong> 
            <span class="heart">❤️</span> Para nuestro primer 14 de febrero <span class="heart">❤️</span>
        `;

        if (diff < 0) {
            countdownContainer.innerHTML = "¡Hoy es el día! 💖";
            clearInterval(countdownInterval);
        }
    }

    // Actualizar cada segundo
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamar inmediatamente para evitar retraso inicial
}

if (window.location.pathname.includes("yes.html")) {
    document.addEventListener('DOMContentLoaded', createCountdown);
}