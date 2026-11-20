/**
 * GDGC FST Lab — Main Application Controller
 */

(function () {
  'use strict';

  // 1. Navigation scroll state
  function initNavScroll() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 30) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      },
      { passive: true }
    );
  }

  // 2. Mobile Drawer Toggle
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!toggle || !drawer) return;

    function toggleMenu() {
      const isOpen = drawer.classList.contains('is-open');
      if (isOpen) {
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      } else {
        drawer.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.innerHTML = '✕';
      }
    }

    toggle.addEventListener('click', toggleMenu);

    links.forEach((l) => {
      l.addEventListener('click', () => {
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      });
    });
  }

  // 3. Scroll Reveal via IntersectionObserver
  function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
  }

  // 4. Platform Filter Toolbar (Windows, Android, Web, All)
  function initPlatformToolbar() {
    const buttons = document.querySelectorAll('.toolbar-btn');
    const cards = document.querySelectorAll('.platform-card');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        cards.forEach((card) => {
          if (filter === 'all' || card.getAttribute('data-platform') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initMobileMenu();
    initScrollReveal();
    initPlatformToolbar();
  });
})();
