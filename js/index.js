/* ============================================
   PORTFOLIO — INTERACTIONS
   ============================================ */

(function () {
  'use strict';

  const root = document.documentElement;

  /* ----- 1. THEME TOGGLE ----- */
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-toggle__icon');
  const themeLabel = document.querySelector('.theme-toggle__label');

  // Cargar preferencia guardada o usar light por defecto
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        // localStorage puede fallar en algunos contextos (modo incógnito estricto)
      }
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '◐' : '◑';
    }
    if (themeLabel) {
      themeLabel.textContent = theme === 'light' ? 'Light' : 'Dark';
    }
  }

  /* ----- 2. MOBILE MENU ----- */
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.site-nav__list');
  const navLinks = document.querySelectorAll('.site-nav__list a');

  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('is-open');
      navList.classList.toggle('is-open');
      document.body.classList.toggle('no-scroll', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar al click en cualquier link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        navList.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----- 3. REVEAL ON SCROLL ----- */
  // Marcar elementos a animar
  const revealSelectors = [
    '.hero__role',
    '.hero__title',
    '.hero__bio',
    '.hero__meta',
    '.hero__cta',
    '.section-header',
    '.work-card',
    '.about__intro',
    '.about__column',
    '.site-footer__top',
    '.site-footer__grid'
  ];

  const targets = document.querySelectorAll(revealSelectors.join(','));
  targets.forEach(el => el.classList.add('reveal'));

  // IntersectionObserver con fallback
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => observer.observe(el));
  } else {
    // Fallback: mostrar todo
    targets.forEach(el => el.classList.add('is-visible'));
  }

  /* ----- 4. HEADER ELEVATION ON SCROLL ----- */
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 8) {
        header.style.boxShadow = '0 1px 0 0 var(--border)';
      } else {
        header.style.boxShadow = 'none';
      }
      lastScroll = y;
    }, { passive: true });
  }

})();
