# Switcher — Dark / Light Mode

![Repo size](https://img.shields.io/github/repo-size/pamelasantoss/switcher-dark-light-mode?style=for-the-badge)
![License: MIT](https://img.shields.io/github/license/pamelasantoss/switcher-dark-light-mode?color=%23387fc6&style=for-the-badge)
![Last commit](https://img.shields.io/github/last-commit/pamelasantoss/switcher-dark-light-mode?color=%23387fc6&style=for-the-badge)

## 💡 Overview
A small, dependency-light UI component that toggles a website between light and dark themes. It is implemented with plain HTML, CSS (or SCSS), and JavaScript (uses jQuery for DOM convenience). The component persists the selected theme in `localStorage` so user preference is remembered across visits.

## ✅ Features
- Lightweight: implemented with HTML/CSS/JS
- Two provided variants:
  - **simple-version** — standalone HTML/CSS/JS files (no build tools required)
  - **scss-version** — source SCSS files and a Gulp build that outputs compiled CSS/JS into `dist/`
- Saves theme preference in browser `localStorage`

## 🔧 How it works
- The toggle is a checkbox input that, when checked, sets `localStorage['theme-dark'] = 'true'` and adds the `theme-dark` class to `<body>`.
- When the page loads the script reads `localStorage` and applies the theme automatically.

## 🚀 Quick demo / Usage
You can try the project without installing anything:

- Open `simple-version/index.html` in your browser for a minimal example.
- Open `scss-version/index.html` after building (`dist/` must be created — see Build steps).

### HTML markup (what to include)
```html
<div class="Switch">
  <input id="switch-toggle-btn" class="SwitchToggle" type="checkbox" />
  <label for="switch-toggle-btn">
    <span class="material-icons-outlined">light_mode</span>
    <span class="material-icons-outlined">dark_mode</span>
  </label>
</div>

<!-- jQuery (required) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Component script -->
<script src="path/to/script.js"></script>
```

## 📦 Installation & Build (SCSS version)
If you want to work with the SCSS source and use the build pipeline:

1. Install dependencies

```bash
cd scss-version
npm install
```

2. Run Gulp (this will build CSS/JS into `dist/`, start a watcher and launch BrowserSync):

```bash
npx gulp
# or install gulp-cli globally and run
# npm install --global gulp-cli
# gulp
```

Note: The repository includes a `gulpfile.js` that compiles SCSS, autoprefixes and minifies CSS, babel-transpiles and uglifies JS, and serves the project with BrowserSync.

## 🧩 How to use the component
- Include the markup above where you want the switch to appear.
- Ensure jQuery is loaded before the component script.
- Optionally customize colors in CSS/SCSS — the simple-version uses CSS custom properties and class `theme-dark`.
- The component stores a `theme-dark` key in `localStorage` with value `'true'` or `'false'`.

## 🛠 Customization
- SCSS version provides variables under `src/scss/variables/` to change colors, fonts, or theme defaults.
- You can change the icon set or replace the icons with text or SVGs.

## ♿ Accessibility notes
- The toggle is implemented as a native checkbox which provides basic keyboard support.
- Improvements to consider: add `aria-label` and more explicit focus styles, announce theme change to assistive tech, and ensure sufficient color contrast for each theme.

## 📁 Project structure
```
├─ simple-version/
│  ├─ index.html
│  ├─ script.js
│  └─ style.css
└─ scss-version/
   ├─ gulpfile.js
   ├─ package.json
   └─ src/
      ├─ js/
      └─ scss/
```

## 🤝 Contributing
- Fork the repo, make changes in a feature branch, and open a pull request with a description of your changes.
- For SCSS work, run `npm install` in `scss-version`, then `npx gulp` to build and test.

## 💡 Next steps
- Convert the component to a framework-friendly variant (React) and publish as an npm package.
- Add unit and integration tests for the JS logic (e.g., verify localStorage behavior).
- Improve accessibility (ARIA announcements, focus management, keyboard-only support).
- Add an option to follow the system color scheme (`prefers-color-scheme`) by default.
- Add a small demo page with multiple components and examples showcasing customization.
- Add an automated CI workflow to run linting and tests and publish bundles.

## ⚖️ License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/pamelasantoss/switcher-dark-light-mode/blob/main/LICENSE) file for details.

---

Made with ❤️ by [Pamela Santos](https://pamelasantos.dev.br/)
