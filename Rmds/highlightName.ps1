$content = Get-content -Path 'Rmds\publications.md';
$newContent = $content -replace 'Bischoff', '**Bischoff**';
$newContent | Set-Content -Path 'Rmds\publications.md';
Move-Item -Path 'Rmds\publications.md' -Destination 'publications.md' -Force
