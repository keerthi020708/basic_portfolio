// ==========================================================================
// Keerthi S - Portfolio Interactive JavaScript
// Functions: Theme Toggle, Navbar Scroll, Toast Notifications, Copy to Clipboard
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. Dark / Light Theme Toggle
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme or default to light theme
    const savedTheme = localStorage.getItem('keerthi_theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('keerthi_theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            showToast('Switched to Light Theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('keerthi_theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            showToast('Switched to Dark Theme');
        }
    });

    // ----------------------------------------------------------------------
    // 2. Mobile Menu Toggle
    // ----------------------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // ----------------------------------------------------------------------
    // 3. Active Link & Scroll Top Button on Scroll
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        // Show / Hide Back-to-Top Button
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});

// --------------------------------------------------------------------------
// 4. Utility Functions (Copy to Clipboard & Toast Notifications)
// --------------------------------------------------------------------------

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    
    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function copyText(text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(successMsg || 'Copied to clipboard!');
        }).catch(() => {
            fallbackCopy(text, successMsg);
        });
    } else {
        fallbackCopy(text, successMsg);
    }
}

function fallbackCopy(text, successMsg) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand('copy');
        showToast(successMsg || 'Copied to clipboard!');
    } catch (err) {
        showToast('Unable to copy automatically.');
    }
    document.body.removeChild(tempInput);
}

function showLinkedInNotice() {
    showToast('LinkedIn profile will be updated soon!');
}
