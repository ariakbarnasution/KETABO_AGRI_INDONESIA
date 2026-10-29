// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
}
menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Tahun di footer
document.getElementById('year').textContent = new Date().getFullYear();

// Notifikasi singkat
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// Tombol "Tanyakan produk" mengisi formulir otomatis
document.querySelectorAll('[data-product]').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('interest').value = 'Informasi produk';
    document.getElementById('message').value = 'Saya ingin bertanya tentang ' + a.dataset.product + '.';
  });
});

// Formulir (belum terhubung ke email/WhatsApp)
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  showToast('Terima kasih! Formulir belum terhubung, pesan belum terkirim.');
});

// Slider hero: otomatis tiap 5 detik, berhenti saat disorot/disentuh
(function () {
  const slider = document.getElementById('heroSlider');
  const slides = slider.querySelectorAll('.slide');
  const dotsBox = slider.querySelector('.slider-dots');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0, timer;

  const dots = [...slides].map((_, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.setAttribute('aria-label', 'Foto ' + (i + 1));
    d.addEventListener('click', () => { show(i); restart(); });
    dotsBox.appendChild(d);
    return d;
  });

  function show(n) {
    current = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  function start() { if (!reduceMotion) timer = setInterval(() => show(current + 1), 5000); }
  function stop() { clearInterval(timer); }
  function restart() { stop(); start(); }

  slider.querySelector('.prev').addEventListener('click', () => { show(current - 1); restart(); });
  slider.querySelector('.next').addEventListener('click', () => { show(current + 1); restart(); });
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);

  // Geser di layar sentuh
  let startX = 0;
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; stop(); }, { passive: true });
  slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    start();
  });

  show(0);
  start();
})();
