// ===================================
// NAVIGATION: scroll behavior + mobile
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===================================
// FLOATING CTA: show after scroll
// ===================================
const floatingCta = document.getElementById('floatingCta');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    floatingCta.classList.add('visible');
  } else {
    floatingCta.classList.remove('visible');
  }
});

// ===================================
// SCROLL ANIMATIONS: fade-up on scroll
// ===================================
const animatedEls = document.querySelectorAll(
  '.service-card, .testimonial-card, .insight-card, .about-text, .about-image-wrap, .stat-item, .contact-left, .booking-form'
);

animatedEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards in the same parent
      const siblings = Array.from(entry.target.parentElement.children);
      const index = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animatedEls.forEach(el => observer.observe(el));

// ===================================
// BOOKING FORM: validation + Formspree
// ===================================
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const requiredFields = bookingForm.querySelectorAll('[required]');
  let valid = true;

  requiredFields.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#e53e3e';
      valid = false;
    }
  });

  if (!valid) return;

  const submitBtn = bookingForm.querySelector('[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(bookingForm.action, {
      method: 'POST',
      body: new FormData(bookingForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formSuccess.classList.add('show');
      bookingForm.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 6000);
    } else {
      const data = await response.json();
      const msg = data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong. Please try again.';
      alert(msg);
    }
  } catch (err) {
    alert('Network error. Please try again or email connect@nicolepinkham.com directly.');
  } finally {
    submitBtn.textContent = 'Send My Request';
    submitBtn.disabled = false;
  }
});

// ===================================
// NEWSLETTER FORM
// ===================================
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = newsletterForm.querySelector('input');
  const btn = newsletterForm.querySelector('button');
  if (!input.value.trim()) return;
  btn.textContent = 'Subscribed!';
  btn.style.background = '#0e7490';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3000);
});

// ===================================
// SMOOTH ACTIVE NAV LINK highlight
// ===================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--white)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
