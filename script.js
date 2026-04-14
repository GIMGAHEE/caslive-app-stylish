/* ============================================
   CasLive LP - script.js
   ============================================ */

// ---------- Hamburger menu (PC) ----------
const hamburger = document.getElementById('hamburger');
const headerNav = document.getElementById('headerNav');

if (hamburger && headerNav) {
  hamburger.addEventListener('click', () => {
    headerNav.classList.toggle('open');
  });
  headerNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => headerNav.classList.remove('open'));
  });
}

// ---------- SP ドロワーメニュー ----------
const spMenu        = document.getElementById('spMenu');
const spMenuOverlay = document.getElementById('spMenuOverlay');
const spMenuClose   = document.getElementById('spMenuClose');

function openSpMenu() {
  spMenuOverlay.style.display = 'block';
  requestAnimationFrame(() => {
    spMenuOverlay.classList.add('active');
    spMenu.classList.add('open');
  });
  document.body.style.overflow = 'hidden';
}

function closeSpMenu() {
  spMenuOverlay.classList.remove('active');
  spMenu.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { spMenuOverlay.style.display = 'none'; }, 300);
}

if (hamburger && spMenu) {
  hamburger.addEventListener('click', openSpMenu);
}
if (spMenuClose) spMenuClose.addEventListener('click', closeSpMenu);
if (spMenuOverlay) spMenuOverlay.addEventListener('click', closeSpMenu);
if (spMenu) {
  spMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeSpMenu);
  });
}

// ---------- Header scroll behavior ----------
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ---------- Scroll reveal ----------
const revealSelectors = [
  '.section-title', '.about__text',
  '.users__item', '.point-card',
  '.commerce__card', '.commerce__intro-box',
  '.features__card', '.news__item',
  '.download-cta__phone', '.download-cta__text', '.download-cta__buttons',
  '.banners__img', '.mv__mockups', '.mv__text-block'
];
document.querySelectorAll(revealSelectors.join(',')).forEach(el => el.classList.add('reveal'));

// stagger
[
  ['.commerce__cards', '.commerce__card'],
  ['.features__cards', '.features__card'],
  ['.news__list',      '.news__item'],
  ['.users__flow',     '.users__item'],
].forEach(([parent, child]) => {
  document.querySelectorAll(parent).forEach(container => {
    container.querySelectorAll(child).forEach((el, i) => {
      el.classList.add(`reveal-delay-${Math.min(i + 1, 5)}`);
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---------- News filter ----------
document.querySelectorAll('.news__tag').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.news__tag').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.news__item').forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
    });
  });
});

// ---------- Smooth scroll (fixed header offset) ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = (header?.offsetHeight || 100) + 20;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  });
});

// ---------- MV 動画再生ボタン ----------
const mvVideo = document.getElementById('mvVideo');
const mvPlayBtn = document.getElementById('mvPlayBtn');

if (mvVideo && mvPlayBtn) {
  mvPlayBtn.addEventListener('click', () => {
    mvVideo.play();
    mvPlayBtn.classList.add('hidden');
  });
  // 動画終了したら再生ボタン再表示
  mvVideo.addEventListener('ended', () => {
    mvPlayBtn.classList.remove('hidden');
  });
  // 動画クリックで一時停止/再生
  mvVideo.addEventListener('click', () => {
    if (mvVideo.paused) {
      mvVideo.play();
      mvPlayBtn.classList.add('hidden');
    } else {
      mvVideo.pause();
      mvPlayBtn.classList.remove('hidden');
    }
  });
}

// ---------- 再生ボタン: サムネイル非表示 ----------
const mvThumb = document.getElementById('mvThumb');
if (mvThumb && mvPlayBtn) {
  // 元のclickイベントにサムネイル非表示を追加
  const origClick = mvPlayBtn.onclick;
  mvPlayBtn.addEventListener('click', () => {
    if (mvThumb) mvThumb.classList.add('hidden');
  }, true);
  mvVideo?.addEventListener('ended', () => {
    if (mvThumb) mvThumb.classList.remove('hidden');
  });
}
