// --- 1. Countdown Timer Logic ---
// UPDATED YEAR TO 2026: Targets midnight on August 13th of this year
const birthdayDate = new Date("2026-08-13T00:00:00").getTime();

const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display outputs
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // If countdown expires (August 13, 2026 hits)
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center;">
                <h3 style="color:#e05375; font-size:2.5rem; font-family:'Dancing Script', cursive; margin-bottom: 10px;">
                    🎉 Happy 18th Birthday, My Queen! 🎉
                </h3>
                <p style="font-size: 1.2rem; font-weight: 600; color: #dfb15b;">
                    Official Chapter 18 • Cheers to 18 Years of Absolute Perfection! ✨
                </p>
            </div>
         `;
    }

}, 1000);

// --- 2. Background Floating Hearts Generator ---
function createHeart() {
    const heartBg = document.getElementById('heartBg');
    if (!heartBg) return;

    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    
    // Randomize choice of emojis for visual texture
    const heartTypes = ['❤️', '💖', '💝', '💕', '🌸'];
    heart.innerText = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    
    // Random position and scaling variables
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 5 + 's'; // 5s to 8s range
    heart.style.fontSize = Math.random() * 15 + 15 + 'px'; // 15px to 30px range
    
    heartBg.appendChild(heart);

    // Remove element safely after animation finishes
    setTimeout(() => {
        heart.remove();
    }, 8000);
}
// Generate a floating entity every 400 milliseconds
setInterval(createHeart, 400);

// --- 3. Background Audio Control Logic ---
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const controlText = document.querySelector("#audioControl .text");

    if (music.paused) {
        music.play().catch(err => console.log("Audio playback waiting for browser click interaction."));
        controlText.innerText = "Pause Music";
    } else {
        music.pause();
        controlText.innerText = "Play Music";
    }
}

// --- 4. Interactive Surprise Modal Toggles ---
function revealSecret(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    
    // Automatically pause voice player if closing the audio modal box
    if(modalId === 'audio-modal') {
        const player = document.querySelector('.voice-note-player');
        if(player) player.pause();
    }
}

// Close modal instantly if clicking outside the card window area
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        const player = document.querySelector('.voice-note-player');
        if(player) player.pause();
    }
}

// --- 5. Password Security Lock ---
function checkPassword() {
    const userInput = document.getElementById("passwordInput").value;
    // CHANGE THIS: Put your desired password inside the quotes (keeps it lowercase)
    const correctPassword = "machakos"; 

    if (userInput.toLowerCase() === correctPassword) {
        // Fade out and remove the lock screen instantly if correct
        const lockScreen = document.getElementById("lockscreen");
        lockScreen.style.transition = "opacity 0.5s ease";
        lockScreen.style.opacity = "0";
        setTimeout(() => {
            lockScreen.remove();
        }, 5000);
    } else {
        // Show error message if incorrect
        document.getElementById("loginError").style.display = "block";
    }
}

// Allow pressing the 'Enter' key to unlock as well
document.getElementById("passwordInput")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
});
