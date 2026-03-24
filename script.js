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

// --- 6. SCROLL PROGRESS BAR ---

const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// --- 7. BACK TO TOP BUTTON ---

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- 8. COOKIE BANNER ---

const cookieBanner = document.getElementById('cookie-banner');
const acceptCookies = document.getElementById('accept-cookies');
const declineCookies = document.getElementById('decline-cookies');

window.addEventListener('load', () => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000);
    }
});

acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('show');
    setTimeout(() => {
        cookieBanner.classList.add('hidden');
    }, 300); // Match transition duration
    // Enable analytics here if needed
});

declineCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'false');
    cookieBanner.classList.remove('show');
    setTimeout(() => {
        cookieBanner.classList.add('hidden');
    }, 300); // Match transition duration
    // Disable non-essential cookies
});

// --- 9. ENHANCED ANIMATIONS FOR NEW SECTIONS ---

// Update the observer to include more elements
document.querySelectorAll('.portfolio-item, .testimonial-card, .process-step, .tech-item, .pricing-card, .faq-item, .newsletter-content').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// --- 10. PORTFOLIO HOVER EFFECTS ---

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// --- 11. PRICING CARD HOVER EFFECTS ---

document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('popular')) {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('popular')) {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// --- 12. SMOOTH SCROLL FOR ALL INTERNAL LINKS ---

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// --- 13. FORM VALIDATION ENHANCEMENT ---

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Prosím vyplňte všechna povinná pole.');
        }
    });
});

// --- 14. LAZY LOADING FOR IMAGES ---

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
}, { rootMargin: '50px' });

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// --- 15. TYPING ANIMATION FOR HERO TITLE (OPTIONAL) ---

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Uncomment to enable typing animation
// const heroTitle = document.querySelector('.hero-title');
// window.addEventListener('load', () => {
//     setTimeout(() => {
//         typeWriter(heroTitle, heroTitle.textContent, 50);
//     }, 1000);
// });
