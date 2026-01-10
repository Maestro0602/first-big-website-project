// Thumbnail gallery interaction
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('mainImage');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        this.classList.add('active');
        
        // Change main image
        mainImage.src = this.src;
        
        // Add flash effect
        mainImage.style.opacity = '0.5';
        setTimeout(() => {
            mainImage.style.opacity = '1';
        }, 200);
    });
});

// Animated price counter
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = progress * (end - start) + start;
        element.textContent = '$' + value.toFixed(1) + 'M';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate price on page load
const priceElement = document.getElementById('price');
window.addEventListener('load', () => {
    animateValue(priceElement, 0, 30.5, 2000);
});

// Button click handlers
const contactBtn = document.getElementById('contactBtn');
const testDriveBtn = document.getElementById('testDriveBtn');

contactBtn.addEventListener('click', () => {
    // Add ripple effect
    contactBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        contactBtn.style.transform = 'translateY(-3px)';
    }, 100);
    
    // Alert (you can replace this with actual functionality)
    setTimeout(() => {
        alert('Contact form would open here. This is a demo.');
    }, 200);
});

testDriveBtn.addEventListener('click', () => {
    // Add ripple effect
    testDriveBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        testDriveBtn.style.transform = 'translateY(0)';
    }, 100);
    
    // Alert (you can replace this with actual functionality)
    setTimeout(() => {
        alert('Test drive scheduler would open here. This is a demo.');
    }, 200);
});

// Parallax effect for orbs (optional enhancement)
document.addEventListener('mousemove', (e) => {
    const orb1 = document.querySelector('.orb1');
    const orb2 = document.querySelector('.orb2');
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Subtle parallax movement
    orb1.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    orb2.style.transform = `translate(${-mouseX * 15}px, ${-mouseY * 15}px)`;
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add entrance animation to spec items
const specItems = document.querySelectorAll('.spec-item');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Initial state for animation
specItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Feature items animation
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, 100 * index + 500);
});

// Add glitch effect to title on hover (optional cool effect)
const carTitle = document.querySelector('.car-title');
carTitle.addEventListener('mouseenter', () => {
    carTitle.style.animation = 'glitch 0.3s ease';
});

carTitle.addEventListener('animationend', () => {
    carTitle.style.animation = '';
});

// Add glitch keyframe dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);

// Console log for developers
console.log('%c🚗 Futuristic Car Detail Page Loaded', 'color: #fff; background: #000; font-size: 16px; padding: 10px; font-family: Orbitron');
console.log('%cAll interactive features enabled!', 'color: #aaa; font-size: 12px;');