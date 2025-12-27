"use client"

import { useSheets } from "@/hooks/use-sheets"
import { mapBloodBank, aggregateBloodBank } from "@/lib/data-mapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty } from "@/components/empty-state"

export default function BloodBanksList() {
  const { data, error, isLoading } = useSheets<any[]>("BloodBank", { tab: "BloodBank" })
  if (error)
    return (
      <div className="text-destructive" role="alert">
        Failed to load blood banks.
      </div>
    )
  if (isLoading) return <div className="py-8 text-center">Loading blood banks…</div>

  const rows = Array.isArray(data) ? data : ((data as any)?.rows ?? [])
  const banksTall = aggregateBloodBank(rows)
  const banksWide = rows.filter((r: any) => r && typeof r === "object").map(mapBloodBank)
  const banks = banksTall.length ? banksTall : banksWide

  if (!banks.length) return <Empty title="No blood data" description="No stock available right now." />

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {banks.map((b) => (
        <Card key={b.id ?? b.name}>
          <CardHeader>
            <CardTitle>{b.name ?? b.id ?? "Blood Bank"}</CardTitle>
            <p className="text-sm text-muted-foreground">{b.address}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2 text-sm">
              {Object.entries(b.stock).map(([grp, qty]) => (
                <div key={grp} className="flex items-center justify-between rounded border px-2 py-1">
                  <span>{grp}</span>
                  <span>{Number(qty)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
