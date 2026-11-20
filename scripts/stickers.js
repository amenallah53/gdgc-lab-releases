/**
 * GDGC FST Lab — Floating Developer Stickers & Interactive Parallax
 */

(function () {
  'use strict';

  // Check reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initMouseParallax() {
    if (prefersReducedMotion || window.innerWidth < 992) return;

    const showcase = document.querySelector('.showcase-card');
    const stickers = document.querySelectorAll('.sticker');

    window.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth) - 0.5;
      const mouseY = (e.clientY / window.innerHeight) - 0.5;

      stickers.forEach((sticker, index) => {
        const factor = (index + 1) * 14;
        const x = mouseX * factor;
        const y = mouseY * factor;
        sticker.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      if (showcase) {
        const tiltX = mouseY * -10;
        const tiltY = mouseX * 10;
        showcase.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }
    });

    window.addEventListener('mouseleave', () => {
      stickers.forEach((sticker) => {
        sticker.style.transform = '';
      });
      if (showcase) {
        showcase.style.transform = '';
      }
    });
  }

  // Create subtle floating background doodles
  function createDoodles() {
    if (prefersReducedMotion) return;

    const doodles = ['< / >', '{ }', '0101', 'Widget', 'Async', 'Git', '>>_'];
    const container = document.getElementById('ambient-doodles-container');
    if (!container) return;

    doodles.forEach((text, i) => {
      const span = document.createElement('span');
      span.className = 'doodle-tag';
      span.textContent = text;
      span.style.top = `${15 + (i * 12)}%`;
      span.style.left = i % 2 === 0 ? `${5 + (i * 4)}%` : `${80 - (i * 3)}%`;
      span.style.animationDelay = `${i * 1.2}s`;
      container.appendChild(span);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMouseParallax();
    createDoodles();
  });
})();
