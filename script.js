/* ============================================
   CasLive LP - script.js
   ============================================ */

// ---------- Hamburger menu ----------
const hamburger = document.getElementById('hamburger');
const headerNav = document.getElementById('headerNav');

if (hamburger && headerNav) {
  hamburger.addEventListener('click', () => {
    headerNav.classList.toggle('open');
  });
  // Close nav on link click (mobile)
  headerNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => headerNav.classList.remove('open'));
  });
}

// ---------- News tag filter ----------
const tagButtons = document.querySelectorAll('.news__tag');
const newsItems  = document.querySelectorAll('.news__item');

tagButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tagButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    newsItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ---------- Scroll fade-in ----------
const fadeEls = document.querySelectorAll(
  '.point-card, .commerce__card, .features__card, .news__item, .about__text'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${i * 0.08}s`;
      entry.target.classList.add('fade-in-up', 'visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));
