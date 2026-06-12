<#
  ClaudeTools — Mise à jour hebdomadaire des actualités (Option A, local)
  ----------------------------------------------------------------------
  Utilise VOTRE licence Claude Code (aucune clé d'API).
  Lancé automatiquement par la tâche planifiée « ClaudeTools - MAJ actualites »
  (lundi matin, ou dès l'allumage du PC si l'horaire a été manqué).

  Test manuel :
    powershell -ExecutionPolicy Bypass -File scripts\update-news.ps1
#>

$ErrorActionPreference = 'Continue'

# Dossier du dépôt = dossier parent de ce script
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

$log = Join-Path $PSScriptRoot 'update-news.log'
"==== $(Get-Date -Format o) : démarrage ====" | Out-File -FilePath $log -Append -Encoding utf8

# Localise l'exécutable Claude Code (PATH, sinon emplacement WinGet connu)
$claude = (Get-Command claude -ErrorAction SilentlyContinue).Source
if (-not $claude) {
  $fallback = Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Packages\Anthropic.ClaudeCode_Microsoft.Winget.Source_8wekyb3d8bbwe\claude.exe'
  if (Test-Path $fallback) { $claude = $fallback }
}
if (-not $claude) {
  "ERREUR : exécutable 'claude' introuvable." | Out-File -FilePath $log -Append -Encoding utf8
  exit 1
}

$prompt = @'
Tu maintiens le fil d'actualités du site ClaudeTools (le dépôt git du dossier courant).

1. Lis assets/data/news.js et NEWS.md pour comprendre le format EXACT attendu.
2. Recherche sur le web les actualités RÉCENTES (idéalement des deux derniers mois) de l'univers Claude d'Anthropic : nouveaux modèles, Claude Code, Claude Cowork, Connecteurs / MCP, Agent Skills, et annonces d'entreprise. Privilégie anthropic.com et la presse tech réputée. Évite les rumeurs et le clickbait.
3. Sélectionne 5 à 8 nouvelles fiables et marquantes.
4. Réécris ENTIÈREMENT le fichier assets/data/news.js en respectant le format : un court commentaire d'en-tête, puis `window.CLAUDE_NEWS_UPDATED = "AAAA-MM-JJ";` (la date d'aujourd'hui), puis `window.CLAUDE_NEWS = [ ... ];`. Chaque entrée a EXACTEMENT ces champs : date (AAAA-MM-JJ), tag (un seul parmi : Modèle, Produit, Code, Cowork, Connecteurs, Skills, Entreprise), title (court), summary (1 à 2 phrases neutres EN FRANÇAIS), url (lien vers la source). Trie les entrées par date décroissante. Mets CLAUDE_NEWS_UPDATED à la date du jour.
5. Ne modifie AUCUN autre fichier.
6. Si et seulement si le contenu de news.js a réellement changé : exécute `git add assets/data/news.js`, puis `git commit -m "chore: maj actualités"`, puis `git push`. Sinon, ne committe rien.

Travaille de façon autonome, sans poser de question.
'@

# -p : mode non-interactif (headless).
# Permissions VOLONTAIREMENT limitées (pas de bypass total) : édition de fichiers,
# recherche web, et commandes git uniquement. Claude ne peut rien faire d'autre.
# $null en entrée évite l'attente de stdin quand la tâche tourne sans console.
$allowed = 'Read,Glob,Grep,Edit,Write,WebSearch,WebFetch,Bash(git:*)'
$null | & $claude -p $prompt --permission-mode acceptEdits --allowedTools $allowed 2>&1 | Tee-Object -FilePath $log -Append

"==== $(Get-Date -Format o) : terminé (exit $LASTEXITCODE) ====" | Out-File -FilePath $log -Append -Encoding utf8
