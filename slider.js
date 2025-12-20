const track = document.querySelector(".video-track");
const videos = document.querySelectorAll(".slide-video");

let index = 0;
const interval = 8000; // 8 seconds
let autoSlideTimer;

// Create navigation controls
const controlsHTML = `
    <div class="slider-controls">
        <button class="slider-btn prev-btn">‹</button>
        <div class="slider-indicators">
            ${Array.from(videos).map((_, i) => `
                <div class="indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
            `).join('')}
        </div>
        <button class="slider-btn next-btn">›</button>
    </div>
    <div class="progress-bar">
        <div class="progress-fill"></div>
    </div>
`;

document.querySelector('.video-slider').insertAdjacentHTML('beforeend', controlsHTML);

const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const progressFill = document.querySelector('.progress-fill');

function updateIndicators() {
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function resetProgress() {
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    setTimeout(() => {
        progressFill.style.transition = `width ${interval}ms linear`;
        progressFill.style.width = '100%';
    }, 50);
}

function slideTo(i) {
    index = i;
    // Calculate percentage for translation
    const percentage = (i / videos.length) * 100;
    track.style.transform = `translateX(-${percentage}%)`;

    // Pause all videos and reset
    videos.forEach((video) => {
        video.pause();
        video.currentTime = 0;
    });

    // Play current video
    const currentVideo = videos[i];
    if (currentVideo) {
        const playPromise = currentVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.log("Video play failed:", error);
            });
        }
    }

    updateIndicators();
    resetProgress();
    restartAutoSlide();
}

function nextSlide() {
    const newIndex = (index + 1) % videos.length;
    slideTo(newIndex);
}

function prevSlide() {
    const newIndex = (index - 1 + videos.length) % videos.length;
    slideTo(newIndex);
}

function restartAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, interval);
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

indicators.forEach((indicator) => {
    indicator.addEventListener('click', (e) => {
        const newIndex = parseInt(e.target.dataset.index);
        slideTo(newIndex);
    });
});

// Start slider
slideTo(0);

// ========== FEATURE CARS SLIDER ==========
const carsContainer = document.querySelector('.cars-container');
const carCards = document.querySelectorAll('.car-card');
const carDots = document.querySelectorAll('.car-dot');
const prevCarBtn = document.querySelector('.prev-car');
const nextCarBtn = document.querySelector('.next-car');

let currentCarIndex = 0;

function updateCarDots() {
    carDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentCarIndex);
    });
}

function slideToCard(index) {
    currentCarIndex = index;
    // Calculate translation: each card width + gap between cards
    const cardWidth = carCards[0].offsetWidth;
    const gap = 100; // This matches the gap in CSS
    const translateX = index * (cardWidth + gap);
    carsContainer.style.transform = `translateX(-${translateX}px)`;
    updateCarDots();
}

function nextCar() {
    const newIndex = (currentCarIndex + 1) % carCards.length;
    slideToCard(newIndex);
}

function prevCar() {
    const newIndex = (currentCarIndex - 1 + carCards.length) % carCards.length;
    slideToCard(newIndex);
}

// Event listeners for car navigation
if (prevCarBtn && nextCarBtn) {
    prevCarBtn.addEventListener('click', prevCar);
    nextCarBtn.addEventListener('click', nextCar);
}

carDots.forEach((dot, index) => {
    dot.addEventListener('click', () => slideToCard(index));
});

// Recalculate on window resize
window.addEventListener('resize', () => {
    slideToCard(currentCarIndex);
});