# 🔧 Troubleshooting: Still Showing Mock Data

## 🎯 Problem
Your app is still showing mock data (Alex Thompson, Dr. Sarah Jenkins, etc.) instead of real healthcare data.

## 🔍 Root Cause Analysis

The issue is likely one of these:

### 1. ❌ Google Sheet Not Updated
- Your Google Sheet still contains the original demo data
- Real healthcare data hasn't been imported yet

### 2. ❌ Missing Required Tabs
- Google Sheet doesn't have the required tabs: `Hospitals`, `Doctors`, `BloodBank`, `LabTests`
- Data is in wrong tabs or wrong format

### 3. ❌ Sheet Not Public
- Google Sheet is private and API can't access it
- Need to make it public with "Anyone with link can view"

### 4. ❌ Wrong Data Format
- Data pasted in wrong cells or wrong format
- Headers don't match expected column names

### 5. ❌ Cache Issues
- Browser or API cache showing old data
- Need to clear cache and restart server

## ✅ Step-by-Step Fix

### Step 1: Verify Google Sheet Access
1. **Open your sheet**: https://docs.google.com/spreadsheets/d/13RSnLOO9hQ2HJQRgt8ijCzSdwMncBVs3J7ua73wYOhI/edit
2. **Check if you can edit it** (you should have edit permissions)
3. **Make it public**:
   - Click **Share** (top right)
   - Click **Change to anyone with the link**
   - Set to **Viewer**
   - Click **Done**

### Step 2: Create Required Tabs
Your sheet needs exactly these tab names:
- `Hospitals` (case-sensitive)
- `Doctors` (case-sensitive)
- `BloodBank` (case-sensitive)
- `LabTests` (case-sensitive)

**To create tabs:**
1. Right-click on tab area at bottom
2. Select "Insert sheet"
3. Name it exactly as shown above
4. Repeat for all 4 tabs

### Step 3: Import Real Data

#### 🏥 Hospitals Tab
1. Go to **Hospitals** tab
2. **Copy this data** and paste in cell A1:

```csv
hospital_id,name,tier,category,lat,lng,address,phone,email,website,bed_capacity,available_beds,emergency_beds,specialties
H001,Apollo Hospital Delhi,Premium,Hospital,28.5355,77.2910,"Sarita Vihar Delhi Mathura Road New Delhi 110076",+91-11-26925858,info@apollodelhi.com,https://www.apollohospitals.com,750,120,50,"Cardiology,Neurology,Oncology,Orthopedics"
H002,AIIMS New Delhi,Government,Hospital,28.5672,77.2100,"Ansari Nagar New Delhi 110029",+91-11-26588500,director@aiims.ac.in,https://www.aiims.edu,2478,450,100,"All Specialties,Emergency Medicine,Trauma Care"
H003,Fortis Hospital Gurgaon,Premium,Hospital,28.4595,77.0266,"Sector 44 Opposite HUDA City Centre Gurgaon 122002",+91-124-4962200,info@fortishealthcare.com,https://www.fortishealthcare.com,355,85,25,"Cardiology,Neurosurgery,Gastroenterology"
H004,Max Super Speciality Hospital,Premium,Hospital,28.5245,77.1855,"1 Press Enclave Road Saket New Delhi 110017",+91-11-26515050,info@maxhealthcare.com,https://www.maxhealthcare.in,500,95,30,"Oncology,Cardiac Sciences,Neurosciences"
H005,Medanta The Medicity,Premium,Hospital,28.4089,76.9734,"Sector 38 Gurgaon Haryana 122001",+91-124-4141414,info@medanta.org,https://www.medanta.org,1250,200,75,"Multi Organ Transplant,Robotic Surgery,Cancer Care"
```

#### 👨‍⚕️ Doctors Tab
1. Go to **Doctors** tab
2. **Copy this data** and paste in cell A1:

```csv
doctor_id,name,specialization,hospital_id,rating,fee,experience,phone,email,available_days,available_hours
D001,Dr. Rajesh Kumar,Cardiologist,H001,4.8,2000,15,+91-9876543210,rajesh.kumar@apollodelhi.com,"Monday,Tuesday,Wednesday,Thursday,Friday","09:00-17:00"
D002,Dr. Priya Sharma,Neurologist,H001,4.7,1800,12,+91-9876543211,priya.sharma@apollodelhi.com,"Monday,Wednesday,Friday,Saturday","10:00-16:00"
D003,Dr. Amit Singh,Orthopedic Surgeon,H002,4.9,1500,20,+91-9876543212,amit.singh@aiims.ac.in,"Tuesday,Thursday,Saturday","08:00-14:00"
D004,Dr. Sunita Gupta,Gynecologist,H002,4.6,1200,18,+91-9876543213,sunita.gupta@aiims.ac.in,"Monday,Tuesday,Wednesday,Thursday","09:00-15:00"
D005,Dr. Vikram Mehta,Gastroenterologist,H003,4.8,2200,14,+91-9876543214,vikram.mehta@fortishealthcare.com,"Monday,Wednesday,Friday","11:00-17:00"
```

### Step 4: Verify Data Format
After pasting, check:
- **Row 1**: Should have column headers (hospital_id, name, etc.)
- **Row 2+**: Should have actual data (H001, Apollo Hospital Delhi, etc.)
- **No empty rows** between header and data
- **All columns filled** with appropriate data

### Step 5: Clear Cache & Restart
1. **Clear browser cache**: Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Restart development server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```
3. **Wait for server to fully start** (should see "Ready in X seconds")

### Step 6: Test the Fix
1. **Visit**: http://localhost:3000/user
2. **Search for hospitals**: You should now see:
   - ✅ Apollo Hospital Delhi
   - ✅ AIIMS New Delhi  
   - ✅ Fortis Hospital Gurgaon
   - ✅ Max Super Speciality Hospital
   - ✅ Medanta The Medicity

Instead of mock names like "Hospital A", "Hospital B", etc.

## 🧪 Quick Verification

### Test 1: Check Sheet Access
Open this URL in browser: https://docs.google.com/spreadsheets/d/13RSnLOO9hQ2HJQRgt8ijCzSdwMncBVs3J7ua73wYOhI/export?format=csv&gid=0

**Expected**: Should download a CSV file with your data
**If fails**: Sheet is not public or doesn't exist

### Test 2: Check API Response
Open browser developer tools (F12) and check Network tab when loading the user page.

**Look for**: `/api/sheets/Hospitals?tab=Hospitals`
**Expected**: Should return JSON with Apollo Hospital Delhi, AIIMS, etc.
**If mock data**: Sheet not updated or wrong tab names

### Test 3: Visual Verification
In your app's hospital search:
- **Before fix**: Shows generic names like "Hospital A", "Test Hospital"
- **After fix**: Shows real names like "Apollo Hospital Delhi", "AIIMS New Delhi"

## 🚨 Common Mistakes

1. **Wrong tab names**: Must be exactly `Hospitals`, `Doctors`, `BloodBank`, `LabTests`
2. **Private sheet**: Must be public with "Anyone with link can view"
3. **Wrong cell**: Data must start from A1, not A2 or other cells
4. **Missing headers**: First row must have column names
5. **Cache issues**: Must clear browser cache and restart server

## 📞 Still Not Working?

If you're still seeing mock data after following all steps:

1. **Share screenshot** of your Google Sheet showing the Hospitals tab
2. **Check browser console** for any error messages (F12 → Console)
3. **Verify sheet URL** is exactly: `13RSnLOO9hQ2HJQRgt8ijCzSdwMncBVs3J7ua73wYOhI`
4. **Try incognito mode** to rule out browser cache issues

## ✅ Success Indicators

You'll know it's working when:
- ✅ Hospital search shows "Apollo Hospital Delhi" instead of "Hospital A"
- ✅ Real addresses and phone numbers appear
- ✅ Specialties show "Cardiology, Neurology" instead of generic text
- ✅ Doctor names show "Dr. Rajesh Kumar" instead of "Dr. Smith"

---

**Follow these steps carefully and your app will show real healthcare data!** 🎉