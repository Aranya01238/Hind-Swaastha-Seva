# Security Update Script for CVE-2025-66478 & CVE-2025-55182
# This script updates Next.js and React to secure versions

Write-Host "🚨 Critical Security Update - CVE-2025-66478 & CVE-2025-55182" -ForegroundColor Red
Write-Host "==================================================" -ForegroundColor Yellow
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

Write-Host "📋 Current versions:" -ForegroundColor Cyan
try {
    $nextVersion = npm list next --depth=0 2>$null | Select-String "next@"
    Write-Host "Next.js: $nextVersion"
} catch {
    Write-Host "Next.js: Not found"
}

try {
    $reactVersion = npm list react --depth=0 2>$null | Select-String "react@"
    Write-Host "React: $reactVersion"
} catch {
    Write-Host "React: Not found"
}
Write-Host ""

Write-Host "🧹 Cleaning up old dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }
if (Test-Path "pnpm-lock.yaml") { Remove-Item -Force "pnpm-lock.yaml" }
if (Test-Path "yarn.lock") { Remove-Item -Force "yarn.lock" }

Write-Host "📦 Installing updated secure dependencies..." -ForegroundColor Green
npm install

Write-Host ""
Write-Host "✅ Verifying updates:" -ForegroundColor Green
try {
    $newNextVersion = npx next --version 2>$null
    Write-Host "Next.js version: $newNextVersion"
} catch {
    Write-Host "Next.js version: Error checking version" -ForegroundColor Red
}

try {
    $newReactVersion = npm list react --depth=0 2>$null | Select-String "react@"
    Write-Host "React version: $newReactVersion"
} catch {
    Write-Host "React version: Error checking version" -ForegroundColor Red
}
Write-Host ""

Write-Host "🔨 Building application to verify everything works..." -ForegroundColor Cyan
$buildResult = npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Ready to deploy! Run one of these commands:" -ForegroundColor Cyan
    Write-Host "   git add . && git commit -m '🔒 Security update: Fix CVE-2025-66478 & CVE-2025-55182' && git push" -ForegroundColor White
    Write-Host "   vercel --prod" -ForegroundColor White
    Write-Host ""
    Write-Host "🛡️  IMPORTANT: If your app was online Dec 4-6, 2025, rotate your environment variables!" -ForegroundColor Yellow
} else {
    Write-Host "❌ Build failed. Please check the errors above." -ForegroundColor Red
    exit 1
}