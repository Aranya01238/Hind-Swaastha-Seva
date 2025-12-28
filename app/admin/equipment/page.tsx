"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Wrench, 
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Activity,
  Zap,
  Heart,
  Microscope,
  Scan,
  Filter
} from "lucide-react"

export default function EquipmentManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  useEffect(() => {
    const authStatus = localStorage.getItem('hospital_admin_auth')
    if (authStatus !== 'true') {
      window.location.href = '/admin'
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  // Mock equipment data
  const equipment = [
    {
      id: "EQ001",
      name: "MRI Scanner - Siemens Magnetom",
      category: "Imaging",
      location: "Radiology Department - Room 201",
      status: "operational",
      lastMaintenance: "2025-12-15",
      nextMaintenance: "2026-03-15",
      purchaseDate: "2023-05-20",
      warranty: "Active until 2026-05-20",
      cost: "₹2,50,00,000",
      manufacturer: "Siemens Healthineers",
      model: "MAGNETOM Vida 3T",
      serialNumber: "MRI2023001"
    },
    {
      id: "EQ002",
      name: "Ventilator - Philips V60",
      category: "Life Support",
      location: "ICU - Bed 5",
      status: "in-use",
      lastMaintenance: "2025-12-20",
      nextMaintenance: "2026-01-20",
      purchaseDate: "2024-02-10",
      warranty: "Active until 2027-02-10",
      cost: "₹8,50,000",
      manufacturer: "Philips Healthcare",
      model: "V60 Plus",
      serialNumber: "VEN2024002"
    },
    {
      id: "EQ003",
      name: "CT Scanner - GE Revolution",
      category: "Imaging",
      location: "Radiology Department - Room 105",
      status: "maintenance",
      lastMaintenance: "2025-12-25",
      nextMaintenance: "2026-04-25",
      purchaseDate: "2022-08-15",
      warranty: "Expired",
      cost: "₹1,80,00,000",
      manufacturer: "GE Healthcare",
      model: "Revolution CT",
      serialNumber: "CT2022003"
    },
    {
      id: "EQ004",
      name: "Defibrillator - Zoll X Series",
      category: "Emergency",
      location: "Emergency Department",
      status: "operational",
      lastMaintenance: "2025-12-10",
      nextMaintenance: "2026-02-10",
      purchaseDate: "2024-06-30",
      warranty: "Active until 2027-06-30",
      cost: "₹4,25,000",
      manufacturer: "Zoll Medical",
      model: "X Series Advanced",
      serialNumber: "DEF2024004"
    },
    {
      id: "EQ005",
      name: "Ultrasound Machine - Mindray DC-70",
      category: "Imaging",
      location: "Gynecology Department",
      status: "operational",
      lastMaintenance: "2025-11-28",
      nextMaintenance: "2026-02-28",
      purchaseDate: "2023-11-12",
      warranty: "Active until 2026-11-12",
      cost: "₹12,50,000",
      manufacturer: "Mindray",
      model: "DC-70 X-Insight",
      serialNumber: "US2023005"
    },
    {
      id: "EQ006",
      name: "Anesthesia Machine - Dräger Perseus A500",
      category: "Surgery",
      location: "Operating Theater 3",
      status: "out-of-order",
      lastMaintenance: "2025-12-22",
      nextMaintenance: "2026-01-05",
      purchaseDate: "2021-03-18",
      warranty: "Expired",
      cost: "₹15,75,000",
      manufacturer: "Dräger",
      model: "Perseus A500",
      serialNumber: "ANE2021006"
    }
  ]

  const categories = ["All", "Imaging", "Life Support", "Emergency", "Surgery", "Laboratory", "Monitoring"]
  const statuses = ["All", "Operational", "In-Use", "Maintenance", "Out-of-Order"]

  const filteredEquipment = equipment.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         eq.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         eq.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || eq.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || eq.status.toLowerCase().replace('-', ' ') === selectedStatus.toLowerCase()
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in-use': return <Activity className="w-4 h-4 text-blue-600" />
      case 'maintenance': return <Settings className="w-4 h-4 text-orange-600" />
      case 'out-of-order': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-slate-600" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Imaging': return <Scan className="w-5 h-5" />
      case 'Life Support': return <Heart className="w-5 h-5" />
      case 'Emergency': return <Zap className="w-5 h-5" />
      case 'Surgery': return <Activity className="w-5 h-5" />
      case 'Laboratory': return <Microscope className="w-5 h-5" />
      default: return <Wrench className="w-5 h-5" />
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100">
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
              <div className="bg-purple-600 p-3 rounded-xl">
                <Wrench size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Equipment Management System</h1>
            </div>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
            <Plus size={16} />
            Add Equipment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Operational</p>
                <p className="text-3xl font-bold text-green-600">156</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">In Use</p>
                <p className="text-3xl font-bold text-blue-600">89</p>
              </div>
              <Activity className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Maintenance</p>
                <p className="text-3xl font-bold text-orange-600">12</p>
              </div>
              <Settings className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Out of Order</p>
                <p className="text-3xl font-bold text-red-600">8</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-red-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                placeholder="Search equipment by name, ID, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-md bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat} {cat !== "All" ? "Equipment" : "Categories"}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-md bg-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status === "All" ? "All Status" : status}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Equipment List */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredEquipment.map((eq) => (
            <Card key={eq.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white">
                    {getCategoryIcon(eq.category)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{eq.name}</h3>
                    <p className="text-sm text-slate-600">{eq.category} Equipment</p>
                    <p className="text-xs text-slate-500">ID: {eq.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`gap-1 ${
                    eq.status === 'operational' ? 'border-green-200 text-green-700 bg-green-50' :
                    eq.status === 'in-use' ? 'border-blue-200 text-blue-700 bg-blue-50' :
                    eq.status === 'maintenance' ? 'border-orange-200 text-orange-700 bg-orange-50' :
                    'border-red-200 text-red-700 bg-red-50'
                  }`}>
                    {getStatusIcon(eq.status)}
                    {eq.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin size={16} />
                  <span>{eq.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar size={16} />
                  <span>Last Maintenance: {new Date(eq.lastMaintenance).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock size={16} />
                  <span>Next Maintenance: {new Date(eq.nextMaintenance).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Manufacturer:</span>
                    <p className="font-medium">{eq.manufacturer}</p>
                  </div>
                  <div>
                    <span className="text-slate-600">Model:</span>
                    <p className="font-medium">{eq.model}</p>
                  </div>
                  <div>
                    <span className="text-slate-600">Purchase Cost:</span>
                    <p className="font-medium text-green-600">{eq.cost}</p>
                  </div>
                  <div>
                    <span className="text-slate-600">Warranty:</span>
                    <p className={`font-medium ${eq.warranty.includes('Expired') ? 'text-red-600' : 'text-green-600'}`}>
                      {eq.warranty}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Schedule Maintenance
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <Card className="p-12 text-center">
            <Wrench className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No equipment found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
              setSelectedStatus("All")
            }}>
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}