<!-- Template rendered by tool/sync_releases_readme.py before publishing. -->
<div align="center">

# GDGC FST Lab — Public Releases & Distribution

[![Latest Release](https://img.shields.io/github/v/release/amenallah53/gdgc-lab-releases?color=4285F4&label=Latest%20Release&logo=github)](https://github.com/amenallah53/gdgc-lab-releases/releases/latest)
[![Windows](https://img.shields.io/badge/Platform-Windows%2064--bit-0078D6?logo=windows&logoColor=white)](https://github.com/amenallah53/gdgc-lab-releases/releases/latest/download/GDGCLab-Setup.exe)
[![Android](https://img.shields.io/badge/Platform-Android%208.0+-3DDC84?logo=android&logoColor=white)](https://github.com/amenallah53/gdgc-lab-releases/releases/latest/download/GDGCLab-android.apk)
[![Web](https://img.shields.io/badge/Web%20App-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://gdgc-lab.pages.dev)
[![GitHub Pages](https://img.shields.io/badge/Landing%20Page-GitHub%20Pages-222222?logo=githubpages&logoColor=white)](https://amenallah53.github.io/gdgc-lab-releases/)

**The Official Distribution Hub for GDGC FST Lab**  
*The on-campus learning and builder hub for Google Developer Groups on Campus at Faculté des Sciences de Tunis.*

[🌐 Visit the Landing Page](https://amenallah53.github.io/gdgc-lab-releases/) • [🚀 Launch Web App](https://gdgc-lab.pages.dev) • [📦 Browse All Releases](https://github.com/amenallah53/gdgc-lab-releases/releases)

---

</div>

## 📌 About This Repository

This repository serves as the **public distribution and binary release hub** for **GDGC FST Lab**. It hosts:
- Production installers and binaries for **Windows** (`.exe`, `.zip`).
- Android mobile packages (`.apk`).
- The official static **Download Landing Page** (hosted via GitHub Pages on the `gh-pages` branch).
- Release changelogs, integrity checksums (SHA-256), and update manifests (`latest.json`).

> [!NOTE]
> The Flutter application's source code is maintained in an internal private repository. All public installers, release notes, and download portals are delivered and hosted here.

---

## 🚀 Latest Stable Release

| Version | Build | Release Date | Status |
| :--- | :--- | :--- | :--- |
| **v1.0.1+2** | 2 | November 15, 2026 | **Stable (Production)** |

### Direct Download Links

| Platform | Format | File Name | Size | Direct Link |
| :--- | :--- | :--- | :--- | :--- |
| **Windows** | Setup Wizard | `GDGCLab-Setup.exe` | ~ | [⬇️ Download Installer](https://github.com/amenallah53/gdgc-lab-releases/releases/latest/download/GDGCLab-Setup.exe) |
| **Windows (Update)** | Zip Archive | `GDGCLab-update-win64.zip` | ~19.8 MB | [⬇️ Download Update Zip](https://github.com/amenallah53/gdgc-lab-releases/releases/latest/download/GDGCLab-update-win64.zip) |
| **Android** | Universal APK | `GDGCLab-android.apk` | ~70.6 MB | [⬇️ Download APK](https://github.com/amenallah53/gdgc-lab-releases/releases/latest/download/GDGCLab-android.apk) |
| **Web** | Web Application | Cloudflare Pages | Live | [🌐 Open in Browser](https://gdgc-lab.pages.dev) |

---

## 💻 Installation Instructions

### 🪟 Windows (64-bit)

1. **Download** [`GDGCLab-Setup.exe`](https://github.com/amenallah53/gdgc-lab-releases/releases/latest/download/GDGCLab-Setup.exe).
2. Run the installer wizard. It will install the application to your local user directory:
   ```text
   %LocalAppData%\Programs\GDGC FST Lab
   ```
3. A desktop shortcut and a Start Menu entry are created automatically.
4. **Updates:** The included launcher (`GDGCLabLauncher.exe`) checks `latest.json` on startup and seamlessly applies delta updates from `GDGCLab-update-win64.zip`.

**System Requirements:**
- Windows 10 (version 1809 or higher) or Windows 11 (64-bit x64).
- 250 MB free disk space.
- Internet connection for initial chapter login and live updates.

---

### 📱 Android

1. **Download** [`GDGCLab-android.apk`](https://github.com/amenallah53/gdgc-lab-releases/releases/latest/download/GDGCLab-android.apk).
2. Open the downloaded `.apk` on your Android device.
3. If prompted, permit your browser/files app to *"Install apps from unknown sources"*.
4. Launch **GDGC FST Lab** and sign in with your chapter credentials.
5. **Over-The-Air Patches:** This release is Shorebird-enabled; critical updates and hotfixes are downloaded automatically in the background without needing a full APK reinstall.

**System Requirements:**
- Android 8.0 (Oreo, API level 26) or newer.
- ARM64 or x86_64 compatible Android device.
- 150 MB free storage.

---

### 🌐 Web Platform

If you are on **macOS**, **Linux**, or a shared computer, launch the web edition directly:
- **URL:** [https://gdgc-lab.pages.dev](https://gdgc-lab.pages.dev)
- No installation or admin permissions required.
- Works in Google Chrome, Microsoft Edge, Mozilla Firefox, and Apple Safari.

---

## 🔒 Security & Integrity Verification

To verify that your downloaded file has not been tampered with or corrupted, compare its SHA-256 hash:

### Windows PowerShell
```powershell
Get-FileHash -Path "GDGCLab-Setup.exe" -Algorithm SHA256
Get-FileHash -Path "GDGCLab-android.apk" -Algorithm SHA256
```

### Linux / macOS Terminal
```bash
sha256sum GDGCLab-Setup.exe
sha256sum GDGCLab-android.apk
```

**Official Checksums for v1.0.1+2:**
- `GDGCLab-Setup.exe`: `371a55afa2cd88e85d3f7f9c67522dc2b030cb5125ba4e6226374492d6b4b39c`
- `GDGCLab-update-win64.zip`: `f142ee3bb1b0a6aa40b1c7083dcf2ebd8949e9ad5277e46c312a6101c041aff1`
- `GDGCLab-android.apk`: `273aa64e993b295bab166731de204e19221b766c745152db6e025fec87ff146f`

The same values are published in [`latest.json`](https://github.com/amenallah53/gdgc-lab-releases/releases/latest/download/latest.json).

---

## 📦 Previous Releases & Historical Archives

All previous versions, release tags, and build assets remain permanently accessible on GitHub:
👉 [Browse the Full Release History](https://github.com/amenallah53/gdgc-lab-releases/releases)

---

## 👥 Community & Support

GDGC FST Lab is created by and for the **Google Developer Groups on Campus (GDGC)** community at **Faculté des Sciences de Tunis (FST)**.

- 🐛 **Report a Bug / Request a Feature:** [Open an Issue](https://github.com/amenallah53/gdgc-lab-releases/issues)
- 🌐 **GDGC Chapter Community:** [GDSC Community Portal](https://gdsc.community.dev)
- 📚 **Official Landing Page:** [https://amenallah53.github.io/gdgc-lab-releases/](https://amenallah53.github.io/gdgc-lab-releases/)

---

<div align="center">
<sub>Built with Flutter 💙 • Powered by Supabase & Shorebird • © 2026 GDGC FST</sub>
</div>
