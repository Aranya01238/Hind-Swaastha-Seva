import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Hospital {
    id: string
    name: string
    tier: string
    category: 'Hospital' | 'Clinic' | 'Diagnostic' | 'Pharmacy' | 'Blood Bank'
    lat?: number
    lng?: number
    specialties?: string[]
    address?: string
    phone?: string
    email?: string
    website?: string
    bed_capacity?: number
    available_beds?: number
    emergency_beds?: number
    created_at?: string
    updated_at?: string
}

export interface Doctor {
    id: string
    name: string
    specialization: string
    hospital_id?: string
    rating?: number
    fee?: number
    experience?: number
    phone?: string
    email?: string
    available_days?: string[]
    available_hours?: string
    created_at?: string
    updated_at?: string
}

export interface Appointment {
    id: string
    user_id: string
    doctor_id?: string
    hospital_id?: string
    appointment_date: string
    appointment_time: string
    status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
    notes?: string
    created_at?: string
    updated_at?: string
}

export interface LabTest {
    id: string
    name: string
    description?: string
    price?: number
    category?: string
    preparation_required?: boolean
    sample_type?: string
    report_time?: string
    created_at?: string
    updated_at?: string
}

export interface BloodBank {
    id: string
    name: string
    blood_type: string
    quantity: number
    location: string
    contact_phone?: string
    contact_email?: string
    last_updated?: string
    created_at?: string
    updated_at?: string
}

// Supabase API functions
export const supabaseApi = {
    // Hospitals
    async getHospitals(): Promise<Hospital[]> {
        const { data, error } = await supabase
            .from('hospitals')
            .select('*')
            .order('name')

        if (error) {
            console.error('Error fetching hospitals:', error)
            return []
        }

        return data || []
    },

    async getHospitalById(id: string): Promise<Hospital | null> {
        const { data, error } = await supabase
            .from('hospitals')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            console.error('Error fetching hospital:', error)
            return null
        }

        return data
    },

    // Doctors
    async getDoctors(): Promise<Doctor[]> {
        const { data, error } = await supabase
            .from('doctors')
            .select('*')
            .order('name')

        if (error) {
            console.error('Error fetching doctors:', error)
            return []
        }

        return data || []
    },

    async getDoctorsByHospital(hospitalId: string): Promise<Doctor[]> {
        const { data, error } = await supabase
            .from('doctors')
            .select('*')
            .eq('hospital_id', hospitalId)
            .order('name')

        if (error) {
            console.error('Error fetching doctors:', error)
            return []
        }

        return data || []
    },

    // Appointments
    async getUserAppointments(userId: string): Promise<Appointment[]> {
        const { data, error } = await supabase
            .from('appointments')
            .select(`
        *,
        doctors(name, specialization),
        hospitals(name)
      `)
            .eq('user_id', userId)
            .order('appointment_date', { ascending: false })

        if (error) {
            console.error('Error fetching appointments:', error)
            return []
        }

        return data || []
    },

    async createAppointment(appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>): Promise<Appointment | null> {
        const { data, error } = await supabase
            .from('appointments')
            .insert(appointment)
            .select()
            .single()

        if (error) {
            console.error('Error creating appointment:', error)
            return null
        }

        return data
    },

    // Lab Tests
    async getLabTests(): Promise<LabTest[]> {
        const { data, error } = await supabase
            .from('lab_tests')
            .select('*')
            .order('name')

        if (error) {
            console.error('Error fetching lab tests:', error)
            return []
        }

        return data || []
    },

    // Blood Bank
    async getBloodBanks(): Promise<BloodBank[]> {
        const { data, error } = await supabase
            .from('blood_banks')
            .select('*')
            .order('name')

        if (error) {
            console.error('Error fetching blood banks:', error)
            return []
        }

        return data || []
    },

    async getBloodByType(bloodType: string): Promise<BloodBank[]> {
        const { data, error } = await supabase
            .from('blood_banks')
            .select('*')
            .eq('blood_type', bloodType)
            .order('quantity', { ascending: false })

        if (error) {
            console.error('Error fetching blood banks:', error)
            return []
        }

        return data || []
    }
}