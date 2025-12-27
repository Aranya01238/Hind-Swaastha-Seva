#!/usr/bin/env node

async function testData() {
    try {
        console.log('🔍 Testing Google Sheets Data...\n');

        const baseUrl = 'http://localhost:3000';

        // Test Hospitals
        console.log('📊 Testing Hospitals API...');
        const hospitalsResponse = await fetch(`${baseUrl}/api/sheets/Hospitals?tab=Hospitals`);
        const hospitalsData = await hospitalsResponse.json();

        console.log('Status:', hospitalsResponse.status);
        console.log('Hospitals count:', hospitalsData.rows?.length || 0);

        if (hospitalsData.rows && hospitalsData.rows.length > 0) {
            console.log('First hospital:', hospitalsData.rows[0].name || 'No name field');
            console.log('Sample data:', JSON.stringify(hospitalsData.rows[0], null, 2));
        } else {
            console.log('❌ No hospital data found');
            console.log('Response:', JSON.stringify(hospitalsData, null, 2));
        }

    } catch (error) {
        console.error('❌ Error testing data:', error.message);
    }
}

testData();