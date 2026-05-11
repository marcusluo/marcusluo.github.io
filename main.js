/* ============================================================
   PORTFOLIO — Main JS
   ============================================================ */

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function tickRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(tickRing);
})();

// ---- Nav scroll shrink ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.padding = window.scrollY > 60 ? '.7rem 3.5rem' : '1.1rem 3.5rem';
}, { passive: true });

// ---- Modal system ----
function openProject(id) {
  const overlay = document.getElementById('modal-' + id);
  if (!overlay) return;
  document.body.style.overflow = 'hidden';
  overlay.classList.add('open');
  overlay.scrollTop = 0;
}

function closeProject(id) {
  const overlay = document.getElementById('modal-' + id);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeOnOverlay(e, id) {
  // Only close if the click was on the overlay itself, not inside the modal
  if (e.target === e.currentTarget) closeProject(id);
}

// Close with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(el => {
      el.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.card, .stat-box, .about-grid, .section-header');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  revealObs.observe(el);
});

// Stagger cards
document.querySelectorAll('.card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.08) + 's';
});
