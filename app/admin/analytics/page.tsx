"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  ArrowLeft, 
  Activity, 
  Users, 
  Bed, 
  TrendingUp,
  Calendar,
  Clock,
  Heart,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react"

export default function PatientAnalytics() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem('hospital_admin_auth')
    if (authStatus !== 'true') {
      window.location.href = '/admin'
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
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
              <div className="bg-blue-600 p-3 rounded-xl">
                <BarChart3 size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Patient & Working Analytics</h1>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Patients</p>
                <p className="text-3xl font-bold text-blue-600">1,247</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp size={12} />
                  +12% from last month
                </p>
              </div>
              <Users className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Active Admissions</p>
                <p className="text-3xl font-bold text-green-600">245</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp size={12} />
                  +5% from yesterday
                </p>
              </div>
              <Bed className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Critical Cases</p>
                <p className="text-3xl font-bold text-orange-600">18</p>
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertTriangle size={12} />
                  Requires attention
                </p>
              </div>
              <Heart className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Bed Occupancy</p>
                <p className="text-3xl font-bold text-purple-600">87%</p>
                <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                  <Activity size={12} />
                  245/280 beds occupied
                </p>
              </div>
              <Activity className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Patient Flow Chart */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <LineChart className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-slate-900">Patient Flow (Last 7 Days)</h3>
            </div>
            <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-slate-600">Interactive chart showing daily admissions, discharges, and transfers</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Admissions:</span>
                    <span className="font-semibold text-green-600">+35 today</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discharges:</span>
                    <span className="font-semibold text-blue-600">-28 today</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Transfers:</span>
                    <span className="font-semibold text-orange-600">12 today</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Department Utilization */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-slate-900">Department Utilization</h3>
            </div>
            <div className="space-y-4">
              {[
                { dept: "Emergency", utilization: 92, patients: 45, color: "red" },
                { dept: "ICU", utilization: 87, patients: 28, color: "orange" },
                { dept: "General Ward", utilization: 78, patients: 156, color: "blue" },
                { dept: "Pediatrics", utilization: 65, patients: 32, color: "green" },
                { dept: "Maternity", utilization: 54, patients: 18, color: "purple" },
                { dept: "Surgery", utilization: 43, patients: 12, color: "indigo" }
              ].map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{dept.dept}</span>
                    <span className="text-slate-600">{dept.patients} patients ({dept.utilization}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        dept.color === 'red' ? 'bg-red-500' :
                        dept.color === 'orange' ? 'bg-orange-500' :
                        dept.color === 'blue' ? 'bg-blue-500' :
                        dept.color === 'green' ? 'bg-green-500' :
                        dept.color === 'purple' ? 'bg-purple-500' :
                        'bg-indigo-500'
                      }`}
                      style={{ width: `${dept.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Patient Activities */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-semibold text-slate-900">Recent Patient Activities</h3>
            </div>
            <div className="space-y-4">
              {[
                { time: "2 min ago", action: "New admission", patient: "John Doe", dept: "Emergency", status: "critical" },
                { time: "5 min ago", action: "Discharge", patient: "Sarah Smith", dept: "General Ward", status: "success" },
                { time: "12 min ago", action: "Transfer", patient: "Mike Johnson", dept: "ICU → Surgery", status: "warning" },
                { time: "18 min ago", action: "Lab results", patient: "Emma Wilson", dept: "Pediatrics", status: "info" },
                { time: "25 min ago", action: "Surgery completed", patient: "Robert Brown", dept: "Surgery", status: "success" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'critical' ? 'bg-red-500' :
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action} - {activity.patient}</p>
                    <p className="text-xs text-slate-600">{activity.dept} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* System Alerts */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-semibold text-slate-900">System Alerts</h3>
            </div>
            <div className="space-y-4">
              {[
                { type: "critical", message: "ICU bed capacity at 95%", time: "5 min ago" },
                { type: "warning", message: "Blood bank O- running low", time: "15 min ago" },
                { type: "info", message: "Scheduled maintenance in OR-3", time: "1 hour ago" },
                { type: "success", message: "New equipment installed in Lab-2", time: "2 hours ago" }
              ].map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'critical' ? 'bg-red-50 border-red-500' :
                  alert.type === 'warning' ? 'bg-orange-50 border-orange-500' :
                  alert.type === 'info' ? 'bg-blue-50 border-blue-500' :
                  'bg-green-50 border-green-500'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {alert.type === 'critical' ? <AlertTriangle size={16} className="text-red-600" /> :
                     alert.type === 'warning' ? <AlertTriangle size={16} className="text-orange-600" /> :
                     alert.type === 'info' ? <Activity size={16} className="text-blue-600" /> :
                     <CheckCircle size={16} className="text-green-600" />}
                    <span className={`text-sm font-medium ${
                      alert.type === 'critical' ? 'text-red-800' :
                      alert.type === 'warning' ? 'text-orange-800' :
                      alert.type === 'info' ? 'text-blue-800' :
                      'text-green-800'
                    }`}>
                      {alert.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{alert.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}