"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Code2, 
  ArrowLeft, 
  BookOpen, 
  Activity, 
  Bug, 
  Zap,
  Database,
  Shield
} from "lucide-react"

export default function DeveloperPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100">
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
            <div className="bg-orange-600 p-4 rounded-2xl shadow-lg">
              <Code2 size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-900">Developer Portal</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            API documentation, system monitoring, and development tools
          </p>
        </div>

        {/* Developer Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { icon: BookOpen, title: "API Documentation", desc: "Complete API reference and guides", href: "#" },
            { icon: Activity, title: "System Monitoring", desc: "Real-time system health and metrics", href: "#" },
            { icon: Bug, title: "Debug Tools", desc: "Debugging utilities and error tracking", href: "#" },
            { icon: Zap, title: "Integration Guides", desc: "Step-by-step integration tutorials", href: "#" },
            { icon: Database, title: "Database Tools", desc: "Database management and queries", href: "#" },
            { icon: Shield, title: "Auth0 Test", desc: "Test Auth0 authentication integration", href: "/auth-test" }
          ].map((item, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <item.icon size={24} className="text-orange-600" />
                </div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-slate-600 text-sm">{item.desc}</p>
              {item.href === "#" ? (
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                  Access {item.title}
                </Button>
              ) : (
                <Link href={item.href}>
                  <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                    Access {item.title}
                  </Button>
                </Link>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-500">🚧 Developer portal features coming soon...</p>
        </div>
      </div>
    </div>
  )
}