#!/bin/bash

# Security Update Script for CVE-2025-66478 & CVE-2025-55182
# This script updates Next.js and React to secure versions

echo "🚨 Critical Security Update - CVE-2025-66478 & CVE-2025-55182"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📋 Current versions:"
echo "Next.js: $(npm list next --depth=0 2>/dev/null | grep next@ || echo 'Not found')"
echo "React: $(npm list react --depth=0 2>/dev/null | grep react@ || echo 'Not found')"
echo ""

echo "🧹 Cleaning up old dependencies..."
rm -rf node_modules package-lock.json pnpm-lock.yaml yarn.lock

echo "📦 Installing updated secure dependencies..."
npm install

echo ""
echo "✅ Verifying updates:"
echo "Next.js version: $(npx next --version 2>/dev/null || echo 'Error checking version')"
echo "React version: $(npm list react --depth=0 2>/dev/null | grep react@ || echo 'Error checking version')"
echo ""

echo "🔨 Building application to verify everything works..."
if npm run build; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Ready to deploy! Run one of these commands:"
    echo "   git add . && git commit -m '🔒 Security update: Fix CVE-2025-66478 & CVE-2025-55182' && git push"
    echo "   vercel --prod"
    echo ""
    echo "🛡️  IMPORTANT: If your app was online Dec 4-6, 2025, rotate your environment variables!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi