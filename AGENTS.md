# AGENTS.md

## Architecture
A static single-page site with no framework or build step. `netlify.toml` publishes the repository root.

## Key files
- `index.html` – all content (Portuguese, pt-BR), including JSON-LD structured data for local SEO.
- `css/styles.css` – all styling; theme color `#0E2140`.
- `js/main.js` – progressive enhancement; the `CONFIG` object at the top controls site-wide options (`modoDemonstracao` shows/hides the demo banner).
- `assets/` – favicon. The about section has an HTML comment showing where to drop `assets/mariana.jpg`.

## Conventions
- This project is an exact copy of primestarquiro.netlify.app. Keep it identical unless asked to change it.
- Keep it dependency-free; do not introduce a bundler unless requested.
- Contact data (WhatsApp, phone, e-mail, address) appears in several places in `index.html`. Update every occurrence together.
