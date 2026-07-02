// ============================================
// FOOTER YEAR
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// NAVBAR: scrolled state + mobile toggle
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================================
// SCROLL PROGRESS BAR + navbar shadow + active link
// ============================================
const progressBar = document.getElementById('scrollProgress');
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function onScroll() {
    // progress
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';

    // navbar background
    navbar.classList.toggle('scrolled', scrollTop > 20);

    // active nav link
    let currentId = sections[0]?.id;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 140) currentId = section.id;
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============================================
// STAT COUNTERS (animate once on view)
// ============================================
const statEls = document.querySelectorAll('.stat-value');

function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + (progress === 1 ? suffix : '');
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

statEls.forEach(el => statObserver.observe(el));

// ============================================
// SCROLL-TRIGGERED REVEALS (sections + cards)
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('in-view'), i * 80);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.card, .skill-card').forEach(el => cardObserver.observe(el));

// ============================================
// CONTACT FORM — AJAX submit via FormSubmit
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;

    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formStatus.textContent = "Message sent — I'll get back to you soon.";
            formStatus.classList.add('success');
            contactForm.reset();
        } else {
            throw new Error('Request failed');
        }
    } catch (err) {
        formStatus.textContent = "Something went wrong. Please email me directly instead.";
        formStatus.classList.add('error');
    } finally {
        submitBtn.disabled = false;
        btnText.textContent = originalText;
    }
});
