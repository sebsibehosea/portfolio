// ===== Mobile nav toggle =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Navbar shadow on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  // Back to top button
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// ===== Back to top =====
const backToTop = document.getElementById('backToTop');
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Scroll reveal (IntersectionObserver) =====
const revealTargets = document.querySelectorAll(
  '.info-card, .skill-category, .project-card, .timeline-item'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ===== Contact form (static demo handler) =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Thanks for reaching out — I\'ll get back to you soon.';
  contactForm.reset();
  setTimeout(() => { formNote.textContent = ''; }, 6000);
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
