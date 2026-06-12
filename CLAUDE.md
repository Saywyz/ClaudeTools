# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**ClaudeTools** is an interactive website that explains the Claude ecosystem to beginners:
Claude, Claude Cowork, Claude Code, Connectors, and Skills. It is visual-first, light on text,
and uses the Claude (Anthropic) color palette. **All user-facing content is in French.**
It is a static site deployed on GitHub Pages.

## Stack

Plain **HTML, CSS, and vanilla JavaScript** — no build step, no framework, no dependencies.
Fonts (Fraunces, Inter, JetBrains Mono) load from Google Fonts via CDN. Pages use `lang="fr"`.

## Structure

```
index.html        Accueil — intro, 3 tools + Connecteurs/Skills cross-links, "wahou" examples, compare table
claude.html       Claude — bases + deep-dive subsections (Projets, Recherche approfondie,
                  Réflexion étendue/effort, Artéfacts, Vision), interactive tabs, FAQ
cowork.html       Claude Cowork — chat-vs-cowork, how-it-works, "wahou" use cases, FAQ
code.html         Claude Code — terminal demo, superpowers (incl. effort), examples, FAQ
connectors.html   Connecteurs — what they are, logo grid, "wahou" examples, security, FAQ
skills.html       Skills — what they are, examples, Skills-vs-Connectors, "wahou" examples, FAQ
assets/css/style.css   Full design system (tokens, components, subnav, deep-dives, logo grid, wow cards)
assets/js/script.js    Mobile nav, scroll reveal, tabs, FAQ accordion, typing demo
.nojekyll         Tells GitHub Pages to serve files as-is
```

Pages with many subsections (`claude.html`, `code.html`) have a sticky in-page `.subnav`
of anchor links. Anchor target sections carry the `.jump` class for correct scroll offset.

## Running locally

No build needed. Either open `index.html` directly in a browser, or serve the folder:

```
python -m http.server 8000      # then visit http://localhost:8000
```

## Deploying (GitHub Pages)

Push to the default branch, then in repo Settings → Pages, set the source to the
branch root (`/`). The site is fully static, so no build action is required.

## Conventions

- Keep copy short, beginner-friendly, and **in French**; favor visuals (cards, icons, demos) over paragraphs.
- Each product has a theme color: Claude `--claude` (coral), Cowork `--cowork` (taupe-gold),
  Code `--code` (sage). Connecteurs use blue `#6a93b9`, Skills use purple `#9a7bb5`
  (applied inline, not yet tokenized). Reuse the `:root` CSS variables rather than hard-coding hex.
- Header and footer markup is duplicated across all 6 pages (no templating) — update every page when changing nav or footer.
- "Wahou" example sections use `.wow-grid` / `.wow-card` with a `Vous → Claude` input/output pair.
- Interactive hooks are wired by class/`data-` attributes in `script.js`; add the matching
  class (`.reveal`, `[data-tabs]`, `.faq-item`, etc.) rather than writing new inline scripts.
