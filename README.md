# Premium Developer Portfolio Website

A state-of-the-art, high-performance personal portfolio website built with modern **Vanilla HTML5, CSS3, and JavaScript**. 

This portfolio showcases technical expertise, featured case studies (like the **GGT Platform**), professional journey timeline, and features an interactive real-time **GitHub API Repository Fetcher** and a **Dynamic Theme Customizer Sidebar**.

---

## ✨ Features

- 🌌 **Premium Aesthetics & Styling**: 
  - Sophisticated responsive layout using pure CSS Flexbox and Grid.
  - Glowing glassmorphic cards, navbar, buttons, and input elements.
  - Floating, animated color gradient blobs in the background.
  - Custom scrollbar, typing cursor, and smooth hover micro-animations.

- 🎨 **Dynamic Theme Customizer**:
  - Live color-theme switcher loaded from a slide-out drawer sidebar.
  - Persists your chosen theme using `localStorage` across page reloads.
  - Supports 4 curated aesthetic palettes:
    1. **Dark Cyberpunk (Default)**: Sleek violet/cyan neon glow.
    2. **Royal Obsidian**: Elegant pure black and amber gold.
    3. **Emerald Forest**: Soft deep forest slate and mint green.
    4. **Nordic Light**: Airy minimal light slate and active royal blue.

- 🐙 **Live GitHub REST API Integration**:
  - Real-time fetching of GitHub user profile information and public repositories.
  - Sleek skeleton loaders during active API calls.
  - Dynamic display of repo stars, forks, main language, and direct links.
  - Allows search querying for *any* valid GitHub username.

- ⚙️ **Modular & Scalable Setup**:
  - Entirely self-contained in 3 core files (`index.html`, `style.css`, `script.js`).
  - No bloated dependencies or build systems required. Extremely fast load times and clean organization.

---

## 🛠️ Tech Stack & Resources

- **Structure**: Semantic HTML5 markup
- **Styling**: Vanilla CSS3 (Custom Variables, Keyframe Animations, Glassmorphism, Responsive Viewports)
- **Logic**: Vanilla ES6+ Javascript (DOM manipulation, Fetch API, LocalStorage, Event Spying)
- **Typography**: Google Fonts (*Space Grotesk* for technical headings, *Inter* for crisp body paragraphs)
- **Iconography**: [Lucide Icons](https://lucide.dev) (loaded via unpkg CDN)

---

## 🚀 How to Run Locally

Since this is a lightweight, high-performance vanilla stack, there are no node dependencies or install scripts required!

1. Clone this repository:
   ```bash
   git clone git@github.com:Leon0102/portfolio.git
   ```
2. Open `index.html` directly in your browser of choice:
   - On macOS: `open index.html`
   - On Windows: Double-click the file in File Explorer
   - Or run a simple local server if you want to preview with local networking:
     ```bash
     python -m http.server 8000
     # Or using Node:
     npx serve
     ```
3. Navigate to `http://localhost:8000` (or the port specified).

---

## 👤 Author

- **Leon Nguyen**
- Email: [linhnlh2001@gmail.com](mailto:linhnlh2001@gmail.com)
- GitHub: [@Leon0102](https://github.com/Leon0102)
