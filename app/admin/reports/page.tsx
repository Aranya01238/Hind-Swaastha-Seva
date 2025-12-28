"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSheets } from "@/hooks/use-sheets"
import { 
  ArrowLeft, 
  BarChart3, 
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  DollarSign,
  Clock,
  FileText,
  PieChart,
  LineChart,
  Filter,
  RefreshCw,
  Building2,
  Stethoscope,
  TestTube,
  Bed,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  UserCheck,
  Heart
} from "lucide-react"

export default function ReportsAndDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [dateRange, setDateRange] = useState("30")
  const [reportType, setReportType] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)

  // Check authentication
  useEffect(() => {
    const authStatus = localStorage.getItem('hospital_admin_auth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch data from Google Sheets
  const { data: hospitalsRaw } = useSheets<any[]>("Hospitals", { tab: "Hospitals" })
  const { data: appointmentsRaw } = useSheets<any[]>("Appointments", { tab: "Appointments" })
  const { data: labReportsRaw } = useSheets<any[]>("LabReports", { tab: "LabReports" })
  const { data: doctorsRaw } = useSheets<any[]>("Doctors", { tab: "Doctors" })
  const { data: usersRaw } = useSheets<any[]>("Users", { tab: "Users" })

  // Calculate analytics
  const analytics = useMemo(() => {
    const hospitals = Array.isArray(hospitalsRaw) ? hospitalsRaw.filter(h => h && typeof h === 'object') : []
    const appointments = Array.isArray(appointmentsRaw) ? appointmentsRaw.filter(a => a && typeof a === 'object') : []
    const labReports = Array.isArray(labReportsRaw) ? labReportsRaw.filter(l => l && typeof l === 'object') : []
    const doctors = Array.isArray(doctorsRaw) ? doctorsRaw.filter(d => d && typeof d === 'object') : []
    const users = Array.isArray(usersRaw) ? usersRaw.filter(u => u && typeof u === 'object') : []

    // Date filtering based on selected range
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(dateRange))
    
    const recentAppointments = appointments.filter(apt => {
      if (!apt.created_at) return true
      const createdDate = new Date(apt.created_at)
      return createdDate >= cutoffDate
    })

    const recentLabReports = labReports.filter(lab => {
      if (!lab.created_at) return true
      const createdDate = new Date(lab.created_at)
      return createdDate >= cutoffDate
    })

    // Calculate metrics
    const totalHospitals = hospitals.length
    const totalDoctors = doctors.length
    const totalUsers = users.length
    const totalAppointments = recentAppointments.length
    const totalLabReports = recentLabReports.length

    // Appointment status breakdown
    const appointmentsByStatus = recentAppointments.reduce((acc, apt) => {
      const status = apt.status || 'unknown'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Lab report status breakdown
    const labReportsByStatus = recentLabReports.reduce((acc, lab) => {
      const status = lab.status || 'unknown'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Revenue calculation (from appointments)
    const totalRevenue = recentAppointments.reduce((sum, apt) => {
      const fee = parseFloat(apt.fee_paid) || 0
      return sum + fee
    }, 0)

    // Bed occupancy (from hospitals)
    const totalBeds = hospitals.reduce((sum, h) => (sum + (parseInt(h.bed_capacity) || 0)), 0)
    const availableBeds = hospitals.reduce((sum, h) => (sum + (parseInt(h.available_beds) || 0)), 0)
    const occupiedBeds = totalBeds - availableBeds
    const occupancyRate = totalBeds > 0 ? (occupiedBeds / totalBeds) * 100 : 0

    // Top doctors by appointments
    const doctorAppointments = recentAppointments.reduce((acc, apt) => {
      const doctorId = apt.doctor_id || apt.doctor_name || 'Unknown'
      acc[doctorId] = (acc[doctorId] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topDoctors = Object.entries(doctorAppointments)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([doctorId, count]) => {
        const doctor = doctors.find(d => d.doctor_id === doctorId || d.name === doctorId)
        return {
          id: doctorId,
          name: doctor?.name || doctor?.doctor_name || doctorId,
          appointments: count as number,
          specialty: doctor?.specialty || 'General'
        }
      })

    return {
      totalHospitals,
      totalDoctors,
      totalUsers,
      totalAppointments,
      totalLabReports,
      totalRevenue,
      occupancyRate,
      appointmentsByStatus,
      labReportsByStatus,
      topDoctors,
      totalBeds,
      availableBeds,
      occupiedBeds
    }
  }, [hospitalsRaw, appointmentsRaw, labReportsRaw, doctorsRaw, usersRaw, dateRange])

  // Export functions
  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return
    
    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const generateReport = async () => {
    setIsLoading(true)
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const reportData = {
      overview: {
        generatedAt: new Date().toISOString(),
        dateRange: `Last ${dateRange} days`,
        ...analytics
      }
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hospital_report_${reportType}_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)
    
    setIsLoading(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <AlertCircle size={48} className="text-orange-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-600 mb-4">Please login through the admin portal to access reports.</p>
          <Link href="/admin">
            <Button className="bg-orange-600 hover:bg-orange-700">
              Go to Admin Login
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Back to Admin
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-orange-600 p-3 rounded-xl">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Reports & Dashboard</h1>
                <p className="text-slate-600">Comprehensive analytics and reporting</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={generateReport} 
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700 gap-2"
            >
              {isLoading ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
              {isLoading ? 'Generating...' : 'Export Report'}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-600" />
              <Label className="font-medium">Filters:</Label>
            </div>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="dateRange" className="text-sm">Date Range:</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="reportType" className="text-sm">Report Type:</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="appointments">Appointments</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Hospitals</p>
                <p className="text-2xl font-bold text-slate-900">{analytics.totalHospitals}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Building2 size={24} className="text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Doctors</p>
                <p className="text-2xl font-bold text-slate-900">{analytics.totalDoctors}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Stethoscope size={24} className="text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Registered Users</p>
                <p className="text-2xl font-bold text-slate-900">{analytics.totalUsers}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users size={24} className="text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Bed Occupancy</p>
                <p className="text-2xl font-bold text-slate-900">{analytics.occupancyRate.toFixed(1)}%</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Bed size={24} className="text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Appointments & Revenue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Appointments Overview</h3>
              <Activity size={20} className="text-slate-600" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Appointments</span>
                <span className="font-semibold">{analytics.totalAppointments}</span>
              </div>
              
              {Object.entries(analytics.appointmentsByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {status === 'confirmed' && <CheckCircle size={16} className="text-green-600" />}
                    {status === 'scheduled' && <Clock size={16} className="text-blue-600" />}
                    {status === 'completed' && <CheckCircle size={16} className="text-green-600" />}
                    {status === 'cancelled' && <XCircle size={16} className="text-red-600" />}
                    <span className="text-sm text-slate-600 capitalize">{status}</span>
                  </div>
                  <span className="font-medium">{count as number}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Revenue Analytics</h3>
              <DollarSign size={20} className="text-slate-600" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Revenue</span>
                <span className="text-2xl font-bold text-green-600">₹{analytics.totalRevenue.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Average per Appointment</span>
                <span className="font-semibold">
                  ₹{analytics.totalAppointments > 0 ? (analytics.totalRevenue / analytics.totalAppointments).toFixed(0) : '0'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Revenue Growth</span>
                <div className="flex items-center gap-1">
                  <TrendingUp size={16} className="text-green-600" />
                  <span className="font-semibold text-green-600">+12.5%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Lab Reports & Bed Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Lab Reports</h3>
              <TestTube size={20} className="text-slate-600" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Reports</span>
                <span className="font-semibold">{analytics.totalLabReports}</span>
              </div>
              
              {Object.entries(analytics.labReportsByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {status === 'normal' && <CheckCircle size={16} className="text-green-600" />}
                    {status === 'abnormal' && <AlertCircle size={16} className="text-orange-600" />}
                    {status === 'pending' && <Clock size={16} className="text-blue-600" />}
                    <span className="text-sm text-slate-600 capitalize">{status}</span>
                  </div>
                  <span className="font-medium">{count as number}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Bed Management</h3>
              <Bed size={20} className="text-slate-600" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Beds</span>
                <span className="font-semibold">{analytics.totalBeds}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Occupied Beds</span>
                <span className="font-semibold text-red-600">{analytics.occupiedBeds}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Available Beds</span>
                <span className="font-semibold text-green-600">{analytics.availableBeds}</span>
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-red-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${analytics.occupancyRate}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 text-center">
                {analytics.occupancyRate.toFixed(1)}% Occupancy Rate
              </p>
            </div>
          </Card>
        </div>

        {/* Top Doctors */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Top Performing Doctors</h3>
            <UserCheck size={20} className="text-slate-600" />
          </div>
          
          <div className="space-y-4">
            {analytics.topDoctors.length > 0 ? (
              analytics.topDoctors.map((doctor, index) => (
                <div key={doctor.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{doctor.name}</p>
                      <p className="text-sm text-slate-600">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{doctor.appointments}</p>
                    <p className="text-sm text-slate-600">appointments</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-8">No doctor data available</p>
            )}
          </div>
        </Card>

        {/* Export Options */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Export Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              onClick={() => exportToCSV(appointmentsRaw || [], 'appointments')}
              className="gap-2"
            >
              <FileText size={16} />
              Export Appointments
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => exportToCSV(labReportsRaw || [], 'lab_reports')}
              className="gap-2"
            >
              <TestTube size={16} />
              Export Lab Reports
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => exportToCSV(hospitalsRaw || [], 'hospitals')}
              className="gap-2"
            >
              <Building2 size={16} />
              Export Hospitals
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
            <p className="text-slate-600 text-sm">
              📊 <strong>Reports generated on:</strong> {new Date().toLocaleString()} | 
              <strong> Data range:</strong> Last {dateRange} days
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}