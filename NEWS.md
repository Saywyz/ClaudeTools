# Actualités — comment ça marche & comment l'automatiser

La page **Actualités** (`news.html`) affiche un fil de nouvelles sur l'univers Claude.
Tout repose sur **un seul fichier de données**, pensé pour être réécrit facilement —
à la main ou par une automatisation.

## 1. La source unique : `assets/data/news.js`

```js
window.CLAUDE_NEWS_UPDATED = "2026-06-12";   // date affichée « Dernière mise à jour »

window.CLAUDE_NEWS = [
  {
    date:    "2026-06-05",                    // ISO AAAA-MM-JJ (sert au tri, plus récent en premier)
    tag:     "Skills",                         // Modèle | Produit | Code | Cowork | Connecteurs | Skills | Entreprise
    title:   "Titre court",
    summary: "1 à 2 phrases en français, claires et neutres.",
    url:     "https://www.anthropic.com/news/..."   // lien source (optionnel)
  }
  // … autres entrées
];
```

C'est un **fichier `.js`** (et non `.json`) volontairement : il se charge via une balise
`<script>`, donc la page fonctionne aussi bien en local (`file://`) que sur GitHub Pages,
sans souci de CORS. `news.html` trie, formate les dates en français et fait le rendu tout seul.

### Mise à jour manuelle
1. Éditez le tableau `CLAUDE_NEWS` (ajoutez vos entrées en haut).
2. Mettez à jour `CLAUDE_NEWS_UPDATED`.
3. `git commit` + `git push`. GitHub Pages publie la nouvelle version.

> 💡 Aucune autre page n'est à toucher. Le `tag` colore automatiquement la pastille
> selon la couleur de thème correspondante.

---

## 2. Automatisation : Option B (active) ✅

**C'est l'option mise en place** — elle tourne entièrement sur les serveurs de GitHub,
donc **votre ordinateur peut être éteint**.

- Workflow : `.github/workflows/update-news.yml` — s'exécute **chaque lundi à 08:00 (Europe/Paris)**
  et à la demande (bouton « Run workflow »).
- Script : `scripts/update-news.mjs` — utilise l'**API Claude + la recherche web** pour
  trouver les dernières actualités, les résumer en français, et réécrire `assets/data/news.js`.
- Le workflow **commit + push** ensuite (uniquement s'il y a un changement). GitHub Pages
  redéploie tout seul.

### ⚙️ Activation (une seule fois)
1. Repo → **Settings → Secrets and variables → Actions → New repository secret**.
2. Nom : `ANTHROPIC_API_KEY` — Valeur : votre clé d'API Anthropic.
3. (Test) Onglet **Actions** → « Mettre à jour les actualités » → **Run workflow**.

> 💡 Modèle par défaut : `claude-sonnet-4-6` (bon rapport qualité/coût). Pour une curation
> plus fine, passez `NEWS_MODEL` à `claude-opus-4-8` dans le workflow.
>
> ⚠️ GitHub désactive les workflows planifiés après ~60 jours sans activité sur le dépôt —
> un simple push les réactive.

### Autres pistes (non retenues)

- **Claude Code planifié** *(Option A)* — une routine cloud `/schedule` qui fait la même
  chose. Aussi valable, mais nécessite que votre compte GitHub soit connecté à Claude Code
  (ce qui n'était pas le cas ici), d'où le choix de l'Option B.
- **Claude Cowork** — excellent pour **rechercher et rédiger** le fil, mais sans connecteur
  GitHub il ne peut pas pousser tout seul : il faut coller le résultat ou laisser Code/Actions publier.
- **Récupération côté navigateur (live)** — la page irait chercher un flux à chaque visite.
  Dépend d'un service tiers + CORS, expose une clé côté client : **non recommandé**.

---

## 3. Prompt prêt à l'emploi pour l'agent

> Mets à jour les actualités du site ClaudeTools.
> 1. Recherche sur le web les nouveautés **récentes** de l'univers Claude (Anthropic) :
>    modèles, Claude Code, Cowork, Connecteurs/MCP, Skills, annonces entreprise.
> 2. Sélectionne 5 à 8 nouvelles fiables et marquantes.
> 3. Réécris **entièrement** `assets/data/news.js` en respectant exactement le format
>    (champs `date`, `tag`, `title`, `summary`, `url`). Résumés en français, neutres,
>    1–2 phrases. Trie par date décroissante. Mets `CLAUDE_NEWS_UPDATED` à la date du jour.
>    Choisis `tag` parmi : Modèle, Produit, Code, Cowork, Connecteurs, Skills, Entreprise.
> 4. Ne modifie aucun autre fichier. Commit (« chore: maj actualités ») puis push.

---

## 4. Récap fichiers

| Fichier | Rôle |
| --- | --- |
| `assets/data/news.js` | Les actualités affichées. Régénéré par l'automatisation ; éditable à la main. |
| `news.html` | La page d'affichage (rendu automatique, rien à modifier). |
| `assets/js/script.js` | Logique de rendu (tri, dates FR, pastilles colorées). |
| `scripts/update-news.mjs` | Le script qui recherche les actus (API Claude + web) et réécrit `news.js`. |
| `.github/workflows/update-news.yml` | L'automatisation GitHub Actions (Option B) — lundi 08:00 Paris. |
