"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Users,
  Wrench,
  UserCheck,
  Building2,
  ArrowLeft,
  Bell,
  Settings,
  LogOut
} from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Data Analytics",
      href: "/admin",
      icon: BarChart3,
      description: "Hospital metrics and insights"
    },
    {
      title: "Staff Management",
      href: "/admin/staff",
      icon: Users,
      description: "Manage doctors, nurses, and staff"
    },
    {
      title: "Equipment Management",
      href: "/admin/equipment",
      icon: Wrench,
      description: "Medical equipment and inventory"
    },
    {
      title: "Patient Lists",
      href: "/admin/patients",
      icon: UserCheck,
      description: "Online and offline patient status"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/portals">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft size={16} />
                  Back to Portals
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Building2 size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Hospital Admin Portal</h1>
                  <p className="text-sm text-slate-600">Comprehensive hospital management system</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2">
                <Bell size={16} />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Settings size={16} />
                <span className="hidden sm:inline">Settings</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation Tabs */}
        <Card className="p-1 mb-6">
          <nav className="flex flex-wrap gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link key={item.href} href={item.href} className="flex-1 min-w-0">
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-auto p-4",
                      isActive 
                        ? "bg-green-600 hover:bg-green-700 text-white" 
                        : "hover:bg-slate-100"
                    )}
                  >
                    <Icon size={20} />
                    <div className="text-left min-w-0">
                      <div className="font-medium truncate">{item.title}</div>
                      <div className={cn(
                        "text-xs truncate",
                        isActive ? "text-green-100" : "text-slate-500"
                      )}>
                        {item.description}
                      </div>
                    </div>
                  </Button>
                </Link>
              )
            })}
          </nav>
        </Card>

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}