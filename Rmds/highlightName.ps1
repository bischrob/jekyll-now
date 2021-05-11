$content = Get-content -Path $Args[0];
$newContent = $content -replace '\*', '';
$newContent = $newContent -replace 'Bischoff,', '**Bischoff**,';
$newContent | Set-Content -Path $Args[0];

