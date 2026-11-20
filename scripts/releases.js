/**
 * GDGC FST Lab — Releases Integration
 * Static release-manifest.json + live latest.json / GitHub releases.
 */

(function () {
  'use strict';

  const REPO = 'amenallah53/gdgc-lab-releases';
  const CACHE_KEY = 'gdgc_lab_releases_cache_v3';
  const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

  function formatDate(isoStr) {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (_) {
      return isoStr;
    }
  }

  function formatRelativeDate(isoStr) {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      const diffMs = Date.now() - d.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 30) return `${diffDays} days ago`;
      return formatDate(isoStr);
    } catch (_) {
      return formatDate(isoStr);
    }
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function setText(id, value) {
    if (value == null) return;
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function setHref(id, url) {
    if (!url) return;
    const el = document.getElementById(id);
    if (el) el.href = url;
  }

  function setSha(textId, buttonId, sha, fallback) {
    const text = document.getElementById(textId);
    const button = document.getElementById(buttonId);
    if (!text || !button) return;

    const label =
      textId === 'sha-windows'
        ? 'Installer SHA256'
        : textId === 'sha-windows-zip'
          ? 'Update ZIP SHA256'
          : 'SHA256';

    if (sha) {
      text.textContent = `${label}: ${sha.slice(0, 12)}...`;
      button.dataset.sha = sha;
      button.disabled = false;
      button.title = 'Copy full SHA256';
    } else {
      text.textContent = fallback || `${label}: see latest.json`;
      button.dataset.sha = '';
      button.disabled = true;
      button.title = 'Checksum not published yet';
    }
  }

  function escapeAndLink(rel) {
    const tag = rel.tag_name || rel.tag || '';
    const name = rel.name || `GDGC FST Lab ${tag}`;
    const date = rel.published_at || rel.publishedAt || '';
    const url =
      rel.html_url ||
      rel.htmlUrl ||
      (tag ? `https://github.com/${REPO}/releases/tag/${encodeURIComponent(tag)}` : `https://github.com/${REPO}/releases`);

    return { tag, name, date, url };
  }

  async function loadManifest() {
    try {
      const res = await fetch('release-manifest.json', { cache: 'no-store' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('[GDGCLab] Local release-manifest.json failed to load:', e);
    }
    return null;
  }

  async function fetchGitHubReleases() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          return parsed.data;
        }
      }
    } catch (_) {}

    try {
      const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });
      if (res.ok) {
        const data = await res.json();
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data })
          );
        } catch (_) {}
        return data;
      }
    } catch (e) {
      console.warn('[GDGCLab] GitHub API fetch failed or rate-limited; using cached/manifest data:', e);
    }
    return null;
  }

  function applyPlatformData(manifest) {
    if (!manifest || !manifest.platforms) return;
    const windows = manifest.platforms.windows || {};
    const android = manifest.platforms.android || {};
    const zip = windows.secondary || {};

    if (windows.downloadUrl) {
      setHref('btn-download-windows', windows.downloadUrl);
      setHref('asset-windows', windows.downloadUrl);
    }
    setText('size-windows', windows.sizeFormatted);
    setText(
      'asset-size-windows',
      windows.sizeFormatted ? `Windows Installer · ${windows.sizeFormatted}` : null
    );
    setSha('sha-windows', 'copy-sha-windows', windows.sha256);

    if (zip.downloadUrl) {
      setHref('link-windows-zip', zip.downloadUrl);
      setHref('asset-windows-zip', zip.downloadUrl);
    }
    setText('size-windows-zip', zip.sizeFormatted);
    setText(
      'asset-size-windows-zip',
      zip.sizeFormatted ? `Windows Delta Zip · ${zip.sizeFormatted}` : null
    );
    setSha('sha-windows-zip', 'copy-sha-windows-zip', zip.sha256);

    if (android.downloadUrl) {
      setHref('btn-download-android', android.downloadUrl);
      setHref('asset-android', android.downloadUrl);
    }
    setText('size-android', android.sizeFormatted);
    setText(
      'asset-size-android',
      android.sizeFormatted ? `Android Package · ${android.sizeFormatted}` : null
    );
    setSha('sha-android', 'copy-sha-android', android.sha256);
  }

  function initCopyButtons() {
    document.querySelectorAll('.btn-copy-sha').forEach((button) => {
      button.onclick = () => {
        const sha = button.dataset.sha;
        if (!sha) return;
        navigator.clipboard.writeText(sha).then(() => {
          const original = button.textContent;
          button.textContent = 'Copied!';
          button.style.color = 'var(--gdgc-green)';
          setTimeout(() => {
            button.textContent = original;
            button.style.color = '';
          }, 2000);
        });
      };
    });
  }

  function updateUI(manifest, ghReleases) {
    const latestRelease = ghReleases && ghReleases.length > 0 ? ghReleases[0] : null;
    const apiMatchesManifest =
      Boolean(latestRelease && manifest && latestRelease.tag_name === manifest.tag);

    const versionTag =
      (manifest && manifest.tag) || (latestRelease && latestRelease.tag_name) || 'v1.0.1+2';
    const versionName = apiMatchesManifest
      ? latestRelease.name || manifest.name
      : (manifest && manifest.name) || (latestRelease && latestRelease.name) || 'GDGC FST Lab';
    const publishedAt = apiMatchesManifest
      ? latestRelease.published_at || manifest.publishedAt
      : (manifest && manifest.publishedAt) || (latestRelease && latestRelease.published_at) || '';
    const releaseBody = apiMatchesManifest
      ? latestRelease.body || manifest.notes
      : (manifest && manifest.notes) || (latestRelease && latestRelease.body) || '';
    const htmlUrl =
      (manifest && manifest.htmlUrl) ||
      (latestRelease && latestRelease.html_url) ||
      `https://github.com/${REPO}/releases`;

    document.querySelectorAll('.js-latest-tag').forEach((el) => {
      el.textContent = versionTag;
    });
    document.querySelectorAll('.js-latest-date').forEach((el) => {
      el.textContent = publishedAt
        ? `${formatRelativeDate(publishedAt)} (${formatDate(publishedAt)})`
        : 'Latest Release';
    });

    const releaseNameEl = document.getElementById('latest-release-name');
    if (releaseNameEl) releaseNameEl.textContent = versionName;

    const releaseNotesEl = document.getElementById('latest-release-notes');
    if (releaseNotesEl && releaseBody) {
      releaseNotesEl.innerHTML = escapeHtml(releaseBody)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
    }

    const releaseLinkEl = document.getElementById('latest-release-github-link');
    if (releaseLinkEl) releaseLinkEl.href = htmlUrl;

    applyPlatformData(manifest);

    const historyBody = document.getElementById('releases-history-tbody');
    if (historyBody) {
      historyBody.innerHTML = '';
      const list = ghReleases && ghReleases.length > 0 ? ghReleases : manifest ? [manifest] : [];

      list.forEach((rel, index) => {
        const { tag, name, date, url } = escapeAndLink(rel);
        const row = document.createElement('tr');

        let windowsLink = '';
        let androidLink = '';
        if (rel.assets) {
          const winAsset = rel.assets.find((a) => a.name.endsWith('.exe'));
          if (winAsset) {
            windowsLink = `<a href="${escapeHtml(winAsset.browser_download_url)}" class="btn btn-sm btn-secondary">Windows .exe</a>`;
          }
          const apkAsset = rel.assets.find((a) => a.name.endsWith('.apk'));
          if (apkAsset) {
            androidLink = `<a href="${escapeHtml(apkAsset.browser_download_url)}" class="btn btn-sm btn-secondary">Android .apk</a>`;
          }
        } else if (manifest && manifest.platforms) {
          const win = manifest.platforms.windows || {};
          const android = manifest.platforms.android || {};
          if (win.downloadUrl) {
            windowsLink = `<a href="${escapeHtml(win.downloadUrl)}" class="btn btn-sm btn-secondary">Windows .exe</a>`;
          }
          if (android.downloadUrl) {
            androidLink = `<a href="${escapeHtml(android.downloadUrl)}" class="btn btn-sm btn-secondary">Android .apk</a>`;
          }
        }

        row.innerHTML = `
          <td>
            <span class="badge ${index === 0 ? 'badge-blue' : 'badge-violet'}">${escapeHtml(tag)}</span>
            ${index === 0 ? '<span style="font-size: 0.72rem; color: var(--gdgc-green); margin-left: 6px; font-weight: 700;">(Latest)</span>' : ''}
          </td>
          <td><strong>${escapeHtml(name)}</strong></td>
          <td>${escapeHtml(formatDate(date))}</td>
          <td>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${windowsLink}
              ${androidLink}
              <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost">GitHub Release ↗</a>
            </div>
          </td>
        `;
        historyBody.appendChild(row);
      });
    }

    initCopyButtons();
  }

  async function init() {
    const manifest = await loadManifest();

    if (manifest) {
      updateUI(manifest, null);
      if (window.GDGCLabOS) window.GDGCLabOS.apply(null, manifest);
    }

    const ghReleases = await fetchGitHubReleases();
    if (ghReleases && ghReleases.length) {
      updateUI(manifest, ghReleases);
      if (window.GDGCLabOS) window.GDGCLabOS.apply(null, manifest);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
