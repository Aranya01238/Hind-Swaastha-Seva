"use client"

import { useSheets } from "@/hooks/use-sheets"
import { Empty } from "@/components/empty-state"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function LabsList() {
  const router = useRouter()
  const { data, error, isLoading } = useSheets<any[]>("Labs", { tab: "LabTests" })
  if (error)
    return (
      <div className="text-destructive" role="alert">
        Failed to load lab tests.
      </div>
    )
  if (isLoading) return <div className="py-8 text-center">Loading lab tests…</div>

  function mapLabRow(r: any) {
    return {
      id: r?.test_id ?? r?.TEST_ID ?? r?.id ?? "",
      appointmentId: r?.appointment_id ?? r?.APPOINTMENT_ID ?? "",
      testName: r?.test_name ?? r?.TEST_NAME ?? r?.name ?? "",
      testDate: r?.test_date ?? r?.TEST_DATE ?? r?.date ?? "",
      result: r?.result ?? r?.RESULT ?? "",
      status: r?.status ?? r?.STATUS ?? "",
      technician: r?.lab_technician ?? r?.LAB_TECHNICIAN ?? r?.technician ?? "",
    }
  }

  const rows = Array.isArray(data) ? data : Array.isArray((data as any)?.rows) ? (data as any).rows : []
  const tests = rows.filter((r) => r && typeof r === "object").map(mapLabRow)

  if (!tests.length) return <Empty title="No lab tests" description="No data available yet." />

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tests.map((t, idx) => (
        <Card key={`${t.id || idx}`}>
          <CardHeader>
            <CardTitle>{t.testName}</CardTitle>
            <p className="text-sm text-muted-foreground">{t.technician || "Technician N/A"}</p>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-sm">
              <div>Status: {t.status || "N/A"}</div>
              <div>Date: {t.testDate || "N/A"}</div>
              {t.result ? <div>Result: {t.result}</div> : null}
              <div className="text-xs text-muted-foreground">Appt: {t.appointmentId || "—"}</div>
            </div>
            <Button onClick={() => router.push(`/labs?test=${encodeURIComponent(t.id)}`)}>Details</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
