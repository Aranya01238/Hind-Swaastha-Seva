"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSheets } from "@/hooks/use-sheets"

export function HomeCounts() {
  const { data: hospitals } = useSheets<any[]>("Hospitals", { tab: "Hospitals" })
  const { data: doctors } = useSheets<any[]>("Doctors", { tab: "Doctors" })
  const { data: labs } = useSheets<any[]>("Labs", { tab: "LabTests" })
  const { data: blood } = useSheets<any[]>("BloodBank", { tab: "BloodBank" })

  const counts = {
    hospitals: Array.isArray(hospitals) ? hospitals.length : 0,
    doctors: Array.isArray(doctors) ? doctors.length : 0,
    labs: Array.isArray(labs) ? labs.length : 0,
    bloodbanks: Array.isArray(blood) ? blood.length : 0,
  }

  return (
    <section aria-label="Live counts" className="mx-auto w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle>Hospitals</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{counts.hospitals}</CardContent>
      </Card>
      <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle>Doctors</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{counts.doctors}</CardContent>
      </Card>
      <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle>Lab Tests</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{counts.labs}</CardContent>
      </Card>
      <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle>Blood Banks</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{counts.bloodbanks}</CardContent>
      </Card>
    </section>
  )
}
