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

window.CLAUDE_NEWS_UPDATED = "2026-06-22";

window.CLAUDE_NEWS = [
  {
    date: "2026-06-18",
    tag: "Connecteurs",
    title: "Connecteurs MCP gérés par l'entreprise",
    summary: "Anthropic introduit l'autorisation centralisée des connecteurs MCP via le fournisseur d'identité (à commencer par Okta) : un administrateur autorise un connecteur une seule fois et les utilisateurs y accèdent automatiquement à la première connexion, dans Claude, Claude Code et Cowork.",
    url: "https://releasebot.io/updates/anthropic"
  },
  {
    date: "2026-06-18",
    tag: "Code",
    title: "Artifacts dans Claude Code",
    summary: "Claude Code peut désormais générer des « Artifacts » : des pages web partageables produites depuis une session, dont les mises à jour sont publiées automatiquement à la même URL. La fonctionnalité est en bêta pour les organisations Team et Enterprise.",
    url: "https://releasebot.io/updates/anthropic"
  },
  {
    date: "2026-06-17",
    tag: "Entreprise",
    title: "Ouverture d'un bureau à Séoul",
    summary: "Anthropic ouvre un bureau à Séoul et annonce de nouveaux partenariats au sein de l'écosystème IA coréen pour accompagner l'adoption de Claude dans la région.",
    url: "https://www.anthropic.com/news"
  },
  {
    date: "2026-06-12",
    tag: "Entreprise",
    title: "Accès suspendu à Fable 5 et Mythos 5",
    summary: "Moins d'une semaine après leur lancement, Anthropic indique suspendre l'accès à Claude Fable 5 et Claude Mythos 5 à la suite d'une directive de contrôle des exportations du gouvernement américain.",
    url: "https://www.infoq.com/news/2026/06/claude-5-release/"
  },
  {
    date: "2026-06-09",
    tag: "Modèle",
    title: "Claude Fable 5 et Claude Mythos 5",
    summary: "Anthropic dévoile Claude Fable 5, présenté comme son modèle grand public le plus performant (résultats à l'état de l'art sur la quasi-totalité des tests), avec une réflexion adaptative permanente, un contexte d'un million de tokens et 128K tokens en sortie, aux côtés de la variante Mythos 5.",
    url: "https://www.infoq.com/news/2026/06/claude-5-release/"
  },
  {
    date: "2026-06-05",
    tag: "Cowork",
    title: "Doublement temporaire des limites de Cowork",
    summary: "Du 5 juin au 5 juillet 2026, Anthropic double la limite d'usage sur 5 heures dans Claude Cowork, sans action requise, pour les offres Pro, Max et Team (les limites hebdomadaires restant inchangées).",
    url: "https://thenewstack.io/anthropic-claude-cowork-promotion/"
  },
  {
    date: "2026-06-01",
    tag: "Entreprise",
    title: "Dépôt confidentiel en vue d'une introduction en bourse",
    summary: "Anthropic a transmis de façon confidentielle un projet de document d'enregistrement (Form S-1) à la SEC américaine, en vue d'une éventuelle introduction en bourse de ses actions ordinaires.",
    url: "https://www.anthropic.com/news/confidential-draft-s1-sec"
  },
  {
    date: "2026-05-28",
    tag: "Modèle",
    title: "Claude Opus 4.8",
    summary: "Anthropic lance Opus 4.8, qui progresse sur le code, les tâches agentiques et le travail professionnel, et devient le modèle par défaut pour les offres Max, Team Premium et Enterprise ainsi que sur l'API.",
    url: "https://9to5mac.com/2026/05/28/anthropic-upgrades-claude-with-new-opus-4-8-model-heres-whats-new/"
  }
];
