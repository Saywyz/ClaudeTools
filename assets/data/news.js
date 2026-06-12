/* =========================================================
   ClaudeTools — Données d'actualités Claude
   ---------------------------------------------------------
   👉 POUR METTRE À JOUR : modifiez le tableau CLAUDE_NEWS
      ci-dessous, puis commit + push. La page news.html
      affiche automatiquement le contenu (tri par date, plus
      récent en premier).

   Format d'une entrée :
   {
     date:    "AAAA-MM-JJ",        // ISO, utilisé pour le tri
     tag:     "Modèle",            // Modèle | Produit | Code | Cowork | Connecteurs | Skills | Entreprise
     title:   "Titre court",
     summary: "1 à 2 phrases en français, claires et neutres.",
     url:     "https://www.anthropic.com/news/..."   // lien source (optionnel)
   }

   ⚠️ Les entrées ci-dessous sont des EXEMPLES de départ.
      L'automatisation (voir NEWS.md) doit remplacer ce
      tableau par les vraies actualités les plus récentes.
   ========================================================= */

window.CLAUDE_NEWS_UPDATED = "2026-06-12";

window.CLAUDE_NEWS = [
  {
    date: "2026-06-05",
    tag: "Skills",
    title: "Les Agent Skills s'étendent",
    summary: "Les Skills permettent à Claude de charger automatiquement un savoir-faire (créer un PowerPoint, un Excel, suivre une charte) au bon moment, dans les applis comme dans Claude Code.",
    url: "https://www.anthropic.com/news"
  },
  {
    date: "2026-05-20",
    tag: "Modèle",
    title: "Famille Claude Opus 4.x",
    summary: "Les modèles Opus 4.x renforcent le raisonnement, la fiabilité sur les tâches longues et la qualité du code, avec un niveau d'effort réglable.",
    url: "https://www.anthropic.com/news"
  },
  {
    date: "2026-04-30",
    tag: "Connecteurs",
    title: "Toujours plus de connecteurs (MCP)",
    summary: "Grâce au Model Context Protocol, Claude se branche à de nouvelles applis (Drive, Notion, Slack, agenda…) pour agir directement sur vos données, avec votre accord.",
    url: "https://www.anthropic.com/news"
  },
  {
    date: "2026-04-10",
    tag: "Code",
    title: "Claude Code gagne en autonomie",
    summary: "Claude Code lit tout le projet, exécute des commandes et orchestre des tâches complexes dans le terminal et l'éditeur, avec des garde-fous de validation.",
    url: "https://www.anthropic.com/news"
  },
  {
    date: "2026-03-15",
    tag: "Cowork",
    title: "Claude Cowork, le coéquipier IA",
    summary: "Confiez une tâche complète à Claude : il planifie, déroule les étapes et vous rend un résultat fini à valider — idéal pour les projets multi-étapes.",
    url: "https://www.anthropic.com/news"
  }
];
