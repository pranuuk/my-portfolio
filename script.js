/* ====================
   THEME TOGGLE (animated)
   ==================== */
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setIconForTheme() {
  if (body.classList.contains('theme-dark')) {
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>';
  } else {
    themeIcon.innerHTML = '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>';
  }
}
setIconForTheme();

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('theme-light')) {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    // small fade for accent transitions
  } else {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
  }
  setIconForTheme();
});

/* ====================
   TYPEWRITER (roles)
   ==================== */
const typeEl = document.getElementById('typewriter');
const roles = ['BTech CSE Student!', 'Java Enthusiast!', 'Open Source Contributor!', 'Problem Solver!'];
let typeIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = roles[typeIndex % roles.length];
  if (!deleting) {
    typeEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1000);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      typeIndex++;
    }
  }
  setTimeout(typeLoop, deleting ? 80 : 120);
}
typeLoop();

/* ====================
   SCROLL REVEAL & SKILL ANIMATION
   ==================== */
const revealEls = document.querySelectorAll('.reveal');
const fills = document.querySelectorAll('.fill');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // animate skill bars if present within this section
      entry.target.querySelectorAll('.fill').forEach(f => {
        const value = f.dataset.fill || 60;
        f.style.width = value + '%';
      });
    }
  });
}, {threshold: 0.18});

revealEls.forEach(el => observer.observe(el));

/* ====================
   PROJECT CARD 3D TILT (mouse)
   ==================== */
const projects = document.querySelectorAll('.project-card');
projects.forEach(card => {
  const inner = card.querySelector('.card-inner');
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 14; // -7..7
    const rotateX = (0.5 - y) * 8; // -4..4
    inner.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    inner.style.transform = '';
  });
});

/* ====================
   CONTACT FORM (demo feedback)
   ==================== */
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.cta-btn');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // simulate send
  setTimeout(() => {
    btn.textContent = 'Sent ✓';
    btn.style.transform = 'translateY(-2px)';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      form.reset();
    }, 1400);
  }, 900);
});

/* ====================
   small accessibility tweaks
   ==================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
