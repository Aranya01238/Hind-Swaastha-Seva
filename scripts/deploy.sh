#!/bin/bash

echo "🚀 HealthSave Vercel Deployment Script"
echo "======================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project locally first to check for errors
echo "🔨 Building project locally..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Local build successful!"
    
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    echo "✅ Deployment complete!"
    echo ""
    echo "📝 Don't forget to:"
    echo "1. Add environment variables in Vercel dashboard"
    echo "2. Test all functionality on the live site"
    echo "3. Check the deploy.md file for detailed instructions"
else
    echo "❌ Local build failed. Please fix errors before deploying."
    exit 1
fi