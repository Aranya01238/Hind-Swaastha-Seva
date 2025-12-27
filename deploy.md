# HealthSave Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
```bash
vercel --prod
```

## 🔧 Environment Variables Setup

After deployment, you need to add these environment variables in your Vercel dashboard:

### Required Variables:
```
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key
NEXT_PUBLIC_ELEVENLABS_VOICE_ID=Xb7hH8MSUJpSbSDYk0k2
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash-latest
ENABLE_AI=true
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Optional Variables (for full functionality):
```
SHEETS_ID=your_google_sheets_id
SHEETS_WRITE_URL=your_apps_script_url
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_service_account_private_key
GOOGLE_SHEET_ID=your_user_data_sheet_id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 📝 Step-by-Step Vercel Dashboard Setup

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub/GitLab/Bitbucket
3. Import your repository
4. Go to Project Settings → Environment Variables
5. Add all the variables listed above
6. Redeploy the project

## 🔗 Alternative: GitHub Integration

1. Push your code to GitHub
2. Connect Vercel to your GitHub repository
3. Vercel will auto-deploy on every push
4. Add environment variables in Vercel dashboard

## ✅ Post-Deployment Checklist

- [ ] All environment variables added
- [ ] AI chatbot working (Gemini API)
- [ ] Text-to-speech working (ElevenLabs)
- [ ] Database connections working (Supabase)
- [ ] All portal pages accessible
- [ ] Mobile responsiveness tested

## 🐛 Troubleshooting

### Common Issues:
1. **Build fails**: Check package.json dependencies
2. **Environment variables not working**: Ensure they're added in Vercel dashboard
3. **API routes failing**: Check function timeout settings
4. **Hydration errors**: Clear browser cache and test

### Support:
- Vercel Documentation: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment