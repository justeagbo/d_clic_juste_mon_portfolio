// Burger menu
const burger = document.getElementById('burger');
const nav = document.getElementById('mainNav');
if (burger) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Activation de lien
const links = [...document.querySelectorAll('#mainNav a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

function onScroll() {
  const y = window.scrollY + 120;
  for (const [i, sec] of sections.entries()) {
    const top = sec.offsetTop, bottom = top + sec.offsetHeight;
    if (y >= top && y < bottom) {
      links.forEach(l => l.classList.remove('active'));
      links[i].classList.add('active');
      break;
    }
  }
}
window.addEventListener('scroll', onScroll);

// Animations
const fills = document.querySelectorAll('.fill');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const w = e.target.getAttribute('data-width') || '0';
      e.target.style.width = w + '%';
    }
  });
}, { threshold: 0.4 });
// Animation
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.skill-bar-fill').forEach(function(bar) {
  
    var finalWidth = bar.getAttribute('data-width');
    bar.style.width = '0';
    bar.style.background = '#38bdf8';
    bar.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
    setTimeout(function() {
      if (finalWidth) {
        bar.style.width = finalWidth;
      }
    }, 500);
  });
});

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (ev) => {
    const email = (form.getAttribute('action') || '').replace('mailto:', '').trim();
    if (!email || !email.includes('@')) return;

    ev.preventDefault();
    const d = new FormData(form);
    const subject = d.get('sujet') || 'Contact portfolio';
    const body = [
      `Prénom: ${d.get('prenom') || ''}`,
      `Nom: ${d.get('nom') || ''}`,
      '',
      `${d.get('message') || ''}`
    ].join('%0D%0A');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
}