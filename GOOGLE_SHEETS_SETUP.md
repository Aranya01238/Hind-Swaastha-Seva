# 🗂️ Google Sheets Real Data Setup Guide

## 📊 Your Current Google Sheet
**URL**: https://docs.google.com/spreadsheets/d/13RSnLOO9hQ2HJQRgt8ijCzSdwMncBVs3J7ua73wYOhI/edit?gid=0#gid=0

## 🎯 Replace Mock Data with Real Healthcare Data

### Step 1: Access Your Google Sheet
1. Open: https://docs.google.com/spreadsheets/d/13RSnLOO9hQ2HJQRgt8ijCzSdwMncBVs3J7ua73wYOhI/edit
2. Make sure you have edit permissions

### Step 2: Create Required Tabs
Your sheet needs these tabs (create them if they don't exist):
- **Hospitals** (for hospital data)
- **Doctors** (for doctor data) 
- **BloodBank** (for blood bank data)
- **LabTests** (for lab test data)
- **Users** (for user data - keep existing)

### Step 3: Import Real Data

#### 🏥 **Hospitals Tab**
1. Go to **Hospitals** tab (or create it)
2. Copy the content from `data-templates/hospitals.csv`
3. Paste it starting from cell A1
4. **Headers**: hospital_id, name, tier, category, lat, lng, address, phone, email, website, bed_capacity, available_beds, emergency_beds, specialties

#### 👨‍⚕️ **Doctors Tab**  
1. Go to **Doctors** tab (or create it)
2. Copy the content from `data-templates/doctors.csv`
3. Paste it starting from cell A1
4. **Headers**: doctor_id, name, specialization, hospital_id, rating, fee, experience, phone, email, available_days, available_hours

#### 🩸 **BloodBank Tab**
1. Go to **BloodBank** tab (or create it)
2. Copy the content from `data-templates/blood_banks.csv`
3. Paste it starting from cell A1
4. **Headers**: blood_bank_id, name, blood_type, quantity, location, contact_phone, contact_email, last_updated

#### 🧪 **LabTests Tab**
1. Go to **LabTests** tab (or create it)
2. Copy the content from `data-templates/lab_tests.csv`
3. Paste it starting from cell A1
4. **Headers**: test_id, name, description, price, category, preparation_required, sample_type, report_time

### Step 4: Make Sheet Public (Required for API Access)
1. Click **Share** button (top right)
2. Click **Change to anyone with the link**
3. Set permission to **Viewer**
4. Click **Done**

### Step 5: Verify Data Structure
Each tab should have:
- **Row 1**: Column headers (exactly as specified)
- **Row 2+**: Data rows
- **No empty rows** between header and data
- **Consistent data types** in each column

## 📋 Real Data Templates

I've created CSV templates with real Indian healthcare data:

### 🏥 Hospitals (10 Real Hospitals)
- Apollo Hospital Delhi
- AIIMS New Delhi  
- Fortis Hospital Gurgaon
- Max Super Speciality Hospital
- Medanta The Medicity
- BLK Super Speciality Hospital
- Gangaram Hospital
- Safdarjung Hospital
- Ram Manohar Lohia Hospital
- Indraprastha Apollo Hospital

### 👨‍⚕️ Doctors (12 Real Specializations)
- Cardiologist, Neurologist, Orthopedic Surgeon
- Gynecologist, Gastroenterologist, Oncologist
- Neurosurgeon, Pediatrician, General Physician
- Dermatologist, Emergency Medicine, Radiologist

### 🩸 Blood Banks (16 Blood Types)
- Red Cross Blood Bank Delhi
- AIIMS Blood Bank
- All blood types: A+, A-, B+, B-, AB+, AB-, O+, O-

### 🧪 Lab Tests (15 Common Tests)
- CBC, Lipid Profile, Liver Function Test
- Kidney Function Test, Thyroid Profile, HbA1c
- Vitamin D3, B12, ECG, X-Ray, Ultrasound
- Blood Sugar tests, Urine/Stool analysis

## 🔧 Technical Configuration

Your system is already configured to use this Google Sheet:
- **Sheet ID**: `13RSnLOO9hQ2HJQRgt8ijCzSdwMncBVs3J7ua73wYOhI`
- **API Endpoint**: `/api/sheets/[table]`
- **Tab Mapping**: Configured in `lib/sheets-config.ts`

## ✅ After Setup

Once you've imported the real data:
1. **Restart your development server**: `npm run dev`
2. **Test the application**: Visit `http://localhost:3000/user`
3. **Search hospitals**: You'll see real hospital names
4. **Check categories**: Filter by Hospital, Clinic, etc.
5. **View details**: Real addresses, phone numbers, specialties

## 🎯 Benefits of Real Data

- **Realistic Testing**: Test with actual hospital names and locations
- **Better Demo**: Show real healthcare providers to users
- **Accurate Search**: Location-based search with real coordinates
- **Professional Look**: Actual contact information and specialties
- **Scalable**: Easy to add more hospitals and doctors

## 📝 Adding More Data

To add more hospitals/doctors:
1. Open your Google Sheet
2. Add new rows following the same format
3. Ensure all required columns are filled
4. Data will automatically appear in your app

## 🚨 Important Notes

- **Keep headers exact**: Column names must match exactly
- **Maintain data types**: Numbers for lat/lng, strings for names
- **Public access required**: Sheet must be viewable by anyone with link
- **No empty rows**: Don't leave empty rows between data
- **Consistent formatting**: Use same date format, phone format, etc.

---

**Your Google Sheet will now power your HealthSave app with real healthcare data!** 🎉