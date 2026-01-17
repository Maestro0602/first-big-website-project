// ========================================
// KIRBY AUTOMOBILE - Car Detail Page Scripts
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Thumbnail gallery interaction
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');

    if (thumbnails.length && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Change main image with fade effect
                mainImage.style.opacity = '0.5';
                mainImage.src = this.src;
                setTimeout(() => {
                    mainImage.style.opacity = '1';
                }, 150);
            });
        });
    }

    // Button click handlers
    const contactBtn = document.getElementById('contactBtn');
    const testDriveBtn = document.getElementById('testDriveBtn');

    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            contactBtn.style.transform = 'scale(0.97)';
            setTimeout(() => {
                contactBtn.style.transform = '';
                alert('Thank you for your interest! Our team will contact you within 24 hours.');
            }, 150);
        });
    }

    if (testDriveBtn) {
        testDriveBtn.addEventListener('click', () => {
            testDriveBtn.style.transform = 'scale(0.97)';
            setTimeout(() => {
                testDriveBtn.style.transform = '';
                alert('Request submitted! We will reach out to schedule your viewing.');
            }, 150);
        });
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add entrance animation to spec items
    const specItems = document.querySelectorAll('.spec-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    if (specItems.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 80);
                }
            });
        }, observerOptions);

        specItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(15px)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            observer.observe(item);
        });
    }

    // Feature items animation
    const featureItems = document.querySelectorAll('.feature-item');
    if (featureItems.length) {
        featureItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-15px)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 80 * index + 300);
        });
    }

    console.log('%c🚗 Kirby Automobile Detail Page', 'color: #fff; background: #000; font-size: 14px; padding: 8px;');
});