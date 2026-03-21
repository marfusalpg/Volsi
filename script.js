// Výběr prvků z DOMu
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const preloader = document.getElementById('preloader');

let lastScrollTop = 0;

// --- 1. FUNKCE PRO MOBILNÍ MENU s ---

// Přepínání menu (Hamburger -> Křížek)
mobileMenu.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('is-active');
    navLinks.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', isActive ? 'true' : 'false');
});

// Zavření menu po kliknutí na odkaz
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
        navLinks.classList.remove('active');
    });
});


// --- 2. CHYTRÉ SCHOVÁVÁNÍ NAVBARU (SCROLL EFFECT) ---
// Pro plynulost nezapomeň mít v CSS u .navbar: transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Pokud je menu aktivní (mobilní verze), neschováváme ho
    if (navLinks.classList.contains('active')) {
        return;
    }

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scroll DOLŮ - Schovat (vyjede nahoru o 100% své výšky)
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scroll NAHORU - Ukázat
        navbar.style.transform = 'translateY(0)';
        
        // Dynamická změna vzhledu pozadí při scrollu
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(10, 14, 41, 0.98)'; 
            navbar.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.55)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 14, 41, 0.9)';
            navbar.style.boxShadow = 'none';
        }
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
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});


// --- 4. ANIMACE NA SCROLL ---

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
        }
    });
}, { 
    rootMargin: '0px 0px -50px 0px',
    threshold: 0 
});

// Přidáno pro širší škálu elementů z tvého HTML
document.querySelectorAll('.service-box, .team-card, .contact-container, h2, .hero-title, .hero-subtitle, .btn').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});


// --- 5. LOGIKA PRO RESIZE A PRELOADER ---

window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
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
