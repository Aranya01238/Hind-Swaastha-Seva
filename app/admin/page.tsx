"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Building2, 
  ArrowLeft, 
  Users, 
  Activity, 
  BarChart3,
  Wrench,
  Lock,
  Eye,
  EyeOff,
  LogOut
} from "lucide-react"

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ id: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  // Check if already authenticated on page load
  useEffect(() => {
    const authStatus = localStorage.getItem('hospital_admin_auth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Hardcoded credentials
    if (loginForm.id === "HOSP001" && loginForm.password === "Arjun") {
      setIsAuthenticated(true)
      localStorage.setItem('hospital_admin_auth', 'true')
    } else {
      setError("Invalid credentials. Please check your ID and password.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('hospital_admin_auth')
    setLoginForm({ id: "", password: "" })
  }

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center">
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
                <div className="bg-green-600 p-4 rounded-2xl shadow-lg">
                  <Building2 size={40} className="text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-black text-slate-900 mb-2">Hospital Admin Login</h1>
              <p className="text-slate-600">Enter your credentials to access the admin portal</p>
            </div>

            {/* Login Form */}
            <Card className="p-8 shadow-xl">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="adminId" className="text-sm font-medium">Admin ID</Label>
                  <Input
                    id="adminId"
                    type="text"
                    placeholder="Enter your admin ID"
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

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 gap-2">
                  <Lock size={16} />
                  Login to Admin Portal
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700 font-medium mb-1">Demo Credentials:</p>
                <p className="text-xs text-blue-600">ID: HOSP001</p>
                <p className="text-xs text-blue-600">Password: Arjun</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard (after authentication)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/portals">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Back to Portals
              </Button>
            </Link>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 text-red-600 border-red-200 hover:bg-red-50">
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-green-600 p-4 rounded-2xl shadow-lg">
              <Building2 size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-900">Hospital Admin Portal</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Welcome, Admin HOSP001! Manage hospital operations and administrative tasks
          </p>
        </div>

        {/* Admin Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { 
              icon: Activity, 
              title: "Patient & Working Analytics", 
              desc: "Monitor patient flow, bed occupancy, and operational metrics",
              href: "/admin/analytics",
              color: "blue"
            },
            { 
              icon: Users, 
              title: "Staff Management System", 
              desc: "Manage doctors, nurses, and support staff schedules",
              href: "/admin/staff",
              color: "green"
            },
            { 
              icon: Wrench, 
              title: "Equipment Management System", 
              desc: "Track medical equipment, maintenance, and inventory",
              href: "/admin/equipment",
              color: "purple"
            },
            { 
              icon: BarChart3, 
              title: "Reports & Dashboard", 
              desc: "Generate comprehensive reports and view KPIs",
              href: "/admin/reports",
              color: "orange"
            }
          ].map((item, index) => (
            <Link key={index} href={item.href}>
              <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-xl ${
                    item.color === 'blue' ? 'bg-blue-100' :
                    item.color === 'green' ? 'bg-green-100' :
                    item.color === 'purple' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    <item.icon size={32} className={
                      item.color === 'blue' ? 'text-blue-600' :
                      item.color === 'green' ? 'text-green-600' :
                      item.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    } />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-slate-600 mb-6">{item.desc}</p>
                <Button className={`w-full ${
                  item.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                  item.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                  item.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                  'bg-orange-600 hover:bg-orange-700'
                }`}>
                  Access {item.title}
                </Button>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-slate-600 mb-2">🏥 <strong>Hospital Management System v2.0</strong></p>
            <p className="text-sm text-slate-500">Logged in as: Admin HOSP001 | Last login: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}