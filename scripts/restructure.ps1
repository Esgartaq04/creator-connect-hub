$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $root

$client = Join-Path $root "client"
$server = Join-Path $root "server"

New-Item -ItemType Directory -Force -Path $client | Out-Null
New-Item -ItemType Directory -Force -Path $server | Out-Null

$itemsToMove = @(
  "src",
  "public",
  "index.html",
  "vite.config.ts",
  "tsconfig.app.json",
  "tsconfig.json",
  "tsconfig.node.json",
  "tailwind.config.ts",
  "postcss.config.js",
  "eslint.config.js",
  "components.json",
  "vitest.config.ts",
  "bun.lockb"
)

foreach ($item in $itemsToMove) {
  $source = Join-Path $root $item
  if (Test-Path $source) {
    Move-Item -Path $source -Destination $client -Force
  }
}

Write-Host "Restructure complete."
Write-Host "Next steps:"
Write-Host "1) Delete root node_modules and package-lock.json if present."
Write-Host "2) Run: npm install --workspaces"
Write-Host "3) Run: npm run dev (client) and npm run dev:server (server)"
