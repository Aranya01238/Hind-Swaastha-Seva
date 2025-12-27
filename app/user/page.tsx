"use client"

import { SiteHeader } from "@/components/site-header"
import { SearchSection } from "@/components/search-section"
import { CategoryChips } from "@/components/category-chips"
import { HealthcareCard, type HealthcareItem } from "@/components/healthcare-card"
import { EmergencyAndBloodCTA } from "@/components/emergency-blood"
import { PaymentDialog } from "@/components/payment/payment-dialog"
import { useLanguage } from "@/components/i18n/language-context"
import { HomeHero } from "@/components/home-hero"
import { EmptyState } from "@/components/empty-state"
import { useMemo, useState, useEffect } from "react"
import { HomeCounts } from "@/components/home-counts"
import { useSheets } from "@/hooks/use-sheets"

type MockItem = HealthcareItem & {
  category: "Hospital" | "Clinic" | "Diagnostic" | "Pharmacy" | "Blood Bank"
  city?: string
  specialties?: string[]
}

export default function UserDashboard() {
  const [query, setQuery] = useState("")
  const [selectedCat, setSelectedCat] = useState<string>("All Types")
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null)

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

  const hospitalItems: MockItem[] = Array.isArray(hospitalsRaw)
    ? hospitalsRaw
        .filter((r) => r && typeof r === "object")
        .map((r: any): MockItem => {
          const id = (r.hospital_id ?? r.id ?? r.code ?? r.HOSPITAL_ID ?? r.ID ?? "").toString() || crypto.randomUUID()
          const name = (r.name ?? r.hospital_name ?? r.NAME ?? r.HOSPITAL_NAME ?? "Hospital").toString()
          // optional fields, keep safe defaults
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

  return (
    <main className="flex flex-col min-h-screen">
      <SiteHeader />
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