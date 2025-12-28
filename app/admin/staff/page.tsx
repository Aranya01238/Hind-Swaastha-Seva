"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Users, 
  Search,
  Plus,
  Edit,
  Trash2,
  Clock,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  UserCheck,
  UserX,
  Filter
} from "lucide-react"

export default function StaffManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedRole, setSelectedRole] = useState("All")

  useEffect(() => {
    const authStatus = localStorage.getItem('hospital_admin_auth')
    if (authStatus !== 'true') {
      window.location.href = '/admin'
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  // Mock staff data
  const staffMembers = [
    {
      id: "DOC001",
      name: "Dr. Rajesh Kumar",
      role: "Senior Cardiologist",
      department: "Cardiology",
      email: "rajesh.kumar@hospital.com",
      phone: "+91 98765 43210",
      status: "active",
      shift: "Morning (8 AM - 4 PM)",
      experience: "15 years",
      specialization: "Interventional Cardiology",
      joinDate: "2018-03-15"
    },
    {
      id: "NUR001",
      name: "Sister Priya Sharma",
      role: "Head Nurse",
      department: "ICU",
      email: "priya.sharma@hospital.com",
      phone: "+91 98765 43211",
      status: "active",
      shift: "Night (8 PM - 8 AM)",
      experience: "12 years",
      specialization: "Critical Care",
      joinDate: "2019-07-22"
    },
    {
      id: "DOC002",
      name: "Dr. Amit Singh",
      role: "Orthopedic Surgeon",
      department: "Orthopedics",
      email: "amit.singh@hospital.com",
      phone: "+91 98765 43212",
      status: "active",
      shift: "Evening (2 PM - 10 PM)",
      experience: "10 years",
      specialization: "Joint Replacement",
      joinDate: "2020-01-10"
    },
    {
      id: "NUR002",
      name: "Nurse Sunita Gupta",
      role: "Staff Nurse",
      department: "Pediatrics",
      email: "sunita.gupta@hospital.com",
      phone: "+91 98765 43213",
      status: "on-leave",
      shift: "Morning (8 AM - 4 PM)",
      experience: "8 years",
      specialization: "Pediatric Care",
      joinDate: "2021-05-18"
    },
    {
      id: "TEC001",
      name: "Ravi Patel",
      role: "Lab Technician",
      department: "Laboratory",
      email: "ravi.patel@hospital.com",
      phone: "+91 98765 43214",
      status: "active",
      shift: "Morning (6 AM - 2 PM)",
      experience: "6 years",
      specialization: "Blood Analysis",
      joinDate: "2022-02-28"
    },
    {
      id: "DOC003",
      name: "Dr. Meera Joshi",
      role: "Gynecologist",
      department: "Gynecology",
      email: "meera.joshi@hospital.com",
      phone: "+91 98765 43215",
      status: "active",
      shift: "Morning (9 AM - 5 PM)",
      experience: "18 years",
      specialization: "High-Risk Pregnancy",
      joinDate: "2017-11-05"
    }
  ]

  const departments = ["All", "Cardiology", "ICU", "Orthopedics", "Pediatrics", "Laboratory", "Gynecology", "Emergency"]
  const roles = ["All", "Doctor", "Nurse", "Technician", "Administrator"]

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "All" || staff.department === selectedDepartment
    const matchesRole = selectedRole === "All" || staff.role.toLowerCase().includes(selectedRole.toLowerCase())
    
    return matchesSearch && matchesDepartment && matchesRole
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Back to Admin Portal
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-3 rounded-xl">
                <Users size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Staff Management System</h1>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 gap-2">
            <Plus size={16} />
            Add New Staff
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Staff</p>
                <p className="text-3xl font-bold text-green-600">89</p>
              </div>
              <Users className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Doctors</p>
                <p className="text-3xl font-bold text-blue-600">24</p>
              </div>
              <Stethoscope className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Nurses</p>
                <p className="text-3xl font-bold text-purple-600">45</p>
              </div>
              <UserCheck className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">On Leave</p>
                <p className="text-3xl font-bold text-orange-600">5</p>
              </div>
              <UserX className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                placeholder="Search staff by name, role, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-md bg-white"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept} Department</option>
                ))}
              </select>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-md bg-white"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role === "All" ? "All Roles" : role}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Staff List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStaff.map((staff) => (
            <Card key={staff.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {staff.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{staff.name}</h3>
                    <p className="text-sm text-slate-600">{staff.role}</p>
                    <p className="text-xs text-slate-500">ID: {staff.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={staff.status === 'active' ? 'default' : 'secondary'} className={
                    staff.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }>
                    {staff.status === 'active' ? 'Active' : 'On Leave'}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin size={16} />
                  <span>{staff.department} Department</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail size={16} />
                  <span>{staff.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone size={16} />
                  <span>{staff.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock size={16} />
                  <span>{staff.shift}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar size={16} />
                  <span>Joined: {new Date(staff.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Experience:</span>
                  <span className="font-medium">{staff.experience}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-slate-600">Specialization:</span>
                  <span className="font-medium">{staff.specialization}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Schedule
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Contact
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <Card className="p-12 text-center">
            <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No staff members found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={() => {
              setSearchQuery("")
              setSelectedDepartment("All")
              setSelectedRole("All")
            }}>
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}