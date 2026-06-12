/* =========================================================
   ClaudeTools — Générateur d'actualités (Option B, cloud)
   ---------------------------------------------------------
   Exécuté par GitHub Actions (.github/workflows/update-news.yml).
   Utilise l'API Claude + l'outil de recherche web côté serveur
   pour trouver les dernières actualités Claude, puis réécrit
   assets/data/news.js.

   Lancement local (pour tester) :
     ANTHROPIC_API_KEY=sk-ant-... node scripts/update-news.mjs

   Variables d'environnement :
     ANTHROPIC_API_KEY  (obligatoire)
     NEWS_MODEL         (optionnel, défaut: claude-sonnet-4-6)
   ========================================================= */

import Anthropic from "@anthropic-ai/sdk";
import { writeFileSync } from "node:fs";

const client = new Anthropic(); // lit ANTHROPIC_API_KEY dans l'environnement

const MODEL = process.env.NEWS_MODEL || "claude-sonnet-4-6";
const TAGS = ["Modèle", "Produit", "Code", "Cowork", "Connecteurs", "Skills", "Entreprise"];
const today = new Date().toISOString().slice(0, 10); // AAAA-MM-JJ

const prompt = `Nous sommes le ${today}.

Recherche sur le web les actualités RÉCENTES (idéalement des deux derniers mois) de l'univers Claude d'Anthropic : nouveaux modèles, Claude Code, Claude Cowork, Connecteurs / MCP, Agent Skills, et annonces d'entreprise. Privilégie anthropic.com et des sources de presse tech réputées. Évite les rumeurs et le clickbait.

Sélectionne 5 à 8 nouvelles fiables et marquantes.

Réponds UNIQUEMENT avec un objet JSON valide — aucun texte avant ou après, aucune balise Markdown. Format EXACT :
{
  "updated": "${today}",
  "items": [
    {
      "date": "AAAA-MM-JJ",
      "tag": "un seul parmi : ${TAGS.join(", ")}",
      "title": "titre court",
      "summary": "1 à 2 phrases neutres EN FRANÇAIS",
      "url": "lien vers la source"
    }
  ]
}

Trie les items par date décroissante (le plus récent en premier). Résumés factuels, concis, en français.`;

let messages = [{ role: "user", content: prompt }];
let final = null;

// L'outil web_search tourne côté serveur ; le modèle peut renvoyer
// stop_reason "pause_turn" s'il atteint la limite d'itérations — on relance.
for (let i = 0; i < 6; i++) {
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 8 }],
    messages,
  });

  if (res.stop_reason === "pause_turn") {
    messages = [...messages, { role: "assistant", content: res.content }];
    continue;
  }
  final = res;
  break;
}

if (!final) throw new Error("Aucune réponse finale du modèle (trop de pauses).");

const text = final.content
  .filter((b) => b.type === "text")
  .map((b) => b.text)
  .join("\n")
  .trim();

// Extraction tolérante du bloc JSON.
const start = text.indexOf("{");
const end = text.lastIndexOf("}");
if (start === -1 || end === -1) {
  throw new Error("Aucun JSON trouvé dans la réponse du modèle :\n" + text);
}

const data = JSON.parse(text.slice(start, end + 1));

let items = (Array.isArray(data.items) ? data.items : [])
  .filter((it) => it && it.date && it.title && it.summary)
  .map((it) => ({
    date: String(it.date).slice(0, 10),
    tag: TAGS.includes(it.tag) ? it.tag : "Produit",
    title: String(it.title).trim(),
    summary: String(it.summary).trim(),
    url: typeof it.url === "string" && it.url ? it.url : "https://www.anthropic.com/news",
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

// Garde-fou : ne jamais écraser le fichier avec une liste vide.
if (!items.length) {
  throw new Error("Aucune actualité valide produite — news.js laissé inchangé.");
}

const updated = /^\d{4}-\d{2}-\d{2}$/.test(data.updated || "") ? data.updated : today;

const header = `/* =========================================================
   ClaudeTools — Données d'actualités Claude
   ---------------------------------------------------------
   ⚠️ Fichier GÉNÉRÉ automatiquement par scripts/update-news.mjs
      (workflow .github/workflows/update-news.yml).
      Il peut aussi être édité à la main — voir NEWS.md.

   Format d'une entrée : { date, tag, title, summary, url }
   tag ∈ Modèle | Produit | Code | Cowork | Connecteurs | Skills | Entreprise
   ========================================================= */
`;

const body =
  header +
  `\nwindow.CLAUDE_NEWS_UPDATED = ${JSON.stringify(updated)};\n\n` +
  `window.CLAUDE_NEWS = ${JSON.stringify(items, null, 2)};\n`;

writeFileSync(new URL("../assets/data/news.js", import.meta.url), body);
console.log(`✔ news.js mis à jour : ${items.length} actualités (date ${updated}).`);
