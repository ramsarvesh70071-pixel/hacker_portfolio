/* js/script.js - Complete with All Features */

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
        follower.style.transform = 'scale(1.5)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
    });
}

// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const fill = document.querySelector('.progress-fill');
    const preloader = document.getElementById('preloader');

    if (fill && preloader) {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initAnimations();
                    initParticles();
                }, 500);
            } else {
                width += 5;
                fill.style.width = width + '%';
            }
        }, 50);
    }
});

// ========== HAMBURGER MENU ==========
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links li a");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    navLinksItems.forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    }));
}

// ========== THEME TOGGLE ==========
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

if (themeToggle) {
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.textContent = '🌙 Dark';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');

        if (body.classList.contains('light-theme')) {
            themeToggle.textContent = '🌙 Dark';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.textContent = '☀️ Light';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ========== SCROLL TO TOP ==========
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== GSAP ANIMATIONS ==========
function initAnimations() {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animations
        gsap.to(".hero h1", { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" });
        gsap.to(".hero p", { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" });
        gsap.to(".btn-cyber, .btn-secondary", { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: "power3.out" });

        // Card Animations
        gsap.utils.toArray('.card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: "back.out(1.7)"
            });
        });

        // Skill Bars Animation
        gsap.utils.toArray('.progress-line span').forEach((bar) => {
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: "top 90%",
                },
                width: bar.getAttribute('data-width'),
                duration: 1.5,
                ease: "power2.out"
            });
        });

        // Timeline Animation
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                },
                x: i % 2 === 0 ? -100 : 100,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2,
                ease: "power3.out"
            });
        });

        // Section Titles
        gsap.utils.toArray('.section-title').forEach((title) => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    }
}

// ========== PARTICLES.JS INIT ==========
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00f2ff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00f2ff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}

// ========== MAGNETIC BUTTONS ==========
const buttons = document.querySelectorAll('.btn-cyber, .btn-secondary, .submit-btn, .download-resume-btn');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ========== CONTACT FORM (EmailJS) ==========
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    // Initialize EmailJS (Replace YOUR_USER_ID with your actual EmailJS User ID)
    // emailjs.init("YOUR_USER_ID");

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Get form values
        const formData = {
            firstName: this.querySelector('input[type="text"]').value,
            lastName: this.querySelectorAll('input[type="text"]')[1].value,
            email: this.querySelector('input[type="email"]').value,
            message: this.querySelector('textarea').value
        };

        // Simulate sending (Replace with actual EmailJS code)
        setTimeout(() => {
            // Success
            const messageDiv = document.createElement('div');
            messageDiv.className = 'form-message success';
            messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
            this.appendChild(messageDiv);

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            this.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);

            // Actual EmailJS Code (Uncomment and add your credentials)
            emailjs.init("YOUR_USER_ID");
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: formData.firstName + ' ' + formData.lastName,
                from_email: formData.email,
                message: formData.message
            })
            .then(() => {
                // Success handling
            })
            .catch((err) => {
                // Error handling
                const messageDiv = document.createElement('div');
                messageDiv.className = 'form-message error';
                messageDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send. Please try again.';
                this.appendChild(messageDiv);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
            
        }, 2000);
    });
}

// ========== ACTIVE NAV LINK ==========
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.nav-links a');

menuItems.forEach(item => {
    if (item.href === currentLocation) {
        item.classList.add('active');
    }
});

// ========== TYPING EFFECT FOR HERO ==========
const heroTitle = document.querySelector('.hero h1');

if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typing after preloader
    setTimeout(typeWriter, 1500);
}

// ========== IMAGE LAZY LOADING ==========
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ========== COUNTUP ANIMATION FOR STATS ==========
function animateCountUp(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Initialize countup on scroll
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCountUp(entry.target, target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statObserver.observe(stat));
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

console.log('🚀 RSM Portfolio Loaded Successfully!');