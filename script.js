// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const contactForm = document.getElementById('contact-form');
const calculateBmiBtn = document.getElementById('calculate-bmi');
const bmiValue = document.getElementById('bmi-value');
const bmiCategory = document.getElementById('bmi-category');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        // Close mobile menu after clicking
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Testimonial slider
let currentSlide = 0;

function showSlide(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    showSlide(currentSlide);
}

// Auto slide testimonials
setInterval(nextSlide, 5000);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// BMI Calculator
calculateBmiBtn.addEventListener('click', () => {
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
    const weight = parseFloat(document.getElementById('weight').value);

    if (height > 0 && weight > 0) {
        const bmi = (weight / (height * height)).toFixed(1);
        bmiValue.textContent = bmi;

        let category = '';
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi < 25) {
            category = 'Normal weight';
        } else if (bmi < 30) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }
        bmiCategory.textContent = category;
    } else {
        bmiValue.textContent = '--';
        bmiCategory.textContent = 'Please enter valid values';
    }
});

// Disable default form submission path and rely on platform buttons
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    return false;
});

// WhatsApp and Email contact buttons
const whatsappSend = document.getElementById('whatsapp-send');
const emailSend = document.getElementById('email-send');

function getContactData() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    return { name, email, phone, message };
}

whatsappSend.addEventListener('click', () => {
    const { name, email, phone, message } = getContactData();
    const baseText = `Hey GymPro!%0AI'd like more info about membership and training.%0A%0AName: ${encodeURIComponent(name || 'N\/A')}%0AEmail: ${encodeURIComponent(email || 'N\/A')}%0APhone: ${encodeURIComponent(phone || 'N\/A')}%0AMessage: ${encodeURIComponent(message || 'N\/A')}`;
    const url = `https://wa.me/919492740785?text=${baseText}`;

    window.open(url, '_blank');
});

emailSend.addEventListener('click', () => {
    const { name, email, phone, message } = getContactData();
    const subject = encodeURIComponent('GymPro Inquiry');
    const body = encodeURIComponent(`Hello GymPro team,\n\nI'd like to connect regarding membership and training.\n\nName: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nPhone: ${phone || 'N/A'}\nMessage: ${message || 'N/A'}\n\nAddress: Kalimandir Main Rd, near HP Petrol Bunk, Abhyudaya Nagar, Sun City, Bandlaguda Jagir, Hyderabad, Telangana 500086`);
    const mailtoLink = `mailto:info@gympro.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Add fade-in class to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Lazy loading images
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';

        e.target.style.position = 'relative';
        e.target.style.overflow = 'hidden';
        e.target.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Gallery hover zoom effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Program card hover effects
document.querySelectorAll('.program-card, .trainer-card, .pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Initialize
function initPanorama() {
    const panoramaContainer = document.getElementById('panorama-viewer');
    if (!panoramaContainer || typeof PANOLENS === 'undefined') {
        return;
    }

    const viewer = new PANOLENS.Viewer({
        container: panoramaContainer,
        output: 'overlay',
        autoRotate: false,
        autoRotateSpeed: 0.3,
        autoHideInfospot: false,
        cameraFov: 70,
        controlBar: true,
        controlButtons: ['fullscreen', 'setting', 'video', 'camera'],
        enableReticle: false,
        enableZoom: true,
        zoomSpeed: 1.2,
        enablePan: true
    });

    const panorama = new PANOLENS.ImagePanorama('around.jpg');

    panorama.addEventListener('progress', (event) => {
        const progress = Math.round(event.progress.loaded / event.progress.total * 100);
        // Optional: show progress or loader
        // console.log('Panorama loading: ' + progress + '%');
    });

    panorama.addEventListener('load', () => {
        console.info('Panorama loaded successfully from around.jpg');
    });

    panorama.addEventListener('error', (evt) => {
        console.error('Panorama failed to load around.jpg; this often happens with file:// URL and CORS. ' +
            'Serve the site over http://localhost to fix. Falling back to online test panorama.');

        panorama.dispose();

        const fallbackPanorama = new PANOLENS.ImagePanorama('https://pchen66.github.io/Panolens/examples/img/equirectangular/royal_esplanade.jpg');
        fallbackPanorama.addEventListener('load', () => {
            console.info('Fallback panorama loaded successfully.');
        });
        viewer.add(fallbackPanorama);
    });

    panorama.addEventListener('enter', () => {
        // Ensure overlay stays visible and text is on top
        panoramaContainer.style.opacity = '1';
    });

    viewer.add(panorama);

    // Allow page scrolling even when mouse is on panorama
    panoramaContainer.style.pointerEvents = 'auto';
    panoramaContainer.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            // allow ctrl+wheel zoom
            return;
        }
        e.preventDefault();
        window.scrollBy({ top: e.deltaY, behavior: 'smooth' });
    }, { passive: false });
}

function stylePanolensUI() {
    const selectors = [
        '[class*="panolens"]',
        '.panolens-control-panel',
        '.panolens-setting-list',
        '.panolens-setting-item',
        '.panolens-setting',
        '.panolens-control',
        '.panolens-label',
        '.panolens-tooltip',
        '.panolens-views',
        '.panolens-content'
    ];
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.background = 'rgba(0, 0, 0, 0.9)';
            el.style.color = '#fff';
            el.style.border = '1px solid rgba(255, 255, 255, 0.35)';
            el.style.textShadow = '0 0 4px rgba(0,0,0,0.8)';
        });
    });

    document.querySelectorAll('.panolens-setting-list li, .panolens-setting-item').forEach(el => {
        el.style.background = 'rgba(0,0,0,0.4)';
        el.style.color = '#fff';
        el.style.fontWeight = '600';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
    initPanorama();

    // Apply immediately and reactively for dynamically inserted Panolens UI.
    stylePanolensUI();
    const observer = new MutationObserver(() => stylePanolensUI());
    observer.observe(document.body, { childList: true, subtree: true });
});