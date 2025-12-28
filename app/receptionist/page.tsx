"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSheets } from "@/hooks/use-sheets"
import { 
  UserCheck, 
  ArrowLeft, 
  ClipboardList, 
  Users, 
  Calendar,
  Plus,
  Search,
  Eye,
  EyeOff,
  LogOut,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Stethoscope,
  FileText,
  Filter,
  Download,
  RefreshCw
} from "lucide-react"

interface OfflineAppointment {
  id: string
  patientName: string
  phone: string
  email: string
  doctorName: string
  appointmentDate: string
  appointmentTime: string
  symptoms: string
  status: 'scheduled' | 'completed' | 'cancelled'
  createdAt: string
}

interface Patient {
  id: string
  name: string
  phone: string
  email: string
  age: number
  gender: string
  address: string
  bloodType: string
  emergencyContact: string
  lastVisit: string
  type: 'online' | 'offline'
  registeredBy: string
  medicalHistory: string
}

export default function ReceptionistPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ id: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("appointments")
  
  // Offline appointments state
  const [offlineAppointments, setOfflineAppointments] = useState<OfflineAppointment[]>([])
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    phone: "",
    email: "",
    doctorName: "",
    appointmentDate: "",
    appointmentTime: "",
    symptoms: ""
  })
  
  // Patients database state
  const [patients, setPatients] = useState<Patient[]>([])
  const [newPatient, setNewPatient] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    address: "",
    bloodType: "",
    emergencyContact: "",
    medicalHistory: "",
    type: "offline" as "online" | "offline"
  })
  
  // Filters and search
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "online" | "offline">("all")
  const [appointmentFilter, setAppointmentFilter] = useState<"all" | "scheduled" | "completed" | "cancelled">("all")

  // Fetch online data from Google Sheets
  const { data: onlineAppointments } = useSheets<any[]>("Appointments", { tab: "Appointments" })
  const { data: onlineUsers } = useSheets<any[]>("Users", { tab: "Users" })

  // Check authentication on load
  useEffect(() => {
    const authStatus = localStorage.getItem('receptionist_auth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    
    // Load offline data from localStorage
    const savedAppointments = localStorage.getItem('offline_appointments')
    if (savedAppointments) {
      setOfflineAppointments(JSON.parse(savedAppointments))
    }
    
    const savedPatients = localStorage.getItem('offline_patients')
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients))
    }
  }, [])

  // Save offline data to localStorage
  useEffect(() => {
    localStorage.setItem('offline_appointments', JSON.stringify(offlineAppointments))
  }, [offlineAppointments])

  useEffect(() => {
    localStorage.setItem('offline_patients', JSON.stringify(patients))
  }, [patients])

  // Combine online and offline patients
  const allPatients = useMemo(() => {
    const onlinePatientsList = Array.isArray(onlineUsers) ? onlineUsers
      .filter(u => u && typeof u === 'object')
      .map((user: any): Patient => ({
        id: user.user_id || user.id || Math.random().toString(),
        name: user.name || 'Unknown',
        phone: user.phone || 'N/A',
        email: user.email || 'N/A',
        age: parseInt(user.age) || 0,
        gender: user.gender || 'Not specified',
        address: user.address || 'Not provided',
        bloodType: user.blood_type || user.bloodType || 'Unknown',
        emergencyContact: user.emergency_contact || user.emergencyContact || 'N/A',
        lastVisit: user.last_visit || user.lastVisit || 'Never',
        type: 'online',
        registeredBy: 'Online Registration',
        medicalHistory: user.medical_history || user.medicalHistory || 'None recorded'
      })) : []

    return [...onlinePatientsList, ...patients]
  }, [onlineUsers, patients])

  // Combine online and offline appointments
  const allAppointments = useMemo(() => {
    const onlineAppointmentsList = Array.isArray(onlineAppointments) ? onlineAppointments
      .filter(apt => apt && typeof apt === 'object')
      .map((apt: any): OfflineAppointment => ({
        id: apt.appointment_id || apt.id || Math.random().toString(),
        patientName: apt.patient_name || 'Unknown Patient',
        phone: apt.phone || apt.user_phone || 'N/A',
        email: apt.email || apt.user_email || 'N/A',
        doctorName: apt.doctor_name || 'Dr. Unknown',
        appointmentDate: apt.appointment_date || 'TBD',
        appointmentTime: apt.appointment_time || 'TBD',
        symptoms: apt.symptoms || 'Not specified',
        status: apt.status || 'scheduled',
        createdAt: apt.created_at || new Date().toISOString()
      })) : []

    return [...onlineAppointmentsList, ...offlineAppointments]
  }, [onlineAppointments, offlineAppointments])

  // Filter functions
  const filteredPatients = useMemo(() => {
    return allPatients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.phone.includes(searchTerm) ||
                           patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === "all" || patient.type === filterType
      return matchesSearch && matchesType
    })
  }, [allPatients, searchTerm, filterType])

  const filteredAppointments = useMemo(() => {
    return allAppointments.filter(appointment => {
      const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = appointmentFilter === "all" || appointment.status === appointmentFilter
      return matchesSearch && matchesStatus
    })
  }, [allAppointments, searchTerm, appointmentFilter])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (loginForm.id === "REC001" && loginForm.password === "REC001") {
      setIsAuthenticated(true)
      localStorage.setItem('receptionist_auth', 'true')
    } else {
      setError("Invalid credentials. Please check your ID and password.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('receptionist_auth')
    setLoginForm({ id: "", password: "" })
  }

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    
    const appointment: OfflineAppointment = {
      id: `OFF-${Date.now()}`,
      ...newAppointment,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    }
    
    setOfflineAppointments(prev => [...prev, appointment])
    setNewAppointment({
      patientName: "",
      phone: "",
      email: "",
      doctorName: "",
      appointmentDate: "",
      appointmentTime: "",
      symptoms: ""
    })
  }

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault()
    
    const patient: Patient = {
      id: `PAT-${Date.now()}`,
      name: newPatient.name,
      phone: newPatient.phone,
      email: newPatient.email,
      age: parseInt(newPatient.age) || 0,
      gender: newPatient.gender,
      address: newPatient.address,
      bloodType: newPatient.bloodType,
      emergencyContact: newPatient.emergencyContact,
      lastVisit: new Date().toLocaleDateString(),
      type: newPatient.type,
      registeredBy: 'Receptionist (REC001)',
      medicalHistory: newPatient.medicalHistory
    }
    
    setPatients(prev => [...prev, patient])
    setNewPatient({
      name: "",
      phone: "",
      email: "",
      age: "",
      gender: "",
      address: "",
      bloodType: "",
      emergencyContact: "",
      medicalHistory: "",
      type: "offline"
    })
  }

  const exportData = (type: 'appointments' | 'patients') => {
    const data = type === 'appointments' ? filteredAppointments : filteredPatients
    const headers = type === 'appointments' 
      ? ['ID', 'Patient Name', 'Phone', 'Email', 'Doctor', 'Date', 'Time', 'Status', 'Symptoms']
      : ['ID', 'Name', 'Phone', 'Email', 'Age', 'Gender', 'Blood Type', 'Type', 'Last Visit']
    
    const csvContent = [
      headers.join(','),
      ...data.map(item => {
        if (type === 'appointments') {
          const apt = item as OfflineAppointment
          return [apt.id, apt.patientName, apt.phone, apt.email, apt.doctorName, apt.appointmentDate, apt.appointmentTime, apt.status, apt.symptoms].map(field => `"${field}"`).join(',')
        } else {
          const pat = item as Patient
          return [pat.id, pat.name, pat.phone, pat.email, pat.age, pat.gender, pat.bloodType, pat.type, pat.lastVisit].map(field => `"${field}"`).join(',')
        }
      })
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${type}_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-100 flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/portals">
                <Button variant="outline" size="sm" className="gap-2 mb-6">
                  <ArrowLeft size={16} />
                  Back to Portals
                </Button>
              </Link>
              
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="bg-purple-600 p-4 rounded-2xl shadow-lg">
                  <UserCheck size={40} className="text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-black text-slate-900 mb-2">Receptionist Login</h1>
              <p className="text-slate-600">Enter your credentials to access the receptionist portal</p>
            </div>

            {/* Login Form */}
            <Card className="p-8 shadow-xl">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="receptionistId" className="text-sm font-medium">Receptionist ID</Label>
                  <Input
                    id="receptionistId"
                    type="text"
                    placeholder="Enter your receptionist ID"
                    value={loginForm.id}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 gap-2">
                  <UserCheck size={16} />
                  Login to Receptionist Portal
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700 font-medium mb-1">Demo Credentials:</p>
                <p className="text-xs text-blue-600">ID: REC001</p>
                <p className="text-xs text-blue-600">Password: REC001</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
  // Main Dashboard (after authentication)
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/portals">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Back to Portals
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-3 rounded-xl">
                <UserCheck size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Receptionist Portal</h1>
                <p className="text-slate-600">Welcome, REC001</p>
              </div>
            </div>
          </div>
          
          <Button variant="outline" onClick={handleLogout} className="gap-2 text-red-600 border-red-200 hover:bg-red-50">
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Patients</p>
                <p className="text-2xl font-bold text-slate-900">{allPatients.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Online Patients</p>
                <p className="text-2xl font-bold text-slate-900">{allPatients.filter(p => p.type === 'online').length}</p>
              </div>
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Offline Patients</p>
                <p className="text-2xl font-bold text-slate-900">{allPatients.filter(p => p.type === 'offline').length}</p>
              </div>
              <ClipboardList className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Appointments</p>
                <p className="text-2xl font-bold text-slate-900">{allAppointments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appointments" className="gap-2">
              <Calendar size={16} />
              Offline Appointments
            </TabsTrigger>
            <TabsTrigger value="patients" className="gap-2">
              <Users size={16} />
              Patient Database
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <FileText size={16} />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Offline Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Offline Appointments Management</h2>
              <div className="flex gap-2">
                <Button onClick={() => exportData('appointments')} variant="outline" className="gap-2">
                  <Download size={16} />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Add New Appointment Form */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Schedule New Offline Appointment</h3>
              <form onSubmit={handleAddAppointment} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    value={newAppointment.patientName}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, patientName: e.target.value }))}
                    placeholder="Enter patient name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newAppointment.phone}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAppointment.email}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="doctorName">Doctor</Label>
                  <Select value={newAppointment.doctorName} onValueChange={(value) => setNewAppointment(prev => ({ ...prev, doctorName: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Rajesh Kumar">Dr. Rajesh Kumar - Cardiology</SelectItem>
                      <SelectItem value="Dr. Priya Sharma">Dr. Priya Sharma - Neurology</SelectItem>
                      <SelectItem value="Dr. Amit Singh">Dr. Amit Singh - Orthopedics</SelectItem>
                      <SelectItem value="Dr. Sunita Gupta">Dr. Sunita Gupta - Pediatrics</SelectItem>
                      <SelectItem value="Dr. Ravi Patel">Dr. Ravi Patel - General Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="appointmentDate">Date</Label>
                  <Input
                    id="appointmentDate"
                    type="date"
                    value={newAppointment.appointmentDate}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, appointmentDate: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="appointmentTime">Time</Label>
                  <Input
                    id="appointmentTime"
                    type="time"
                    value={newAppointment.appointmentTime}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, appointmentTime: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="symptoms">Symptoms/Reason</Label>
                  <Input
                    id="symptoms"
                    value={newAppointment.symptoms}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, symptoms: e.target.value }))}
                    placeholder="Enter symptoms or reason for visit"
                  />
                </div>
                
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 gap-2">
                  <Plus size={16} />
                  Schedule Appointment
                </Button>
              </form>
            </Card>

            {/* Appointments List */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">All Appointments</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                      placeholder="Search appointments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={appointmentFilter} onValueChange={(value: any) => setAppointmentFilter(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Patient</th>
                      <th className="text-left p-2">Contact</th>
                      <th className="text-left p-2">Doctor</th>
                      <th className="text-left p-2">Date & Time</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Symptoms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b hover:bg-slate-50">
                        <td className="p-2">
                          <div>
                            <p className="font-medium">{appointment.patientName}</p>
                            <p className="text-xs text-slate-500">ID: {appointment.id}</p>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-sm">
                            <p className="flex items-center gap-1">
                              <Phone size={12} />
                              {appointment.phone}
                            </p>
                            {appointment.email && (
                              <p className="flex items-center gap-1">
                                <Mail size={12} />
                                {appointment.email}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-1">
                            <Stethoscope size={14} />
                            {appointment.doctorName}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-sm">
                            <p>{appointment.appointmentDate}</p>
                            <p className="text-slate-500">{appointment.appointmentTime}</p>
                          </div>
                        </td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="p-2 text-sm">{appointment.symptoms || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredAppointments.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    No appointments found matching your criteria.
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Patient Database Tab */}
          <TabsContent value="patients" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Patient Database (Online & Offline)</h2>
              <div className="flex gap-2">
                <Button onClick={() => exportData('patients')} variant="outline" className="gap-2">
                  <Download size={16} />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Add New Patient Form */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Register New Offline Patient</h3>
              <form onSubmit={handleAddPatient} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="patientNameNew">Full Name</Label>
                  <Input
                    id="patientNameNew"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phoneNew">Phone Number</Label>
                  <Input
                    id="phoneNew"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="emailNew">Email</Label>
                  <Input
                    id="emailNew"
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Enter age"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={newPatient.gender} onValueChange={(value) => setNewPatient(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select value={newPatient.bloodType} onValueChange={(value) => setNewPatient(prev => ({ ...prev, bloodType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newPatient.address}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter full address"
                  />
                </div>
                
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={newPatient.emergencyContact}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, emergencyContact: e.target.value }))}
                    placeholder="Emergency contact number"
                  />
                </div>
                
                <div className="md:col-span-3">
                  <Label htmlFor="medicalHistory">Medical History</Label>
                  <Input
                    id="medicalHistory"
                    value={newPatient.medicalHistory}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, medicalHistory: e.target.value }))}
                    placeholder="Enter medical history, allergies, etc."
                  />
                </div>
                
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 gap-2">
                  <Plus size={16} />
                  Register Patient
                </Button>
              </form>
            </Card>

            {/* Patients List */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">All Patients (Online & Offline)</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Patient</th>
                      <th className="text-left p-2">Contact</th>
                      <th className="text-left p-2">Details</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Last Visit</th>
                      <th className="text-left p-2">Medical Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id} className="border-b hover:bg-slate-50">
                        <td className="p-2">
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-xs text-slate-500">ID: {patient.id}</p>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-sm">
                            <p className="flex items-center gap-1">
                              <Phone size={12} />
                              {patient.phone}
                            </p>
                            {patient.email && (
                              <p className="flex items-center gap-1">
                                <Mail size={12} />
                                {patient.email}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-sm">
                            <p>Age: {patient.age}</p>
                            <p>Gender: {patient.gender}</p>
                            <p>Blood: {patient.bloodType}</p>
                          </div>
                        </td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            patient.type === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {patient.type}
                          </span>
                        </td>
                        <td className="p-2 text-sm">{patient.lastVisit}</td>
                        <td className="p-2 text-sm">
                          <div>
                            {patient.medicalHistory && (
                              <p className="text-xs text-slate-600">{patient.medicalHistory.slice(0, 50)}...</p>
                            )}
                            {patient.emergencyContact && (
                              <p className="text-xs text-slate-500">Emergency: {patient.emergencyContact}</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredPatients.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    No patients found matching your criteria.
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Receptionist Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Patient Registration Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Patients:</span>
                    <span className="font-semibold">{allPatients.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Online Registrations:</span>
                    <span className="font-semibold text-blue-600">{allPatients.filter(p => p.type === 'online').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Offline Registrations:</span>
                    <span className="font-semibold text-green-600">{allPatients.filter(p => p.type === 'offline').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Registered by REC001:</span>
                    <span className="font-semibold text-purple-600">{patients.length}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Appointment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Appointments:</span>
                    <span className="font-semibold">{allAppointments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scheduled:</span>
                    <span className="font-semibold text-blue-600">{allAppointments.filter(a => a.status === 'scheduled').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed:</span>
                    <span className="font-semibold text-green-600">{allAppointments.filter(a => a.status === 'completed').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cancelled:</span>
                    <span className="font-semibold text-red-600">{allAppointments.filter(a => a.status === 'cancelled').length}</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-2">
                <p className="text-sm text-slate-600">• {offlineAppointments.length} offline appointments scheduled</p>
                <p className="text-sm text-slate-600">• {patients.length} offline patients registered</p>
                <p className="text-sm text-slate-600">• Last login: {new Date().toLocaleString()}</p>
                <p className="text-sm text-slate-600">• System status: All services operational</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}