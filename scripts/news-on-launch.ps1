<#
  ClaudeTools — Déclencheur « au lancement de Claude Code » (hook SessionStart)
  -----------------------------------------------------------------------------
  Lancé à chaque démarrage d'une session Claude Code. Ne met à jour les
  actualités QU'UNE FOIS PAR SEMAINE (au premier lancement à partir du lundi).
  Ne bloque pas la session : l'updater part en arrière-plan.

  Aucun argument. Sort toujours en 0 pour ne jamais gêner le démarrage.
#>

try {
  $marker = Join-Path $PSScriptRoot '.last-news-update'
  $today  = Get-Date

  # Lundi de la semaine en cours (lundi = 0)
  $daysSinceMonday = ([int]$today.DayOfWeek + 6) % 7
  $thisMonday = $today.Date.AddDays(-$daysSinceMonday).ToString('yyyy-MM-dd')

  $last = if (Test-Path $marker) { (Get-Content $marker -Raw).Trim() } else { '' }

  # Déjà exécuté cette semaine (depuis ce lundi) -> on ne fait rien.
  if ($last -ge $thisMonday) { exit 0 }

  # Marque tout de suite (évite un double lancement si on ouvre 2 sessions).
  Set-Content -Path $marker -Value $today.ToString('yyyy-MM-dd') -Encoding ascii

  # Lance l'updater en arrière-plan, fenêtre cachée — ne bloque pas Claude.
  $updater = Join-Path $PSScriptRoot 'update-news.ps1'
  Start-Process -FilePath 'powershell.exe' -WindowStyle Hidden -ArgumentList @(
    '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', $updater
  )
} catch {
  # On n'interrompt jamais le démarrage de Claude pour une erreur d'actus.
}
exit 0
