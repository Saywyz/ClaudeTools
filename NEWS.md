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

## 2. Options pour automatiser

### Option A — Claude Code planifié ⭐ *(recommandé, correspond à votre config)*
C'est l'option la plus alignée avec votre setup : **seul Claude Code est branché à votre MCP GitHub**.

- Créez une **routine planifiée** (ex. tous les lundis) via la commande `/schedule`
  de Claude Code, avec le prompt de la section 3 ci-dessous.
- À chaque exécution, Claude Code : recherche les dernières actualités Claude sur le web,
  réécrit `assets/data/news.js`, puis **commit + push** (via git ou le MCP GitHub).
- ✅ Avantages : qualité éditoriale (résumés propres en français), pousse tout seul,
  aucune clé d'API à gérer si vous utilisez votre session Claude Code.
- ⚠️ À garder en tête : la machine/agent doit pouvoir s'exécuter à l'heure prévue.

### Option B — GitHub Actions (cloud, autonome)
Un workflow tourne sur un cron GitHub, sans votre machine. Modèle fourni :
`.github/workflows/update-news.yml` (déclenchement **manuel** par défaut ; décommentez
le `schedule` pour l'activer).

- Variante **qualité** : le workflow appelle l'API Claude (secret `ANTHROPIC_API_KEY`)
  pour rédiger les résumés, puis commit le fichier.
- Variante **zéro-secret** : un petit script récupère un flux RSS d'actualités
  (ex. Google News « Anthropic Claude ») et génère `news.js`. Moins « propre »
  éditorialement, mais 100 % autonome et gratuit.
- ✅ Avantages : tourne dans le cloud, indépendant de votre poste.
- ⚠️ À garder en tête : la variante qualité nécessite un secret d'API.

### Option C — Claude Cowork
Cowork peut **rechercher et rédiger** le fil d'actualités très bien. Mais dans votre
config, **il n'a pas accès au MCP GitHub** : il ne peut donc pas pousser tout seul.

- Usage pratique : demandez à Cowork de produire le tableau `CLAUDE_NEWS` à jour,
  puis collez-le dans `news.js` (ou laissez Claude Code faire le push).
- Devient pleinement automatique si vous ajoutez un **connecteur GitHub** à Cowork.

### Option D — Récupération côté navigateur (live)
La page elle-même irait chercher un flux à chaque visite (RSS-to-JSON, API…).

- ✅ Avantages : « temps réel », aucun commit.
- ⚠️ Inconvénients : dépend d'un service tiers + CORS, clé d'API exposée côté client,
  fiabilité variable. **Non recommandé** pour un site propre et durable.

**Recommandation :** Option A (Claude Code planifié) pour la qualité et parce que c'est
déjà branché à votre GitHub ; Option B en complément si vous voulez du 100 % cloud.

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
| `assets/data/news.js` | **La seule source à éditer.** Le tableau des actualités. |
| `news.html` | La page d'affichage (rendu automatique, rien à modifier). |
| `assets/js/script.js` | Logique de rendu (tri, dates FR, pastilles colorées). |
| `.github/workflows/update-news.yml` | Modèle d'automatisation GitHub Actions (Option B). |
