# ClaudeTools

An interactive, beginner-friendly website that explains the three main ways to use Claude —
**Claude** (the chat assistant), **Claude Cowork** (your AI teammate), and **Claude Code**
(the coding companion). Visual-first, light on text, and styled with the Claude color palette.

🔗 Built as a static site for **GitHub Pages**.

## Pages

| Page | What it covers |
| --- | --- |
| `index.html` | Overview, the three tools, what Claude can do, a quick "which one?" table |
| `claude.html` | The chat assistant — features, an interactive task explorer, tips, FAQ |
| `cowork.html` | The AI teammate — chat vs. cowork, how it works, use cases, FAQ |
| `code.html` | The coding companion — live terminal demo, features, guardrails, FAQ |

## Tech

Plain **HTML + CSS + vanilla JS**. No build step, no dependencies. Fonts load from Google Fonts.

- `assets/css/style.css` — design system (Claude color tokens, components, responsive layout)
- `assets/js/script.js` — mobile nav, scroll reveal, tabs, FAQ accordion, typing demo

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000   # http://localhost:8000
```

## Deploy

Push to the default branch, then enable **Settings → Pages → Source: branch root (`/`)**.
The included `.nojekyll` file ensures all assets are served as-is.

---

*An independent educational project. Not affiliated with Anthropic.*
