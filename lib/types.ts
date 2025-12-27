export type UUID = string

export type PatientUser = {
  user_id: UUID
  name: string
  age: number
  phone: string
  email: string
  medical_history: string
}

export type Hospital = {
  hospital_id: UUID
  name: string
  address: string
  phone: string
  bed_capacity: number
  available_beds: number
}

export type Doctor = {
  doctor_id: UUID
  hospital_id: UUID
  name: string
  specialization: string
  rating: number
  fee: number
}

export type AppointmentStatus = "Pending" | "Confirmed" | "Cancelled"
export type PaymentStatus = "pending" | "paid" | "failed"

export type Appointment = {
  appointment_id: UUID
  user_id: UUID
  doctor_id: UUID
  hospital_id: UUID
  date_time: string // ISO string
  referral_id: string
  status: AppointmentStatus
  payment_status: PaymentStatus
}

export type Payment = {
  payment_id: UUID
  appointment_id: UUID
  amount: number
  method: string // e.g. "Razorpay UPI" or "Stripe"
  status: PaymentStatus
  created_at: string // ISO
}

export type BloodBank = {
  blood_id: UUID
  hospital_id: UUID
  blood_type: string
  quantity: number
  last_updated: string // ISO
}

export type StaffRole = "Supervisor" | "Receptionist" | "Nurse" | "Security"

export type Staff = {
  staff_id: UUID
  hospital_id: UUID
  role: StaffRole
  name: string
  phone: string
  login_id: string
  password: string
}

export type LabTest = {
  lab_id: UUID
  hospital_id: UUID
  test_name: string
  patient_id: UUID
  status: string
  result: string
  created_at: string
}

//
// ✅ NEW: Emergency Beds
//
export type EmergencyBed = {
  bed_id: UUID
  hospital_id: UUID
  ward_name: string
  bed_number: string
  occupied: boolean
  patient_name: string
  patient_id: UUID
  admitted_at: string // ISO
  expected_discharge: string // ISO
  remarks: string
  last_updated: string // ISO
}

//
// ✅ Extend the Table Map
//
export type TableMap = {
  Users: PatientUser
  Hospitals: Hospital
  Doctors: Doctor
  Appointments: Appointment
  Payments: Payment
  BloodBank: BloodBank
  Staff: Staff
  Labs: LabTest
  EmergencyBeds: EmergencyBed // <-- Added this line
}

export type TableName =
  | "Users"
  | "Hospitals"
  | "Doctors"
  | "Appointments"
  | "Payments"
  | "BloodBank"
  | "Staff"
  | "Labs"
  | "EmergencyBeds" // <-- Added this line
