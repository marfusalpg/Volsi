// Počkejte, až se načte celý DOM
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobilní Menu ---
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Funkce pro otevření/zavření menu
    const toggleMenu = () => {
        menuToggle.classList.toggle('is-active');
        navLinks.classList.toggle('active');
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Zavřít menu, pokud se klikne na odkaz (pro one-pager)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Konverzní logika (Online rezervace) ---
    // Najdi všechna tlačítka pro rezervaci
    const bookingButtons = document.querySelectorAll('.bookingBtn');

    // URL rezervačního systému (zde nahradit skutečným odkazem, např. Reservio atd.)
    const externalBookingUrl = '#'; // Nyní placeholder '#'

    bookingButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (externalBookingUrl === '#') {
                alert('Zde bude integrován odkaz na váš online rezervační systém (např. Reservio, Bukza atd.). Zatím funguje jen jako ukázka.');
            } else {
                // Přesměrování na externí rezervační systém
                window.open(externalBookingUrl, '_blank');
            }
        });
    });

});