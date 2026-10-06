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

// ===== Typewriter effect =====
const roles = [
  'DevOps Engineer',
  'Docker & Kubernetes',
  'CI/CD · GitLab & Jenkins',
  'Full-Stack Developer'
];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  if (!typedEl) return;
  const current = roles[roleIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

// ===== Animated stat counters =====
const stats = document.querySelectorAll('.stat h3');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;
  stats.forEach(stat => {
    const target = parseInt(stat.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const tick = () => {
      current += step;
      if (current >= target) {
        stat.textContent = target;
      } else {
        stat.textContent = current;
        requestAnimationFrame(tick);
      }
    };
    tick();
  });
}

// ===== Scroll reveal (IntersectionObserver) =====
const revealTargets = document.querySelectorAll(
  '.info-card, .skill-category, .project-card, .timeline-item, .about-stats'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('about-stats')) animateCounters();
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ===== Contact form (static demo handler) =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Thanks! Your message has been noted (connect a backend/email service to send it for real).';
  contactForm.reset();
  setTimeout(() => { formNote.textContent = ''; }, 6000);
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
