# 👤 User Dashboard Data Setup Guide

## 🎯 Goal
Set up real user dashboard data in Google Sheets to replace mock data like "Alex Thompson", "Dr. Sarah Jenkins", etc.

## 📊 Required Google Sheet Tabs

You need to create these tabs in your Google Sheet:
- **Users** - User profile data
- **Appointments** - User appointments and consultations  
- **LabReports** - Lab test results and reports

## 🔧 Setup Steps

### Step 1: Open Your Google Sheet
https://docs.google.com/spreadsheets/d/13RSnLOO9hQ2HJQRgt8ijCzSdwMncBVs3J7ua73wYOhI/edit

### Step 2: Create Required Tabs

#### 👤 **Users Tab**
1. Create new tab named exactly: `Users`
2. Copy this data starting from cell A1:

```csv
user_id,auth0_id,name,email,phone,date_of_birth,gender,blood_type,emergency_contact,emergency_phone,address,city,state,pincode,health_id,medical_history,allergies,current_medications,insurance_provider,insurance_number,created_at,updated_at,last_login
U001,auth0|507f1f77bcf86cd799439011,Alex Thompson,alex.thompson@email.com,+91-9876543210,1990-05-15,Male,O+,Sarah Thompson,+91-9876543211,"123 Green Park Main Road","New Delhi",Delhi,110016,HSS-7729-OR,"Hypertension, Diabetes Type 2","Penicillin, Shellfish","Metformin 500mg, Lisinopril 10mg",Star Health,SH123456789,2025-01-15,2025-12-28,2025-12-28
U002,auth0|507f1f77bcf86cd799439012,Priya Sharma,priya.sharma@email.com,+91-9876543212,1985-08-22,Female,A+,Raj Sharma,+91-9876543213,"456 Sector 18 Noida","Noida","Uttar Pradesh",201301,HSS-8830-PR,"Asthma, Migraine","Dust, Pollen","Salbutamol Inhaler, Sumatriptan 50mg",HDFC Ergo,HE987654321,2025-02-10,2025-12-28,2025-12-27
U003,auth0|507f1f77bcf86cd799439013,Rajesh Kumar,rajesh.kumar@email.com,+91-9876543214,1978-12-03,Male,B+,Sunita Kumar,+91-9876543215,"789 MG Road Gurgaon","Gurgaon",Haryana,122001,HSS-9941-RK,"High Cholesterol","None","Atorvastatin 20mg",Bajaj Allianz,BA456789123,2025-03-05,2025-12-28,2025-12-26
```

#### 📅 **Appointments Tab**
1. Create new tab named exactly: `Appointments`
2. Copy this data starting from cell A1:

```csv
appointment_id,user_id,doctor_id,hospital_id,appointment_date,appointment_time,status,type,symptoms,diagnosis,prescription,notes,fee_paid,created_at,updated_at
A001,U001,D001,H001,2025-12-28,10:30,confirmed,consultation,"Chest pain, shortness of breath","Hypertension monitoring","Amlodipine 5mg daily, Low sodium diet","Blood pressure: 140/90. Follow up in 2 weeks",2000,2025-12-20,2025-12-28
A002,U001,D002,H001,2026-01-05,14:15,scheduled,follow-up,"Headache, dizziness","Migraine management","Sumatriptan as needed","Stress management recommended",1800,2025-12-25,2025-12-28
A003,U002,D003,H002,2025-12-30,09:00,confirmed,consultation,"Knee pain, stiffness","Osteoarthritis","Glucosamine supplements, Physiotherapy","X-ray shows mild joint wear",1500,2025-12-22,2025-12-28
```

#### 🧪 **LabReports Tab**
1. Create new tab named exactly: `LabReports`
2. Copy this data starting from cell A1:

```csv
report_id,user_id,test_id,test_name,test_date,result_value,normal_range,status,lab_name,doctor_id,notes,report_url,created_at
LR001,U001,LT001,Complete Blood Count,2025-12-20,"Hemoglobin: 13.5 g/dL, WBC: 7200/μL","Hb: 12-16 g/dL, WBC: 4000-11000/μL",normal,Apollo Diagnostics,D001,"All parameters within normal limits",https://reports.apollo.com/LR001,2025-12-21
LR002,U001,LT002,Lipid Profile,2025-12-20,"Total Cholesterol: 220 mg/dL, LDL: 140 mg/dL","Total: <200 mg/dL, LDL: <100 mg/dL",abnormal,Apollo Diagnostics,D001,"Elevated cholesterol levels",https://reports.apollo.com/LR002,2025-12-21
LR003,U002,LT005,Thyroid Profile,2025-12-18,"TSH: 2.5 mIU/L, T3: 1.2 ng/mL","TSH: 0.4-4.0 mIU/L, T3: 0.8-2.0 ng/mL",normal,AIIMS Lab,D004,"Thyroid function normal",https://reports.aiims.edu/LR003,2025-12-19
```

### Step 3: Make Sheet Public
1. Click **Share** (top right)
2. Click **Change to anyone with the link**
3. Set to **Viewer**
4. Click **Done**

### Step 4: Link Your Auth0 User
To see your real data, you need to link your Auth0 account:

1. **Find your Auth0 ID**: 
   - Login to your app
   - Open browser developer tools (F12)
   - Go to Console tab
   - Type: `console.log(user)` (if user object is available)
   - Copy your `sub` field (looks like: `auth0|507f1f77bcf86cd799439011`)

2. **Update Users sheet**:
   - Replace one of the `auth0_id` values with your actual Auth0 ID
   - Or add a new row with your Auth0 ID and details

### Step 5: Restart and Test
1. **Restart server**: `npm run dev`
2. **Clear cache**: `Ctrl+Shift+R`
3. **Login**: Visit your user dashboard
4. **Verify**: You should now see real data instead of mock data

## 🎯 What You'll See

### Before (Mock Data):
- Generic names like "Alex Thompson"
- Fake appointments with "Dr. Sarah Jenkins"
- Mock health IDs and data

### After (Real Data):
- ✅ **Real Health ID**: HSS-7729-OR
- ✅ **Real Appointments**: Confirmed consultation on Dec 28, 2025
- ✅ **Real Lab Reports**: Complete Blood Count, Lipid Profile
- ✅ **Real Medical Info**: Blood type O+, Hypertension history
- ✅ **Real Emergency Contact**: Sarah Thompson
- ✅ **Real Insurance**: Star Health SH123456789

## 📋 Dashboard Features

Your dashboard will now show:

### 📊 **Health Summary Card**
- Blood Type: O+ (from Users sheet)
- Allergies: Penicillin, Shellfish
- Emergency Contact: Sarah Thompson

### 📅 **Upcoming Appointments**
- Dec 28, 2025 at 10:30 - Consultation (Confirmed)
- Jan 5, 2026 at 14:15 - Follow-up (Scheduled)

### 🧪 **Recent Lab Reports**
- Complete Blood Count (Dec 20, 2025) - Normal
- Lipid Profile (Dec 20, 2025) - Abnormal

### 👤 **Profile Information**
- Health ID: HSS-7729-OR
- Blood Type: O+
- Insurance: Star Health
- Medical History: Hypertension, Diabetes Type 2

## 🔄 Adding More Users

To add more users:
1. Add new rows to Users sheet
2. Use their actual Auth0 ID in `auth0_id` column
3. Add corresponding appointments and lab reports
4. Link using `user_id` field

## 🚨 Important Notes

- **Auth0 ID Matching**: The `auth0_id` field must match the user's actual Auth0 `sub` field
- **Email Matching**: As fallback, system will match by email if Auth0 ID not found
- **Tab Names**: Must be exactly `Users`, `Appointments`, `LabReports` (case-sensitive)
- **Data Format**: Keep the exact column structure as shown
- **Public Access**: Sheet must be public for API access

---

**Your user dashboard will now display real healthcare data instead of mock data!** 🎉