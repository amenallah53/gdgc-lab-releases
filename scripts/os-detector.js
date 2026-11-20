/**
 * GDGC FST Lab — OS Detector & Smart Platform Highlighting
 */

(function () {
  'use strict';

  function detectOS() {
    const userAgent = window.navigator.userAgent || '';
    const platform = window.navigator.userAgentData?.platform || window.navigator.platform || '';

    // Check Android first because Android userAgent often includes Linux
    if (/android/i.test(userAgent)) {
      return 'android';
    }
    if (/win/i.test(platform) || /windows/i.test(userAgent)) {
      return 'windows';
    }
    if (/mac/i.test(platform) || /macintosh|mac os x/i.test(userAgent)) {
      return 'macos';
    }
    if (/linux/i.test(platform) || /linux/i.test(userAgent)) {
      return 'linux';
    }
    if (/iphone|ipad|ipod/i.test(userAgent)) {
      return 'ios';
    }
    return 'windows'; // Default fallback
  }

  function applyDetectedPlatform(os, manifest) {
    const detectedOs = os || detectOS();
    window.detectedOS = detectedOs;

    // Highlight card in downloads grid
    document.querySelectorAll('.platform-card').forEach((card) => {
      const cardPlatform = card.getAttribute('data-platform');
      if (cardPlatform === detectedOs) {
        card.classList.add('is-detected');
        // Inject or reveal detected badge
        if (!card.querySelector('.platform-detected-ribbon')) {
          const ribbon = document.createElement('div');
          ribbon.className = 'platform-detected-ribbon';
          ribbon.innerHTML = '★ Recommended for your device';
          card.prepend(ribbon);
        }
      } else {
        card.classList.remove('is-detected');
      }
    });

    // Update Hero Smart CTA
    const heroBtn = document.getElementById('hero-smart-download');
    if (!heroBtn || !manifest) return;

    const platforms = manifest.platforms || {};
    const p = platforms[detectedOs] || null;

    function subtitle(platform) {
      if (!platform) return '';
      return [platform.filename, platform.sizeFormatted].filter(Boolean).join(' · ');
    }

    function setHero(url, icon, iconAlt, label, sublabel) {
      heroBtn.href = url;
      heroBtn.innerHTML = `
        <img src="assets/icons/${icon}.svg" class="platform-icon" alt="${iconAlt}" width="22" height="22" />
        <span class="cta-text-wrap">
          <span class="cta-label">${label}</span>
          <span class="cta-sublabel">${sublabel}</span>
        </span>
      `;
    }

    if (detectedOs === 'windows' && p && p.available) {
      setHero(p.downloadUrl, 'windows', 'Windows', 'Download for Windows', subtitle(p));
      return;
    }

    if (detectedOs === 'android' && p && p.available) {
      setHero(p.downloadUrl, 'android', 'Android', 'Download for Android', subtitle(p));
      return;
    }

    const web = platforms.web;
    if (['macos', 'linux', 'ios', 'web'].includes(detectedOs) && web && web.url) {
      setHero(web.url, 'web', 'Web', 'Launch in Browser', 'No installation required');
      return;
    }

    const win = platforms.windows;
    if (win && win.available) {
      setHero(win.downloadUrl, 'windows', 'Windows', 'Download for Windows', subtitle(win));
    }
  }

  window.GDGCLabOS = {
    detect: detectOS,
    apply: applyDetectedPlatform,
  };
})();
