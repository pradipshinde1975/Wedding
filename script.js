// Initialize AOS Animations
AOS.init({
    once: true,
    duration: 1000,
    offset: 100
});

// Constantly Floating & Twinkling Gold Sparks on Screen
const canvas = document.getElementById('sparklesCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const sparklesCount = 45;
const sparkles = [];

for (let i = 0; i < sparklesCount; i++) {
    sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.5 ? 'rgba(255, 215, 0, ' : 'rgba(243, 229, 171, ',
        alpha: Math.random(),
        speedY: (Math.random() * 0.6 + 0.2) * -1,
        speedX: (Math.random() - 0.5) * 0.4,
        fadeSpeed: Math.random() * 0.02 + 0.008
    });
}

function animateSparkles() {
    ctx.clearRect(0, 0, width, height);

    sparkles.forEach(s => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.alpha += s.fadeSpeed;

        if (s.alpha > 1 || s.alpha < 0) {
            s.fadeSpeed = -s.fadeSpeed;
        }

        if (s.y < 0) {
            s.y = height + 10;
            s.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.abs(s.alpha) + ')';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFD700';
        ctx.fill();
    });

    requestAnimationFrame(animateSparkles);
}

animateSparkles();

// Countdown Timer Logic
// Wedding Date: 15 November 2026, 12:00 PM
const weddingDate = new Date("Nov 15, 2026 12:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("daysCount").innerText = "00";
        document.getElementById("hoursCount").innerText = "00";
        document.getElementById("minutesCount").innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("daysCount").innerText = String(days).padStart(2, '0');
    document.getElementById("hoursCount").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutesCount").innerText = String(minutes).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Full-Size Lightbox Modal Functions
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(src, title) {
    lightboxImg.src = src;
    lightboxCaption.innerText = title;
    lightboxModal.classList.remove('hidden');
    lightboxModal.classList.add('flex');
}

function closeLightbox() {
    lightboxModal.classList.remove('flex');
    lightboxModal.classList.add('hidden');
}

// Custom Short Film Video Upload Handler
const filmUpload = document.getElementById('filmUpload');
if (filmUpload) {
    filmUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            const shortFilmVideo = document.getElementById('shortFilmVideo');
            shortFilmVideo.src = fileURL;
            shortFilmVideo.play();
        }
    });
}