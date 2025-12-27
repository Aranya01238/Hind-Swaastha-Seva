"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  User, 
  Building2, 
  UserCheck, 
  Code2, 
  ArrowRight, 
  Heart,
  Stethoscope,
  Shield,
  Terminal
} from "lucide-react"

export default function PortalsPage() {
  const portals = [
    {
      id: "user",
      title: "User Portal",
      description: "Access healthcare services, book appointments, and consult with AI doctors",
      icon: User,
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      href: "/user",
      features: ["AI Health Assistant", "Book Appointments", "Find Hospitals", "Blood Bank Access"]
    },
    {
      id: "hospital",
      title: "Hospital Admin Portal",
      description: "Manage hospital operations, staff, and patient records",
      icon: Building2,
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      href: "/admin",
      features: ["Patient Management", "Staff Coordination", "Resource Planning", "Analytics Dashboard"]
    },
    {
      id: "receptionist",
      title: "Receptionist Portal",
      description: "Handle patient check-ins, appointments, and front desk operations",
      icon: UserCheck,
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
      href: "/receptionist",
      features: ["Patient Check-in", "Appointment Scheduling", "Queue Management", "Billing Support"]
    },
    {
      id: "developer",
      title: "Developer Portal",
      description: "API documentation, system monitoring, and development tools",
      icon: Code2,
      color: "bg-orange-600",
      hoverColor: "hover:bg-orange-700",
      href: "/developer",
      features: ["API Documentation", "System Monitoring", "Debug Tools", "Integration Guides"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Animated Background Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-500/30">
              <Heart size={32} className="text-white" fill="currentColor" />
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900">
              Health<span className="text-red-600">Save</span>
            </h1>
          </div>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
            Choose your portal to access the healthcare management system
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            <Shield size={16} />
            <span className="text-sm font-semibold">Secure & Encrypted Platform</span>
          </div>
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {portals.map((portal) => {
            const IconComponent = portal.icon
            return (
              <Card key={portal.id} className="group relative overflow-hidden border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50">
                <div className="p-8">
                  {/* Portal Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`${portal.color} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-slate-700 transition-colors">
                        {portal.title}
                      </h3>
                      <p className="text-slate-500 font-medium">
                        {portal.description}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Key Features</h4>
                    <ul className="space-y-2">
                      {portal.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-slate-600">
                          <div className="w-2 h-2 bg-slate-300 rounded-full group-hover:bg-slate-400 transition-colors"></div>
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Access Button */}
                  <Link href={portal.href}>
                    <Button 
                      className={`w-full ${portal.color} ${portal.hoverColor} text-white font-bold py-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Access {portal.title}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </Card>
            )
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Stethoscope size={16} className="text-red-500" />
              <span>Healthcare Management</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-500" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-blue-500" />
              <span>API Integrated</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            © 2025 HealthSave Security Cluster. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}