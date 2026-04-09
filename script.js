// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select elements for scroll reveal
const revealElements = document.querySelectorAll('.section-title, .skill-card, .project-card, .timeline-item, .contact-left, .contact-right');
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add logic to reveal elements
document.addEventListener('DOMContentLoaded', () => {
    const revealTargets = document.querySelectorAll('.reveal');
    revealTargets.forEach(target => {
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
    })
});

// Handle Formspree submission seamlessly
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending... <i data-lucide="loader"></i>';
        lucide.createIcons();
        
        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                btn.innerHTML = 'Message Sent! <i data-lucide="check"></i>';
                btn.style.background = '#10b981';
                lucide.createIcons();
                contactForm.reset();
            } else {
                btn.innerHTML = 'Failed to Send <i data-lucide="alert-circle"></i>';
                btn.style.background = '#ef4444';
                lucide.createIcons();
            }
        } catch (error) {
            btn.innerHTML = 'Network Error <i data-lucide="wifi-off"></i>';
            btn.style.background = '#ef4444';
            lucide.createIcons();
        }
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'var(--primary)';
            lucide.createIcons();
        }, 4000);
    });
}

// Add CSS classes for revealing elements through JS-injected style or by adding to style.css
const headStyle = document.createElement('style');
headStyle.innerHTML = `
    .reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
        padding: 0.5rem 0;
    }
`;
document.head.appendChild(headStyle);

// Certificate Modal Logic
function openCert(imgPath) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    
    if (modal && modalImg) {
        modalImg.src = imgPath;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
        lucide.createIcons(); // Refresh icons inside modal
    }
}

function closeCert() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    }
}

// Initializing Icons
lucide.createIcons();
