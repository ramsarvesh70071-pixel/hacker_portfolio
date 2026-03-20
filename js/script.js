/* js/script.js - FIXED & OPTIMIZED */

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

// ========== HAMBURGER MENU - FIXED ==========
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links li a");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
        if (window.innerWidth <= 768) {
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        }
    });
    navLinksItems.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.style.overflow = 'auto';
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !hamburger?.contains(e.target) && 
        !navLinks?.contains(e.target) && 
        navLinks?.classList.contains('active')) {
        hamburger?.classList.remove("active");
        navLinks?.classList.remove("active");
        document.body.style.overflow = 'auto';
    }
});

// Handle resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks?.classList.remove('active');
        hamburger?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ========== THEME TOGGLE ==========
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.textContent = '🌙 Dark';
        updateParticlesForTheme('light');
    }
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        if (body.classList.contains('light-theme')) {
            themeToggle.textContent = '🌙 Dark';
            localStorage.setItem('theme', 'light');
            updateParticlesForTheme('light');
        } else {
            themeToggle.textContent = '☀️ Light';
            localStorage.setItem('theme', 'dark');
            updateParticlesForTheme('dark');
        }
    });
}

// Update particles color based on theme
function updateParticlesForTheme(theme) {
    if (typeof pJSDom !== 'undefined' && pJSDom[0] && pJSDom[0].pJS) {
        const pJS = pJSDom[0].pJS;
        if (theme === 'light') {
            pJS.particles.color.value = ['#0056b3', '#7000ff', '#ff6b6b'];
            pJS.particles.line_linked.color = '#0056b3';
            pJS.particles.opacity.value = 0.9;
            pJS.particles.line_linked.opacity = 0.7;
        } else {
            pJS.particles.color.value = ['#00f2ff', '#7000ff', '#ffd700'];
            pJS.particles.line_linked.color = '#00f2ff';
            pJS.particles.opacity.value = 0.8;
            pJS.particles.line_linked.opacity = 0.6;
        }
        pJS.particles.array.forEach(p => {
            p.color = pJS.particles.color.value[
                Math.floor(Math.random() * pJS.particles.color.value.length)
            ];
        });
        pJS.canvas.draw();
    }
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
        gsap.to(".hero h1", { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" });
        gsap.to(".hero p", { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" });
        gsap.to(".btn-cyber, .btn-secondary", { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: "power3.out" });
        gsap.utils.toArray('.card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: "top 85%" },
                y: 100, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "back.out(1.7)"
            });
        });
        gsap.utils.toArray('.progress-line span').forEach((bar) => {
            gsap.to(bar, {
                scrollTrigger: { trigger: bar, start: "top 90%" },
                width: bar.getAttribute('data-width'), duration: 1.5, ease: "power2.out"
            });
        });
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: { trigger: item, start: "top 80%" },
                x: i % 2 === 0 ? -100 : 100, opacity: 0, duration: 0.8, delay: i * 0.2, ease: "power3.out"
            });
        });
        gsap.utils.toArray('.section-title').forEach((title) => {
            gsap.from(title, {
                scrollTrigger: { trigger: title, start: "top 80%" },
                y: 50, opacity: 0, duration: 0.8, ease: "power3.out"
            });
        });
    }
}

// ========== PARTICLES.JS - BRIGHT & VIBRANT ==========
// ========== PARTICLES.JS - BRIGHT & VIBRANT (FIXED FOR ALL SCREENS) ==========
function initParticles() {
    if (typeof particlesJS !== 'undefined') {

        // Humne isMobile wala check hata diya hai taaki sab jagah same dikhe
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 100, // Mobile par bhi ab 100 particles dikhenge
                    density: { enable: true, value_area: 800 }
                },
                color: { value: ['#00f2ff', '#7000ff', '#ffd700'] },
                shape: {
                    type: 'circle',
                    stroke: { width: 2, color: '#00f2ff' }
                },
                opacity: {
                    value: 0.8,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false }
                },
                size: {
                    value: 4, // Particle ka size bada kar diya (Mobile/Desktop dono ke liye)
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 2, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 180, // Jaal ka gap (connections) bada rakha hai
                    color: '#00f2ff',
                    opacity: 0.6,
                    width: 2
                },
                move: {
                    enable: true,
                    speed: 3, // Movement speed fast rakhi hai
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: true, rotateX: 600, rotateY: 1200 }
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
                    grab: { distance: 200, line_linked: { opacity: 1 } },
                    push: { particles_nb: 5 }
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

// ========== CONTACT FORM ==========
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const formData = {
            firstName: this.querySelector('input[type="text"]').value,
            lastName: this.querySelectorAll('input[type="text"]')[1].value,
            email: this.querySelector('input[type="email"]').value,
            message: this.querySelector('textarea').value
        };

        setTimeout(() => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'form-message success';
            messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
            this.appendChild(messageDiv);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            this.reset();
            setTimeout(() => { messageDiv.style.display = 'none'; }, 5000);
        }, 2000);
    });
}

// ========== ACTIVE NAV LINK ==========
const currentLocation = location.href;
document.querySelectorAll('.nav-links a').forEach(item => {
    if (item.href === currentLocation) item.classList.add('active');
});

// ========== TYPING EFFECT ==========
const heroTitle = document.querySelector('.hero h1');
if (heroTitle && !heroTitle.dataset.typed) {
    heroTitle.dataset.typed = 'true';
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
    setTimeout(typeWriter, 1500);
}

// ========== IMAGE LAZY LOADING ==========
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('🚀 RSM Portfolio Loaded Successfully!');
