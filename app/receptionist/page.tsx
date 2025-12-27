"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  UserCheck, 
  ArrowLeft, 
  ClipboardList, 
  Clock, 
  CreditCard, 
  Phone,
  Users,
  Calendar
} from "lucide-react"

export default function ReceptionistPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-100">
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
            <div className="bg-purple-600 p-4 rounded-2xl shadow-lg">
              <UserCheck size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-900">Receptionist Portal</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Handle patient check-ins, appointments, and front desk operations
          </p>
        </div>

        {/* Receptionist Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { icon: ClipboardList, title: "Patient Check-in", desc: "Register new patients and check-ins" },
            { icon: Calendar, title: "Appointments", desc: "Schedule and manage patient appointments" },
            { icon: Clock, title: "Queue Management", desc: "Monitor waiting times and patient flow" },
            { icon: CreditCard, title: "Billing Support", desc: "Process payments and insurance claims" },
            { icon: Phone, title: "Call Management", desc: "Handle incoming calls and inquiries" },
            { icon: Users, title: "Patient Records", desc: "Access and update patient information" }
          ].map((item, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <item.icon size={24} className="text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-slate-600 text-sm">{item.desc}</p>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Access {item.title}
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-500">🚧 Receptionist portal features coming soon...</p>
        </div>
      </div>
    </div>
  )
}