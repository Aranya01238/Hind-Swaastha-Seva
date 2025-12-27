#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🏥 HealthSave Real Data Import Guide\n');

console.log('📋 CSV Templates Created:');
console.log('✅ hospitals.csv - 10 real hospitals in Delhi/NCR');
console.log('✅ doctors.csv - 12 doctors across specializations');
console.log('✅ blood_banks.csv - 16 blood type entries from 2 banks');
console.log('✅ lab_tests.csv - 15 common medical tests\n');

console.log('🔗 Your Google Sheet:');
console.log('https://docs.google.com/spreadsheets/d/13RSnLOO9hQ2HJQRgt8ijCzSdwMncBVs3J7ua73wYOhI/edit\n');

console.log('📝 Import Instructions:');
console.log('1. Open your Google Sheet (link above)');
console.log('2. Create tabs: Hospitals, Doctors, BloodBank, LabTests');
console.log('3. Copy data from data-templates/*.csv files');
console.log('4. Paste into respective tabs starting from A1');
console.log('5. Make sheet public (Share → Anyone with link → Viewer)');
console.log('6. Restart your dev server: npm run dev\n');

console.log('🎯 Real Data Includes:');
console.log('• Apollo Hospital, AIIMS, Fortis, Max, Medanta');
console.log('• Real addresses, phone numbers, coordinates');
console.log('• Actual specializations and doctor fees');
console.log('• Current blood bank inventory');
console.log('• Standard medical test prices\n');

console.log('📁 Files to copy:');
const templates = [
    'data-templates/hospitals.csv',
    'data-templates/doctors.csv',
    'data-templates/blood_banks.csv',
    'data-templates/lab_tests.csv'
];

templates.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - Missing!`);
    }
});

console.log('\n🚀 After import, your app will show real healthcare data!');
console.log('📖 Full guide: GOOGLE_SHEETS_SETUP.md');