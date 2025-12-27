"use client"

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from "@/components/site-header"
import { SearchSection } from "@/components/search-section"
import { CategoryChips } from "@/components/category-chips"
import { HealthcareCard, type HealthcareItem } from "@/components/healthcare-card"
import { EmergencyAndBloodCTA } from "@/components/emergency-blood"
import { PaymentDialog } from "@/components/payment/payment-dialog"
import { useLanguage } from "@/components/i18n/language-context"
import { HomeHero } from "@/components/home-hero"
import { EmptyState } from "@/components/empty-state"
import { useMemo, useState } from "react"
import { HomeCounts } from "@/components/home-counts"
import { useSheets } from "@/hooks/use-sheets"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, Calendar, LogOut, Shield, Heart } from "lucide-react"
import { DebugData } from "@/components/debug-data"
import Link from "next/link"

type MockItem = HealthcareItem & {
  category: "Hospital" | "Clinic" | "Diagnostic" | "Pharmacy" | "Blood Bank"
  city?: string
  specialties?: string[]
}

export default function UserDashboard() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [query, setQuery] = useState("")
  const [selectedCat, setSelectedCat] = useState<string>("All Types")
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/api/auth/login?returnTo=/user');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (selectedCat === "Nearby Centres" && typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLoc(null),
        { enableHighAccuracy: true, timeout: 5000 },
      )
    }
  }, [selectedCat])

  function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
    const R = 6371
    const dLat = ((b.lat - a.lat) * Math.PI) / 180
    const dLng = ((b.lng - a.lng) * Math.PI) / 180
    const lat1 = (a.lat * Math.PI) / 180
    const lat2 = (b.lat * Math.PI) / 180
    const s =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s))
    return R * c
  }

  const { data: hospitalsRaw } = useSheets<any[]>("Hospitals", { tab: "Hospitals" })
  const { data: appointmentsRaw } = useSheets<any[]>("Appointments", { tab: "Appointments" })
  const { data: labReportsRaw } = useSheets<any[]>("LabReports", { tab: "LabReports" })

  // Get current user's appointments (match by Auth0 ID or email) - with safe filtering
  const userAppointments = useMemo(() => {
    if (!user?.sub || !Array.isArray(appointmentsRaw)) return []
    
    return appointmentsRaw
      .filter((apt: any) => {
        // Skip null/undefined entries
        if (!apt || typeof apt !== 'object') return false
        
        // Check for matching Auth0 ID, email, or user_id
        return (
          apt.auth0_id === user.sub || 
          apt.user_email === user.email ||
          apt.user_id === user.sub
        )
      })
  }, [user, appointmentsRaw])

  // Get current user's lab reports (match by Auth0 ID or email) - with safe filtering
  const userLabReports = useMemo(() => {
    if (!user?.sub || !Array.isArray(labReportsRaw)) return []
    
    return labReportsRaw
      .filter((report: any) => {
        // Skip null/undefined entries
        if (!report || typeof report !== 'object') return false
        
        // Check for matching Auth0 ID, email, or user_id
        return (
          report.auth0_id === user.sub || 
          report.user_email === user.email ||
          report.user_id === user.sub
        )
      })
  }, [user, labReportsRaw])

  // Generate Health ID from Auth0 data
  const healthId = useMemo(() => {
    if (!user?.sub) return 'Not assigned'
    const shortId = user.sub.slice(-8).toUpperCase()
    return `HSS-${shortId.slice(0,4)}-${shortId.slice(4)}`
  }, [user])

  const hospitalItems: MockItem[] = Array.isArray(hospitalsRaw)
    ? hospitalsRaw
        .filter((r) => r && typeof r === "object")
        .map((r: any): MockItem => {
          const id = (r.hospital_id ?? r.id ?? r.code ?? r.HOSPITAL_ID ?? r.ID ?? "").toString() || crypto.randomUUID()
          const name = (r.name ?? r.hospital_name ?? r.NAME ?? r.HOSPITAL_NAME ?? "Hospital").toString()
          const tier = (r.tier ?? r.level ?? "Standard").toString()
          const lat = typeof r.lat === "number" ? r.lat : typeof r.latitude === "number" ? r.latitude : undefined
          const lng = typeof r.lng === "number" ? r.lng : typeof r.longitude === "number" ? r.longitude : undefined
          const specialties: string[] = Array.isArray(r.specialties)
            ? r.specialties
            : typeof r.specialties === "string"
              ? r.specialties.split(",").map((s: string) => s.trim())
              : []
          return {
            id,
            name,
            tier,
            category: "Hospital",
            distanceKm: undefined,
            lat,
            lng,
            specialties,
          }
        })
    : []

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const BASE = hospitalItems
    const arr = BASE.map((item) => {
      let computedDistance = item.distanceKm
      if (userLoc && typeof item.lat === "number" && typeof item.lng === "number") {
        computedDistance = haversineKm(userLoc, { lat: item.lat, lng: item.lng })
      }
      return { ...item, computedDistance }
    }).filter((item) => {
      const matchesQ = q.length === 0 || item.name.toLowerCase().includes(q)
      const byCategory = selectedCat === "All Types" || item.category.toLowerCase() === selectedCat.toLowerCase()
      const bySpecialty =
        selectedCat === "All Types" ||
        (item.specialties ?? []).some((s) => s.toLowerCase() === selectedCat.toLowerCase())
      const matchesCatOrSpec = selectedCat === "All Types" ? true : byCategory || bySpecialty
      const matchesNearby = selectedCat === "Nearby Centres" ? (item.computedDistance ?? 999) <= 5 : true
      return matchesQ && matchesCatOrSpec && matchesNearby
    })
    if (selectedCat === "Nearby Centres") {
      arr.sort((a, b) => (a.computedDistance ?? 999) - (b.computedDistance ?? 999))
    }
    return arr
  }, [query, selectedCat, userLoc, hospitalItems])

  const { t } = useLanguage()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Authentication error: {error.message}</p>
          <Button onClick={() => router.push('/api/auth/login')}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      <SiteHeader />
      
      {/* User Profile Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                  {user.picture ? (
                    <img 
                      src={user.picture} 
                      alt={user.name || 'User'} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <span>{(user.name || user.email || 'U').charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Welcome back, {user.name || user.nickname || user.email?.split('@')[0] || 'User'}!
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Mail size={16} />
                      <span>{user.email}</span>
                    </div>
                    {user.phone_number && (
                      <div className="flex items-center gap-1">
                        <Phone size={16} />
                        <span>{user.phone_number}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Member since {new Date(user.updated_at || user.created_at || '').toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    <span className="text-blue-600 font-semibold">Health ID: {healthId}</span>
                    {user.email_verified && (
                      <span className="ml-3 text-green-600">✓ Email Verified</span>
                    )}
                    {user.phone_verified && (
                      <span className="ml-3 text-green-600">✓ Phone Verified</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/profile">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                  >
                    <User size={16} />
                    View Profile
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/api/auth/logout?returnTo=' + encodeURIComponent(window.location.origin + '/portals')}
                  className="gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Health Summary Section */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          <DebugData appointmentsRaw={appointmentsRaw} labReportsRaw={labReportsRaw} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Upcoming Appointments */}
            <Card className="p-4">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                Upcoming Appointments
              </h3>
              {(() => {
                const upcomingAppointments = userAppointments
                  .filter((apt: any) => apt && (apt.status === 'scheduled' || apt.status === 'confirmed'))
                  .slice(0, 2);
                
                if (upcomingAppointments.length === 0) {
                  return <p className="text-sm text-slate-500">No upcoming appointments</p>;
                }
                
                return upcomingAppointments.map((apt: any) => (
                  <div key={apt.appointment_id || Math.random()} className="mb-3 p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-sm">{apt.appointment_date || 'Date TBD'} at {apt.appointment_time || 'Time TBD'}</p>
                    <p className="text-xs text-slate-600">{apt.type || 'Consultation'} - {apt.status || 'Scheduled'}</p>
                    {apt.doctor_name && <p className="text-xs text-slate-500">{apt.doctor_name}</p>}
                  </div>
                ));
              })()}
            </Card>

            {/* Recent Lab Reports */}
            <Card className="p-4">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Shield size={18} className="text-green-600" />
                Recent Lab Reports
              </h3>
              {(() => {
                const recentReports = userLabReports
                  .filter((report: any) => report)
                  .slice(0, 2);
                
                if (recentReports.length === 0) {
                  return <p className="text-sm text-slate-500">No lab reports available</p>;
                }
                
                return recentReports.map((report: any) => (
                  <div key={report.report_id || Math.random()} className="mb-3 p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-sm">{report.test_name || 'Lab Test'}</p>
                    <p className="text-xs text-slate-600">{report.test_date || 'Date TBD'} - {report.status || 'Pending'}</p>
                    {report.lab_name && <p className="text-xs text-slate-500">{report.lab_name}</p>}
                  </div>
                ));
              })()}
            </Card>

            {/* User Profile Summary */}
            <Card className="p-4">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Heart size={18} className="text-red-600" />
                Profile Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Health ID:</span>
                  <span className="font-medium text-blue-600">{healthId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Email Status:</span>
                  <span className={`font-medium ${user.email_verified ? 'text-green-600' : 'text-orange-600'}`}>
                    {user.email_verified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Member Since:</span>
                  <span className="font-medium">
                    {new Date(user.created_at || user.updated_at || '').toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Last Login:</span>
                  <span className="font-medium">
                    {new Date(user.updated_at || '').toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <HomeHero />
      <section className="flex flex-col gap-6 p-6">
        <HomeCounts />
        <SearchSection
          onSearch={({ centre }) => {
            setQuery(centre ?? "")
          }}
        />
        <CategoryChips selected={selectedCat} onSelect={setSelectedCat} extras={["Nearby Centres"]} />
        <h2 className="sr-only">Search results</h2>
        {filtered.length === 0 ? (
          <EmptyState
            title="No centres match your search"
            description="Try a different name or choose a different category."
            onReset={() => {
              setQuery("")
              setSelectedCat("All Types")
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
            {filtered.map((item) => (
              <div key={item.id} role="listitem">
                <HealthcareCard
                  item={item}
                  bookHref={
                    item.category === "Hospital"
                      ? "/book/hospital"
                      : item.category === "Diagnostic"
                        ? "/book/labs"
                        : item.category === "Blood Bank"
                          ? "/book/blood"
                          : undefined
                  }
                />
              </div>
            ))}
          </div>
        )}
        <EmergencyAndBloodCTA
          onBed={() => (window.location.href = "/beds")}
          onBlood={() => (window.location.href = "/blood")}
        />
        <div className="p-2">
          <PaymentDialog />
        </div>
      </section>
      <footer className="mt-auto p-6 bg-secondary flex flex-col md:flex-row justify-between text-sm transition-colors duration-500 ease-in-out hover:bg-muted">
        <p>{t("footer_contact")}</p>
        <p>{t("footer_social")}</p>
        <p>{t("footer_disclaimer")}</p>
      </footer>
    </main>
  )
}