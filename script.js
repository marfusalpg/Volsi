// Výběr prvků z DOMu
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const preloader = document.getElementById('preloader');

let lastScrollTop = 0;

// Blokace scrollu při načítání
if (preloader) {
    document.body.style.overflow = 'hidden';
}

// --- 1. FUNKCE PRO MOBILNÍ MENU ---

mobileMenu.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('is-active');
    navLinks.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', isActive ? 'true' : 'false');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
        navLinks.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
    });
});

// --- 2. CHYTRÉ SCHOVÁVÁNÍ NAVBARU (SCROLL EFFECT) ---

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Pokud je otevřené mobilní menu, navbar neschováváme
    if (navLinks.classList.contains('active')) return;

    // Schování při scrollu dolů, zobrazení při scrollu nahoru
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    // Změna barvy a stínu při scrollu
    if (scrollTop > 50) {
        navbar.style.backgroundColor = 'rgba(10, 14, 41, 0.98)';
        navbar.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.55)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 14, 41, 0.9)';
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// --- 3. SMOOTH SCROLL ---

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// --- 4. ANIMACE NA SCROLL ---

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.service-box, .team-card, .contact-container, h2, .hero-title, .hero-subtitle, .btn').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// --- 5. LOGIKA PRO RESIZE ---

window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('is-active');
        mobileMenu.setAttribute('aria-expanded', 'false');
    }
});

// --- 6. PRELOADER ---

window.addEventListener('load', () => {
    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add('loaded');
        // Povolení scrollu
        document.body.style.overflow = '';

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }, 200); 
});