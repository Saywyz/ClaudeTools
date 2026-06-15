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
   ========================================================= */

window.CLAUDE_NEWS_UPDATED = "2026-06-15";

window.CLAUDE_NEWS = [
  {
    date: "2026-06-12",
    tag: "Entreprise",
    title: "Accès suspendu à Fable 5 et Mythos 5",
    summary: "Anthropic indique suspendre l'accès à Claude Fable 5 et Claude Mythos 5 à la suite d'une directive du gouvernement américain, peu après leur lancement.",
    url: "https://www.anthropic.com/news/fable-mythos-access"
  },
  {
    date: "2026-06-11",
    tag: "Entreprise",
    title: "Lancement de Claude Corps",
    summary: "Anthropic présente Claude Corps, un programme national de bourses destiné aux profils en début de carrière qui souhaitent étendre les bénéfices de l'IA à leurs communautés.",
    url: "https://www.anthropic.com/news/claude-corps"
  },
  {
    date: "2026-06-09",
    tag: "Modèle",
    title: "Claude Fable 5 et Claude Mythos 5",
    summary: "Anthropic dévoile Claude Fable 5, présenté comme son modèle le plus performant à ce jour (code, vision, contexte long), aux côtés de Mythos 5, sa variante réservée à des usages autorisés.",
    url: "https://www.anthropic.com/news/claude-fable-5-mythos-5"
  },
  {
    date: "2026-05-28",
    tag: "Modèle",
    title: "Claude Opus 4.8",
    summary: "Le nouveau modèle Opus 4.8 progresse sur le code, les tâches agentiques et le travail professionnel, avec un accent sur la fiabilité — environ quatre fois moins susceptible que Opus 4.7 de laisser passer un défaut dans le code qu'il produit.",
    url: "https://www.anthropic.com/news/claude-opus-4-8"
  },
  {
    date: "2026-05-28",
    tag: "Code",
    title: "Dynamic Workflows dans Claude Code",
    summary: "Lancée avec Opus 4.8, la fonctionnalité « dynamic workflows » permet à Claude Code d'orchestrer en parallèle de nombreux sous-agents pour traiter des tâches de grande ampleur.",
    url: "https://www.anthropic.com/news/claude-opus-4-8"
  },
  {
    date: "2026-05-14",
    tag: "Entreprise",
    title: "Partenariat élargi avec PwC",
    summary: "Anthropic et PwC étendent leur alliance : un Centre d'excellence commun et un programme visant à former et certifier 30 000 professionnels de PwC à l'usage de Claude.",
    url: "https://www.anthropic.com/news/pwc-expanded-partnership"
  },
  {
    date: "2026-05-06",
    tag: "Code",
    title: "Code with Claude 2026",
    summary: "Lors de sa conférence développeurs, Anthropic présente plusieurs nouveautés autour de Claude Code et de sa plateforme : agents managés et multi-agents, agents distants, « routines » et correction automatique en intégration continue.",
    url: "https://www.infoq.com/news/2026/05/code-with-claude/"
  }
];
