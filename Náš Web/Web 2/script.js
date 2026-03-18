// --- Mobilní Hamburger Menu ---
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Zavření menu po kliknutí na odkaz (na mobilu)
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

// --- Scroll animace (Fade-in efekt) ---
// Vytvoření observeru
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Spustí se, když je vidět 15% elementu
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Přidá třídu .visible, jakmile uživatel k elementu doscrolluje
            entry.target.classList.add('visible');
            // Zastaví sledování elementu po spuštění animace (aby se přehrála jen jednou)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Vybere všechny elementy s třídou fade-in a začne je sledovat
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));