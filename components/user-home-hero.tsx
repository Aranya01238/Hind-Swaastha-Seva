"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Download, 
  MessageCircle, 
  Calendar, 
  Activity,
  FileText,
  Clock,
  MapPin
} from "lucide-react"
import { NurseMaya } from "@/components/chat/nurse-maya"

export function UserHomeHero() {
  const [showChat, setShowChat] = useState(false)

  const downloadHealthID = () => {
    // Create a simple text file with user health information
    const healthData = `
===========================================
           HEALTH ID CARD
===========================================

Patient Information:
-------------------
Name: [User Name]
Health ID: HSS-XXXX-XXXX
Date of Birth: [DOB]
Blood Type: [Blood Type]
Emergency Contact: [Emergency Contact]

Medical Summary:
---------------
Allergies: [List any known allergies]
Current Medications: [List current medications]
Medical Conditions: [List any chronic conditions]
Last Checkup: [Date of last medical checkup]

Emergency Information:
---------------------
In case of emergency, please contact:
- Emergency Services: 911/112
- Primary Care Doctor: [Doctor Name & Phone]
- Hospital: [Preferred Hospital]

Insurance Information:
---------------------
Provider: [Insurance Provider]
Policy Number: [Policy Number]
Group Number: [Group Number]

===========================================
Generated on: ${new Date().toLocaleString()}
This is a digital health ID card.
Keep this information updated and accessible.
===========================================
    `

    const blob = new Blob([healthData], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `health-id-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Your Personal Health Dashboard
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Welcome to Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Health Journey
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Access your medical records, book appointments, and get AI-powered health insights all in one place.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              onClick={downloadHealthID}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Health ID
            </Button>
            
            <Button 
              onClick={() => setShowChat(!showChat)}
              variant="outline"
              className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with Nurse Maya
            </Button>
          </div>
        </div>

        {/* Health Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                Active
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Next Appointment</h3>
            <p className="text-2xl font-bold text-slate-900 mb-1">Dec 30, 2025</p>
            <p className="text-sm text-slate-600">Dr. Amit Singh - Orthopedics</p>
          </Card>

          <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                Recent
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Lab Results</h3>
            <p className="text-2xl font-bold text-slate-900 mb-1">3 Reports</p>
            <p className="text-sm text-slate-600">Last updated: Dec 21, 2025</p>
          </Card>

          <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                Updated
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Health Score</h3>
            <p className="text-2xl font-bold text-slate-900 mb-1">85/100</p>
            <p className="text-sm text-slate-600">Good overall health</p>
          </Card>
        </div>

        {/* Nurse Maya Chat */}
        {showChat && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Chat with Nurse Maya</h2>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowChat(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </Button>
              </div>
              <NurseMaya />
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: Calendar, label: "Book Appointment", color: "blue" },
            { icon: FileText, label: "Medical Records", color: "green" },
            { icon: Activity, label: "Health Tracking", color: "purple" },
            { icon: MapPin, label: "Find Hospitals", color: "orange" }
          ].map((item, index) => (
            <Card key={index} className="p-4 bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <div className={`p-3 rounded-xl mb-3 ${
                item.color === 'blue' ? 'bg-blue-100 group-hover:bg-blue-200' :
                item.color === 'green' ? 'bg-green-100 group-hover:bg-green-200' :
                item.color === 'purple' ? 'bg-purple-100 group-hover:bg-purple-200' :
                'bg-orange-100 group-hover:bg-orange-200'
              } transition-colors duration-300`}>
                <item.icon className={`w-6 h-6 ${
                  item.color === 'blue' ? 'text-blue-600' :
                  item.color === 'green' ? 'text-green-600' :
                  item.color === 'purple' ? 'text-purple-600' :
                  'text-orange-600'
                }`} />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">{item.label}</h3>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}