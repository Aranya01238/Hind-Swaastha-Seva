"use client"

import { useSheets } from "@/hooks/use-sheets"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Empty } from "@/components/empty-state"
import { useRouter } from "next/navigation"
import { Activity, BedDouble, Building2, Calendar, CheckCircle2, Search, XCircle } from "lucide-react"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

type EmergencyBed = {
  bed_id: string
  hospital_id: string
  ward_name: string
  bed_number: number | string
  occupied: boolean | string
  patient_name: string
  patient_id: string
  admitted_at: string
  expected_discharge: string
  remarks: string
  last_updated: string
}

export default function BedsList() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const { data, error, isLoading } = useSheets<EmergencyBed[]>("EmergencyBeds", {
    tab: "EmergencyBeds",
  })

  // Safe data extraction
  const rows: EmergencyBed[] = Array.isArray(data)
    ? data
    : data && Array.isArray((data as any).rows)
    ? ((data as any).rows as EmergencyBed[])
    : []
  
  const allBeds = rows.filter((r) => r && typeof r === "object")

  // Filter logic
  const filteredBeds = allBeds.filter((bed) => {
    const term = search.toLowerCase()
    return (
      bed.hospital_id?.toLowerCase().includes(term) ||
      bed.ward_name?.toLowerCase().includes(term) ||
      String(bed.bed_number).includes(term)
    )
  })

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-800">
        <p className="font-medium">Unable to load live bed status.</p>
        <p className="text-sm opacity-80">Please check your internet connection or try again later.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search hospital or ward..."
          className="pl-9 bg-white shadow-sm border-slate-200 focus-visible:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden border-slate-100">
              <CardHeader className="space-y-2 pb-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredBeds.length === 0 ? (
        <Empty
          title={search ? "No beds found" : "No emergency beds listed"}
          description={search ? "Try adjusting your search terms." : "All hospitals are currently full or data is syncing."}
          icon={BedDouble}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBeds.map((b) => {
            const isOccupied = String(b.occupied).toLowerCase() === "true"
            
            return (
              <Card 
                key={b.bed_id ?? `${b.ward_name}-${b.bed_number}`}
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-200"
              >
                {/* Status Strip */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-1 ${
                    isOccupied ? "bg-red-500" : "bg-green-500"
                  }`} 
                />

                <div className="p-5 pl-6 space-y-4">
                  {/* Header Info */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <Building2 className="size-3.5" />
                        {b.hospital_id}
                      </div>
                      <h3 className="font-semibold text-lg leading-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                        {b.ward_name} <span className="text-muted-foreground font-normal">#{b.bed_number}</span>
                      </h3>
                    </div>
                    {isOccupied ? (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 shrink-0 gap-1">
                        <XCircle className="size-3" /> Occupied
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 shrink-0 gap-1">
                        <CheckCircle2 className="size-3" /> Available
                      </Badge>
                    )}
                  </div>

                  {/* Details / Last Updated */}
                  <div className="space-y-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100">
                    <div className="flex items-center gap-2">
                       <Activity className="size-3.5 text-blue-500" />
                       <span className="font-medium">Type:</span> Emergency / ICU
                    </div>
                    {b.last_updated && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="size-3.5" />
                        Updated: {b.last_updated}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    className={`w-full font-medium shadow-sm transition-all duration-200 ${
                      isOccupied 
                        ? "bg-slate-100 text-slate-400 hover:bg-slate-100 cursor-not-allowed border border-slate-200"
                        : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-200"
                    }`}
                    onClick={() => {
                      if (isOccupied) return

                      const pending = {
                        type: "beds",
                        item: {
                          id: b.bed_id || `${b.ward_name}-${b.bed_number}` || "bed",
                          name: `Bed Reservation — ${b.ward_name} #${b.bed_number}`,
                          price: 500, // Example booking fee
                        },
                        date: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
                        createdAt: Date.now(),
                      }
                      
                      if (typeof window !== "undefined") {
                        sessionStorage.setItem("hss.pendingBooking", JSON.stringify(pending))
                      }
                      
                      const qs = new URLSearchParams({
                        service: "beds",
                        item: pending.item.name,
                        price: String(pending.item.price),
                        date: pending.date,
                      })
                      router.push(`/pay?${qs.toString()}`)
                    }}
                    disabled={isOccupied}
                  >
                    {isOccupied ? "Unavailable" : "Book Now"}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
