/* ==========================================
   Manish Kumar, Ph.D. - Executive Portfolio
   Interactive Mechanics & Scroll Animations
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Initialize Lucide Icons ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 2. Sticky Header Scroll Effect ---
    const header = document.querySelector('.header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // --- 3. Mobile Navigation Menu Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            
            // Toggle icon between 'menu' and 'x'
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons({
                    attrs: {
                        'data-lucide': isOpen ? 'x' : 'menu'
                    },
                    nameAttr: 'data-lucide',
                    icons: { x: lucide.icons.x, menu: lucide.icons.menu }
                });
            }
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons({
                        attrs: { 'data-lucide': 'menu' },
                        nameAttr: 'data-lucide',
                        icons: { menu: lucide.icons.menu }
                    });
                }
            });
        });
    }

    // --- 4. Interactive Value Matrix Tab Switcher ---
    const tabs = document.querySelectorAll('.surface-tab');
    const panes = document.querySelectorAll('.matrix-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const surfaceName = tab.getAttribute('data-surface');
            
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Remove active from all panes
            panes.forEach(p => p.classList.remove('active'));
            
            // Add active to current tab
            tab.classList.add('active');
            
            // Add active to matching pane
            const targetPane = document.getElementById(`pane-${surfaceName}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // --- 5. Active Link Highlight (Scrollspy) ---
    const sections = document.querySelectorAll('section[id]');
    
    const scrollspyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        link.classList.add('active-link');
                    } else {
                        link.classList.remove('active-link');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-30% 0px -60% 0px' // Trigger when section occupies the main viewport area
    });

    sections.forEach(section => scrollspyObserver.observe(section));

    // Add active-link styling in CSS dynamically if needed, let's inject it into style.css via simple rule:
    // .active-link { color: var(--primary) !important; }
    // (Let's make sure script.js highlights it, the css will back it up.)

    // --- 6. Scroll Entrance Animation (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.glass-card, .timeline-item, .section-header');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        root: null,
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-init');
        revealObserver.observe(el);
    });

    // --- 7. Mock Contact Form Submission ---
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Retrieve values
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            setTimeout(() => {
                // Remove form, render a clean success message
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;

                // Create success message element
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success-msg';
                successMsg.innerHTML = `
                    <i data-lucide="check-circle" style="color: var(--success); width: 24px; height: 24px;"></i>
                    <div>
                        <strong>Thank you, ${name}!</strong><br>
                        Your message has been logged. I will reach out at ${email} shortly.
                    </div>
                `;

                // Append and clear input fields
                contactForm.appendChild(successMsg);
                lucide.createIcons({
                    attrs: { style: 'color: var(--success); width: 24px; height: 24px;' },
                    nameAttr: 'data-lucide',
                    icons: { 'check-circle': lucide.icons['check-circle'] }
                });

                contactForm.reset();

                // Clear success message after 5 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 7000);
            }, 1200);
        });
    }
});
