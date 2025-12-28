# 👩‍💼 Receptionist Portal Setup Guide

## 🔐 Login Credentials
- **Receptionist ID**: `REC001`
- **Password**: `REC001`

## 🎯 Features Overview

The Receptionist Portal provides comprehensive front-desk management capabilities with three main tabs:

### 📅 **1. Offline Appointments**
- Schedule new offline appointments for walk-in patients
- View all appointments (online from Google Sheets + offline from local storage)
- Filter appointments by status (scheduled, completed, cancelled)
- Search appointments by patient name or doctor
- Export appointment data to CSV

### 👥 **2. Patient Database**
- Register new offline patients with complete details
- View combined database of online and offline patients
- Filter patients by registration type (online/offline)
- Search patients by name, phone, or email
- Export patient data to CSV

### 📊 **3. Analytics**
- View patient registration statistics
- Monitor appointment status breakdown
- Track receptionist activity and performance
- System status and recent activity logs

## 🚀 Getting Started

### Step 1: Access the Portal
1. Go to `/portals` page
2. Click on "Receptionist Portal"
3. Login with credentials: `REC001` / `REC001`

### Step 2: Schedule Offline Appointments
1. Go to "Offline Appointments" tab
2. Fill in the appointment form:
   - Patient Name (required)
   - Phone Number (required)
   - Email (optional)
   - Select Doctor from dropdown
   - Choose Date and Time
   - Add Symptoms/Reason for visit
3. Click "Schedule Appointment"

### Step 3: Register Offline Patients
1. Go to "Patient Database" tab
2. Fill in the patient registration form:
   - Full Name (required)
   - Phone Number (required)
   - Email (optional)
   - Age (required)
   - Gender (dropdown)
   - Blood Type (dropdown)
   - Address
   - Emergency Contact
   - Medical History
3. Click "Register Patient"

### Step 4: View Analytics
1. Go to "Analytics" tab
2. Review patient and appointment statistics
3. Monitor system performance and activity

## 📋 Available Doctors

The system includes these doctors for appointment scheduling:
- **Dr. Rajesh Kumar** - Cardiology
- **Dr. Priya Sharma** - Neurology
- **Dr. Amit Singh** - Orthopedics
- **Dr. Sunita Gupta** - Pediatrics
- **Dr. Ravi Patel** - General Medicine

## 💾 Data Storage

### Online Data (from Google Sheets):
- Patient profiles from Auth0 registrations
- Online appointments from the booking system
- Automatically synced and displayed

### Offline Data (Local Storage):
- Offline appointments scheduled by receptionist
- Offline patients registered by receptionist
- Stored locally in browser (persistent across sessions)

## 🔍 Search & Filter Features

### Appointments:
- **Search**: By patient name or doctor name
- **Filter**: By status (all, scheduled, completed, cancelled)
- **Export**: Download filtered results as CSV

### Patients:
- **Search**: By name, phone number, or email
- **Filter**: By type (all, online, offline)
- **Export**: Download filtered results as CSV

## 📊 Dashboard Statistics

The portal displays real-time statistics:
- Total patients (online + offline)
- Online patients count
- Offline patients count
- Total appointments count
- Status breakdown for appointments
- Registration summary by type

## 🎨 User Interface Features

### Design Elements:
- **Purple Theme**: Consistent purple branding for receptionist portal
- **Responsive Design**: Works on desktop and mobile devices
- **Intuitive Navigation**: Tab-based interface for easy access
- **Real-time Updates**: Statistics update automatically
- **Export Functionality**: CSV download for all data

### Interactive Elements:
- **Form Validation**: Required fields and proper input types
- **Dropdown Selectors**: For doctors, gender, blood type, etc.
- **Search Functionality**: Real-time filtering as you type
- **Status Badges**: Color-coded status indicators
- **Hover Effects**: Interactive table rows and buttons

## 🔒 Security Features

- **Authentication Required**: Must login with valid credentials
- **Session Management**: Remembers login state across browser sessions
- **Secure Logout**: Clears all session data on logout
- **Data Isolation**: Offline data stored per browser/device

## 📱 Mobile Responsiveness

The portal is fully responsive and works on:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted grid layouts and touch-friendly controls
- **Mobile**: Stacked layouts and mobile-optimized forms

## 🚨 Important Notes

1. **Data Persistence**: Offline data is stored in browser localStorage
2. **Online Integration**: Automatically displays online patients and appointments
3. **Export Capability**: All data can be exported to CSV format
4. **Real-time Sync**: Online data updates automatically from Google Sheets
5. **Cross-session**: Login state and offline data persist across browser sessions

## 🎯 Use Cases

### Daily Operations:
- Register walk-in patients
- Schedule same-day appointments
- Check patient information quickly
- Monitor appointment queue
- Generate daily reports

### Administrative Tasks:
- Export patient lists for records
- Track registration statistics
- Monitor appointment patterns
- Manage front-desk operations

---

**The Receptionist Portal is now fully functional and ready for front-desk operations!** 👩‍💼✨

*Features include complete patient management, appointment scheduling, and comprehensive analytics with both online and offline data integration.*