# 🔐 Auth0 Setup Guide for HealthSave

## Step 1: Create Auth0 Account

1. Go to [auth0.com](https://auth0.com)
2. Sign up for a free account
3. Create a new application

## Step 2: Configure Auth0 Application

1. **Application Type**: Regular Web Application
2. **Name**: HealthSave
3. **Technology**: Next.js

### Application Settings:

**Allowed Callback URLs:**
```
http://localhost:3000/api/auth/callback
http://localhost:3000/callback
https://your-vercel-domain.vercel.app/api/auth/callback
https://your-vercel-domain.vercel.app/callback
```

**Allowed Logout URLs:**
```
http://localhost:3000
http://localhost:3000/portals
https://your-vercel-domain.vercel.app
https://your-vercel-domain.vercel.app/portals
```

**Allowed Web Origins:**
```
http://localhost:3000
https://your-vercel-domain.vercel.app
```

## Step 3: Get Your Auth0 Credentials

From your Auth0 dashboard, copy these values:

- **Domain**: `your-domain.auth0.com`
- **Client ID**: `your_client_id_here`
- **Client Secret**: `your_client_secret_here`

## Step 4: Update Environment Variables

Add these to your `.env.local`:

```bash
# Auth0 Configuration
AUTH0_SECRET=use_a_long_random_value_at_least_32_characters
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your_client_id_here
AUTH0_CLIENT_SECRET=your_client_secret_here
```

## Step 5: Generate AUTH0_SECRET

✅ **ALREADY DONE!** We've generated a secure secret for you.

If you need to generate a new one, run:
```bash
node scripts/setup-auth0.js
```

Or manually:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 6: For Production (Vercel)

Update these environment variables in Vercel:

```bash
AUTH0_SECRET=your_generated_secret
AUTH0_BASE_URL=https://your-vercel-domain.vercel.app
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
```

## Step 7: Test Authentication

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/portals`
3. Click "User Portal"
4. You should be redirected to Auth0 login
5. After login, you'll be redirected to the user dashboard

## Features Implemented:

✅ **Secure Login/Signup** - Auth0 handles authentication
✅ **User Profile Display** - Shows name, email, profile picture
✅ **Protected Routes** - User dashboard requires authentication
✅ **Automatic Redirects** - Login redirects to dashboard
✅ **Logout Functionality** - Secure logout with redirect
✅ **User Data Integration** - Profile data displayed in dashboard

## User Dashboard Features:

- **Profile Section**: Displays user info (name, email, join date)
- **Profile Picture**: Shows Auth0 profile image or default avatar
- **Logout Button**: Secure logout functionality
- **All Existing Features**: Hospital search, Nurse Maya, etc.

## Troubleshooting:

1. **Login not working**: Check callback URLs in Auth0
2. **Redirect issues**: Verify AUTH0_BASE_URL matches your domain
3. **Profile not showing**: Check user permissions in Auth0
4. **Development vs Production**: Update URLs for each environment