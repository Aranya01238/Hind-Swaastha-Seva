# 👤 Auth0 User Dashboard Setup Guide

## 🎯 Goal
Use Auth0's own user data storage for user profiles, and Google Sheets only for appointments and lab reports. This eliminates the need for a separate Users tab.

## 📊 What We're Using

### ✅ **Auth0 User Data** (Automatic)
- **Name**: From Auth0 profile
- **Email**: From Auth0 profile  
- **Profile Picture**: From Auth0 profile
- **Email Verification**: From Auth0 status
- **Member Since**: From Auth0 creation date
- **Health ID**: Auto-generated from Auth0 ID

### 📋 **Google Sheets Data** (Manual Setup)
- **Appointments**: Medical appointments linked to Auth0 ID
- **Lab Reports**: Lab test results linked to Auth0 ID

## 🔧 Setup Steps

### Step 1: Open Your Google Sheet
https://docs.google.com/spreadsheets/d/13RSnLOO9hQ2HJQRgt8ijCzSdwMncBVs3J7ua73wYOhI/edit

### Step 2: Create Only 2 Tabs (No Users Tab Needed!)

#### 📅 **Appointments Tab**
1. Create new tab named exactly: `Appointments`
2. Copy this data starting from cell A1:

```csv
appointment_id,auth0_id,user_email,doctor_id,doctor_name,hospital_id,appointment_date,appointment_time,status,type,symptoms,diagnosis,prescription,notes,fee_paid,created_at,updated_at
A001,auth0|6758174935e9d92c66574a06fe,aranya.rathi@email.com,D001,Dr. Rajesh Kumar,H001,2025-12-28,10:30,confirmed,consultation,"Chest pain, shortness of breath","Hypertension monitoring","Amlodipine 5mg daily, Low sodium diet","Blood pressure: 140/90. Follow up in 2 weeks",2000,2025-12-20,2025-12-28
A002,auth0|6758174935e9d92c66574a06fe,aranya.rathi@email.com,D002,Dr. Priya Sharma,H001,2026-01-05,14:15,scheduled,follow-up,"Headache, dizziness","Migraine management","Sumatriptan as needed","Stress management recommended",1800,2025-12-25,2025-12-28
A003,auth0|6758174935e9d92c66574a06fe,aranya.rathi@email.com,D003,Dr. Amit Singh,H002,2025-12-30,09:00,confirmed,consultation,"Knee pain, stiffness","Osteoarthritis","Glucosamine supplements, Physiotherapy","X-ray shows mild joint wear",1500,2025-12-22,2025-12-28
```

#### 🧪 **LabReports Tab**
1. Create new tab named exactly: `LabReports`
2. Copy this data starting from cell A1:

```csv
report_id,auth0_id,user_email,test_id,test_name,test_date,result_value,normal_range,status,lab_name,doctor_id,doctor_name,notes,report_url,created_at
LR001,auth0|6758174935e9d92c66574a06fe,aranya.rathi@email.com,LT001,Complete Blood Count,2025-12-20,"Hemoglobin: 13.5 g/dL, WBC: 7200/μL, Platelets: 250000/μL","Hb: 12-16 g/dL, WBC: 4000-11000/μL, Platelets: 150000-450000/μL",normal,Apollo Diagnostics,D001,Dr. Rajesh Kumar,"All parameters within normal limits",https://reports.apollo.com/LR001,2025-12-21
LR002,auth0|6758174935e9d92c66574a06fe,aranya.rathi@email.com,LT002,Lipid Profile,2025-12-20,"Total Cholesterol: 220 mg/dL, LDL: 140 mg/dL, HDL: 45 mg/dL","Total: <200 mg/dL, LDL: <100 mg/dL, HDL: >40 mg/dL",abnormal,Apollo Diagnostics,D001,Dr. Rajesh Kumar,"Elevated cholesterol levels",https://reports.apollo.com/LR002,2025-12-21
LR003,auth0|6758174935e9d92c66574a06fe,aranya.rathi@email.com,LT005,Thyroid Profile,2025-12-18,"TSH: 2.5 mIU/L, T3: 1.2 ng/mL, T4: 8.5 μg/dL","TSH: 0.4-4.0 mIU/L, T3: 0.8-2.0 ng/mL, T4: 4.5-12.0 μg/dL",normal,AIIMS Lab,D004,Dr. Sunita Gupta,"Thyroid function normal",https://reports.aiims.edu/LR003,2025-12-19
```

### Step 3: Get Your Auth0 ID
1. **Login to your app**
2. **Open browser dev tools** (F12)
3. **Go to Console tab**
4. **Type**: `user` and press Enter
5. **Copy the `sub` field** (looks like: `auth0|6758174935e9d92c66574a06fe`)

### Step 4: Update the Data
1. **Replace** `auth0|6758174935e9d92c66574a06fe` with your actual Auth0 ID
2. **Replace** `aranya.rathi@email.com` with your actual email
3. **Keep** the appointment and lab report data as examples

### Step 5: Make Sheet Public & Restart
1. **Share** → **Anyone with link** → **Viewer**
2. **Restart server**: `npm run dev`
3. **Clear cache**: `Ctrl+Shift+R`

## 🎯 What You'll See

### 👤 **User Profile (From Auth0)**
- ✅ **Real Name**: From your Auth0 profile
- ✅ **Real Email**: From your Auth0 account
- ✅ **Profile Picture**: From Auth0 (if set)
- ✅ **Email Verification**: Auth0 verification status
- ✅ **Health ID**: Auto-generated (e.g., HSS-574A-06FE)
- ✅ **Member Since**: Your Auth0 account creation date

### 📅 **Appointments (From Google Sheets)**
- ✅ **Dec 28, 2025 at 10:30** - Consultation (Confirmed)
- ✅ **Jan 5, 2026 at 14:15** - Follow-up (Scheduled)
- ✅ **Dec 30, 2025 at 09:00** - Consultation (Confirmed)

### 🧪 **Lab Reports (From Google Sheets)**
- ✅ **Complete Blood Count** (Dec 20, 2025) - Normal
- ✅ **Lipid Profile** (Dec 20, 2025) - Abnormal
- ✅ **Thyroid Profile** (Dec 18, 2025) - Normal

## 🔄 Benefits of This Approach

### ✅ **Centralized User Data**
- User profiles managed in Auth0 (single source of truth)
- No duplicate user data in Google Sheets
- Automatic profile updates from Auth0

### ✅ **Simplified Management**
- Only medical data in Google Sheets
- Auth0 handles user authentication and profiles
- Easier to maintain and scale

### ✅ **Better Security**
- User data stays in Auth0's secure system
- Medical data separate from personal data
- Proper data segregation

## 📋 Data Structure

### **Auth0 Provides:**
```javascript
{
  name: "Aranya Rathi",
  email: "aranya.rathi@email.com",
  picture: "https://...",
  email_verified: true,
  sub: "auth0|6758174935e9d92c66574a06fe",
  created_at: "2025-12-28T...",
  updated_at: "2025-12-28T..."
}
```

### **Google Sheets Provides:**
- Appointments linked by `auth0_id` or `user_email`
- Lab reports linked by `auth0_id` or `user_email`
- Medical history and health records

## 🚨 Important Notes

- **No Users tab needed** - Auth0 handles all user profile data
- **Auth0 ID matching** - Use your actual Auth0 `sub` field
- **Email fallback** - System matches by email if Auth0 ID not found
- **Auto Health ID** - Generated from your Auth0 ID automatically
- **Real-time data** - Profile updates automatically from Auth0

---

**Your dashboard now uses Auth0 for user data and Google Sheets only for medical records!** 🎉