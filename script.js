// Výběr prvků z DOMu
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const preloader = document.getElementById('preloader');

let lastScrollTop = 0;

// --- 1. FUNKCE PRO MOBILNÍ MENU ---

// Přepínání menu (Hamburger -> Křížek)
mobileMenu.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('is-active');
    navLinks.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', isActive ? 'true' : 'false');
});

// Zavření menu po kliknutí na odkaz (aby nezůstalo viset přes obsah)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
        navLinks.classList.remove('active');
    });
});


// --- 2. CHYTRÉ SCHOVÁVÁNÍ NAVBARU (SCROLL EFFECT) ---

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (navLinks.classList.contains('active')) {
        return;
    }

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.top = '-85px';
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.top = '0';
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(24, 24, 24, 0.98)';
            navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(24, 24, 24, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });


// --- 3. SMOOTH SCROLL (bonus pro plynulý dojem) ---

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();

        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


// --- 4. ANIMACE NA SCROLL ---

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.card, .member, .contact-box, h2, .hero h1, .hero p, .btn').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});


// --- 5. LOGIKA PRO JEMNÉ DROBNOSTI ---

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('is-active');
        mobileMenu.setAttribute('aria-expanded', 'false');
    }
});

window.addEventListener('load', () => {
    if (!preloader) return;
    preloader.classList.add('loaded');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 600);
});
