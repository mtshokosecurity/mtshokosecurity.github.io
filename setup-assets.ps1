# Copies the shared images (logo, hero photo, client logos, favicons) from the
# Netlify site folder (one level up) into this github folder so it can be
# published on its own.
#
# Run once from this folder:
#   powershell -ExecutionPolicy Bypass -File .\setup-assets.ps1
# Delete this file before publishing.

$here = $PSScriptRoot
$src  = Split-Path $here -Parent

New-Item -ItemType Directory -Force -Path "$here\img\clients" | Out-Null

function Copy-One($from, $to, $label) {
  if (Test-Path $from) { Copy-Item $from $to -Force; Write-Host "OK      $label" }
  else { Write-Host "MISSING $from" }
}

# images
Copy-One "$src\img\logo-yellow.jpeg" "$here\img\logo-yellow.jpeg" "img\logo-yellow.jpeg"
Copy-One "$src\img\hero-guards.jpg"  "$here\img\hero-guards.jpg"  "img\hero-guards.jpg"
Copy-One "$src\img\og-image.jpg"     "$here\img\og-image.jpg"     "img\og-image.jpg (social share image)"

# apple touch icon lives in the root of the Netlify folder
Copy-One "$src\apple-touch-icon.png" "$here\img\apple-touch-icon.png" "img\apple-touch-icon.png"

# client logos
if (Test-Path "$src\img\clients") {
  Copy-Item "$src\img\clients\*" "$here\img\clients" -Force
  Write-Host "OK      img\clients ($((Get-ChildItem "$here\img\clients").Count) files)"
} else { Write-Host "MISSING $src\img\clients" }

# favicons (root)
$rootFiles = @("favicon.ico","favicon-32x32.png","favicon-16x16.png","android-chrome-192x192.png","android-chrome-512x512.png")
foreach ($f in $rootFiles) { Copy-One "$src\$f" "$here\$f" $f }

Write-Host "Done."
