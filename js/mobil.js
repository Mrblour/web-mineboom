// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Desktop Dropdown Logic
const foroBtn = document.getElementById('foro-dropdown-btn');
const foroMenu = document.getElementById('foro-dropdown-menu');
const foroArrow = document.getElementById('foro-arrow');

if (foroBtn && foroMenu) {
    foroBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        foroMenu.classList.toggle('hidden');
        foroArrow.classList.toggle('rotate-180');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!foroBtn.contains(e.target) && !foroMenu.contains(e.target)) {
            foroMenu.classList.add('hidden');
            foroArrow.classList.remove('rotate-180');
        }
    });
}