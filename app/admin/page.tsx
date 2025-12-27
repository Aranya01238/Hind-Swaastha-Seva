"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Building2, 
  ArrowLeft, 
  Users, 
  Activity, 
  Calendar, 
  FileText,
  BarChart3,
  Settings
} from "lucide-react"

export default function AdminPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/portals">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft size={16} />
              Back to Portals
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-green-600 p-4 rounded-2xl shadow-lg">
              <Building2 size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-900">Hospital Admin Portal</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Manage hospital operations, staff coordination, and administrative tasks
          </p>
        </div>

        {/* Admin Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { icon: Users, title: "Staff Management", desc: "Manage doctors, nurses, and support staff" },
            { icon: Activity, title: "Patient Overview", desc: "Monitor patient admissions and discharges" },
            { icon: Calendar, title: "Scheduling", desc: "Manage appointments and staff schedules" },
            { icon: FileText, title: "Reports", desc: "Generate administrative and financial reports" },
            { icon: BarChart3, title: "Analytics", desc: "View hospital performance metrics" },
            { icon: Settings, title: "System Settings", desc: "Configure hospital management settings" }
          ].map((item, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <item.icon size={24} className="text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-slate-600 text-sm">{item.desc}</p>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                Access {item.title}
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-500">🚧 Admin portal features coming soon...</p>
        </div>
      </div>
    </div>
  )
}