# Actualités — comment ça marche & l'automatisation

La page **Actualités** (`news.html`) affiche un fil de nouvelles sur l'univers Claude.
Tout repose sur **un seul fichier de données**, réécrit chaque semaine par une
tâche planifiée locale qui utilise **votre licence Claude Code** (aucune clé d'API).

## 1. La source unique : `assets/data/news.js`

```js
window.CLAUDE_NEWS_UPDATED = "2026-06-12";   // date affichée « Dernière mise à jour »

window.CLAUDE_NEWS = [
  {
    date:    "2026-06-05",                    // ISO AAAA-MM-JJ (tri : plus récent en premier)
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
1. Éditez le tableau `CLAUDE_NEWS` (ajoutez vos entrées) et `CLAUDE_NEWS_UPDATED`.
2. `git commit` + `git push`. GitHub Pages publie la nouvelle version.

---

## 2. Automatisation : Option A — Claude Code planifié (active) ✅

Une **tâche planifiée Windows** lance Claude Code en mode automatique (headless) chaque
lundi matin. Claude recherche les dernières actualités sur le web, réécrit `news.js`,
puis **commit + push**. GitHub Pages redéploie tout seul.

- **Aucune clé d'API** — utilise votre licence/abonnement Claude Code déjà connecté.
- Script lancé : **`scripts/update-news.ps1`** (contient le prompt ; éditable).
- Tâche planifiée : **`ClaudeTools - MAJ actualites`**.

### Déclencheur — « le lundi matin, quand j'allume le PC »
La tâche est réglée sur **lundi 09:00**, avec l'option **« exécuter dès que possible
après un démarrage manqué » (`StartWhenAvailable`)**. Concrètement :

- PC allumé le lundi à 9h → elle part à 9h.
- PC éteint à 9h → elle part **peu après l'allumage / la connexion** ce jour-là (ou le
  prochain où le PC est allumé). C'est exactement le comportement souhaité.

Elle ne tourne que **lorsque vous êtes connecté** (pour accéder à votre licence Claude
Code et à vos identifiants git), et ne réveille pas le PC depuis la veille.

### (Ré)installer ou modifier la tâche
Recréer la tâche (PowerShell, dans le dossier du dépôt) :

```powershell
$ps1 = (Resolve-Path .\scripts\update-news.ps1).Path
$action  = New-ScheduledTaskAction  -Execute 'powershell.exe' `
            -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$ps1`""
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At 9:00am
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Hours 1)
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited
Register-ScheduledTask -TaskName 'ClaudeTools - MAJ actualites' `
  -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Force
```

### Tester / piloter la tâche
- **Lancer maintenant** : `Start-ScheduledTask -TaskName 'ClaudeTools - MAJ actualites'`
  (ou clic droit → « Exécuter » dans le Planificateur de tâches).
- **Voir le résultat** : `Get-ScheduledTaskInfo -TaskName 'ClaudeTools - MAJ actualites'`
  et le journal `scripts/update-news.log`.
- **Changer l'heure/jour** : modifiez `$trigger` ci-dessus et relancez `Register-ScheduledTask`.
- **Désactiver** : `Disable-ScheduledTask -TaskName 'ClaudeTools - MAJ actualites'`.

### Autres pistes (non retenues)
- **GitHub Actions (cloud)** — fonctionne sans votre PC, mais exige une **clé d'API**
  (`ANTHROPIC_API_KEY`) → écarté pour rester sur la licence Claude Code.
- **Claude Cowork** — peut rechercher/rédiger le fil, mais sans connecteur GitHub il ne
  pousse pas tout seul.
- **Récupération côté navigateur (live)** — dépend d'un service tiers + CORS, clé exposée
  côté client : non recommandé.

---

## 3. Le prompt utilisé

Le prompt envoyé à Claude Code vit dans `scripts/update-news.ps1` (variable `$prompt`).
En résumé : rechercher les actus Claude récentes, sélectionner 5–8 items fiables, réécrire
`assets/data/news.js` au format exact (date, tag, title, summary, url ; résumés FR ; tri
décroissant ; `CLAUDE_NEWS_UPDATED` = date du jour), ne toucher à rien d'autre, puis
`git commit` + `git push` si le contenu a changé.

---

## 4. Récap fichiers

| Fichier | Rôle |
| --- | --- |
| `assets/data/news.js` | Les actualités affichées. Régénéré par l'automatisation ; éditable à la main. |
| `news.html` | La page d'affichage (rendu automatique, rien à modifier). |
| `assets/js/script.js` | Logique de rendu (tri, dates FR, pastilles colorées). |
| `scripts/update-news.ps1` | Lance Claude Code (licence) pour rechercher les actus et réécrire `news.js`. |
| `scripts/update-news.log` | Journal des exécutions (ignoré par git). |
| Tâche `ClaudeTools - MAJ actualites` | Déclencheur Windows : lundi 09:00 + rattrapage au démarrage. |
