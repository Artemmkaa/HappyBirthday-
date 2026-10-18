const envelope = document.getElementById('envelope');
const overlay = document.getElementById('surprise');
const lines = document.querySelectorAll('.line');
const heartsContainer = document.querySelector('.hearts-container');

// Элементы видео-модалки
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
const closeVideo = document.getElementById('closeVideo');

// Фотки 1–45
const photos = [];
for (let i = 1; i <= 45; i++) photos.push(`${i}.jpg`);

// Летающие фотки
function createPhoto() {
    const img = document.createElement('img');
    img.src = photos[Math.floor(Math.random() * photos.length)];
    img.className = 'floating-photo';
    img.style.left = Math.random() * 90 + 'vw';
    img.style.animationDuration = (Math.random() * 8 + 10) + 's';
    img.onload = () => document.body.appendChild(img);
    setTimeout(() => img.remove(), 18000);
}
setInterval(createPhoto, 500);

// Взрыв сердечек
function explodeHearts(x, y) {
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'explosion-heart';
        heart.innerHTML = '❤️';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 150 + 50;

        heart.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        heart.style.setProperty('--y', Math.sin(angle) * distance + 'px');

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
}

// Клик по конверту
envelope.addEventListener('click', () => {
    const rect = envelope.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    explodeHearts(x, y);
    envelope.classList.add('open');

    // Открываем видео и запускаем
    setTimeout(() => {
        videoModal.classList.add('active');
        videoPlayer.currentTime = 0; // Сброс на начало
        videoPlayer.play();          // Воспроизведение
    }, 400);
});

// Закрытие видео
closeVideo.addEventListener('click', () => {
    videoModal.classList.remove('active');
    videoPlayer.pause(); // Пауза при закрытии
});

// Летающие сердечки
function createHeart() {
    const heart = document.createElement('span');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 300);

// Сюрприз
setTimeout(() => {
    overlay.classList.add('active');
    setTimeout(() => lines[0].classList.add('show'), 800);
    setTimeout(() => {
        lines[1].classList.remove('hidden');
        lines[1].classList.add('show');
    }, 3000);
    setTimeout(() => {
        lines[2].classList.remove('hidden');
        lines[2].classList.add('show');
    }, 5000);
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 9000);
}, 2000);