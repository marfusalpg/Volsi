// A self-contained, accessible script to toggle the mobile menu.
        document.addEventListener('DOMContentLoaded', function () {
            const navbarToggle = document.getElementById('navbarToggle');
            const navbarMenu = document.getElementById('navbarMenu');

            if (navbarToggle && navbarMenu) {
                navbarToggle.addEventListener('click', function () {
                    // Toggle the .is-active class on both the toggle button and the menu
                    navbarToggle.classList.toggle('is-active');
                    navbarMenu.classList.toggle('is-active');

                    // Update the aria-expanded attribute for screen readers
                    const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
                    navbarToggle.setAttribute('aria-expanded', !isExpanded);
                });
            }
        });