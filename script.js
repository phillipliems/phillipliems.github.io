(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const links = document.querySelectorAll('.nav-menu a');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', open);
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  links.forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 16), { passive: true });
  document.getElementById('year').textContent = new Date().getFullYear();

  document.querySelectorAll('[data-delay]').forEach(el => el.style.setProperty('--delay', `${el.dataset.delay}ms`));
  const reveals = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    reveals.forEach(el => observer.observe(el));
  }
})();