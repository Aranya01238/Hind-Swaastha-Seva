#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

console.log('🔐 Auth0 Setup Helper for HealthSave\n');

// Generate a secure AUTH0_SECRET
const auth0Secret = crypto.randomBytes(32).toString('hex');

console.log('✅ Generated secure AUTH0_SECRET:');
console.log(`AUTH0_SECRET=${auth0Secret}\n`);

// Read current .env.local
const envPath = path.join(process.cwd(), '.env.local');
let envContent = '';

try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
    console.log('❌ Could not read .env.local file');
    process.exit(1);
}

// Update AUTH0_SECRET in .env.local
const updatedContent = envContent.replace(
    /AUTH0_SECRET=.*/,
    `AUTH0_SECRET=${auth0Secret}`
);

fs.writeFileSync(envPath, updatedContent);

console.log('✅ Updated .env.local with new AUTH0_SECRET\n');

console.log('📋 Next Steps:');
console.log('1. Go to https://auth0.com and create a free account');
console.log('2. Create a new "Regular Web Application"');
console.log('3. In your Auth0 app settings, set:');
console.log('   - Allowed Callback URLs: http://localhost:3000/api/auth/callback');
console.log('   - Allowed Logout URLs: http://localhost:3000');
console.log('   - Allowed Web Origins: http://localhost:3000');
console.log('4. Copy your Domain, Client ID, and Client Secret');
console.log('5. Update these values in your .env.local file:');
console.log('   - AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com');
console.log('   - AUTH0_CLIENT_ID=your_client_id');
console.log('   - AUTH0_CLIENT_SECRET=your_client_secret');
console.log('6. Run: npm run dev');
console.log('7. Visit: http://localhost:3000/portals');
console.log('8. Click "User Portal" to test Auth0 login\n');

console.log('🚀 Your Auth0 integration is ready to configure!');