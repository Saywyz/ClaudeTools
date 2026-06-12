# ClaudeTools

An interactive, beginner-friendly website that explains the three main ways to use Claude —
**Claude** (the chat assistant), **Claude Cowork** (your AI teammate), and **Claude Code**
(the coding companion). Visual-first, light on text, and styled with the Claude color palette.

🔗 Built as a static site for **GitHub Pages**.

## Pages

All user-facing content is **in French**.

| Page | What it covers |
| --- | --- |
| `index.html` | Accueil — overview, the tools, "wahou" examples, a quick "which one?" table |
| `claude.html` | Claude — features + deep-dives (Projets, Recherche approfondie, Effort, Artéfacts, Vision) |
| `cowork.html` | Claude Cowork — chat vs. cowork, how it works, use cases, FAQ |
| `code.html` | Claude Code — live terminal demo, features, guardrails, FAQ |
| `connectors.html` | Connecteurs — what they are, logo grid, "wahou" examples, security |
| `skills.html` | Skills — examples, Skills vs Connecteurs, "wahou" examples |
| `news.html` | Actualités — auto-rendered Claude news feed (see below) |

## Latest-news feed

`news.html` renders a Claude news feed from a single data file, **`assets/data/news.js`**.
Edit that file (or let an automation rewrite it) and the page updates itself.
See **[`NEWS.md`](NEWS.md)** for the format and for ways to automate updates
(scheduled Claude Code, GitHub Actions, Claude Cowork…).

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
