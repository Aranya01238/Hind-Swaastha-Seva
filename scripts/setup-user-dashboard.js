#!/usr/bin/env node

console.log('👤 User Dashboard Data Setup\n');

console.log('🎯 Goal: Replace mock dashboard data with real user data\n');

console.log('📋 What you need to create in Google Sheets:');
console.log('✅ Users tab - User profiles and health information');
console.log('✅ Appointments tab - Medical appointments and consultations');
console.log('✅ LabReports tab - Lab test results and reports\n');

console.log('🔗 Your Google Sheet:');
console.log('https://docs.google.com/spreadsheets/d/13RSnLOO9hQ2HJQRgt8ijCzSdwMncBVs3J7ua73wYOhI/edit\n');

console.log('📝 Quick Setup Steps:');
console.log('1. Open your Google Sheet (link above)');
console.log('2. Create 3 new tabs: Users, Appointments, LabReports');
console.log('3. Copy data from data-templates/*.csv files');
console.log('4. Paste into respective tabs starting from A1');
console.log('5. Make sheet public (Share → Anyone with link → Viewer)');
console.log('6. Update one Users row with your Auth0 ID');
console.log('7. Restart server: npm run dev\n');

console.log('🎯 Expected Results:');
console.log('Instead of mock data, you\'ll see:');
console.log('• Real Health ID: HSS-7729-OR');
console.log('• Real Appointments: Dec 28, 2025 at 10:30');
console.log('• Real Lab Reports: Complete Blood Count, Lipid Profile');
console.log('• Real Medical Info: Blood type O+, Hypertension');
console.log('• Real Emergency Contact: Sarah Thompson\n');

console.log('📁 CSV Files Created:');
console.log('✅ data-templates/users.csv');
console.log('✅ data-templates/appointments.csv');
console.log('✅ data-templates/lab_reports.csv\n');

console.log('🔧 Need Your Auth0 ID?');
console.log('1. Login to your app');
console.log('2. Open browser dev tools (F12)');
console.log('3. Console tab → type: user');
console.log('4. Copy the "sub" field value');
console.log('5. Replace auth0_id in Users sheet\n');

console.log('📖 Full guide: USER_DASHBOARD_SETUP.md');
console.log('🚀 Your dashboard will show real healthcare data!');