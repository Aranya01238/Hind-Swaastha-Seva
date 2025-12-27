"use client"

import { useSearchParams, useRouter } from "next/navigation"
import PatientGate from "@/components/auth/patient-gate"
import { usePatient } from "@/components/auth/use-patient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentPage() {
  const sp = useSearchParams()
  const { patient } = usePatient()
  const router = useRouter()

  const service = sp.get("service") || "hospital"
  const item = sp.get("item") || ""
  const name = sp.get("name") || ""
  const date = sp.get("date") || ""
  const time = sp.get("time") || ""
  const price = Number(sp.get("price") || 500)

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Payment</h1>
      <PatientGate>
        <Card>
          <CardHeader>
            <CardTitle className="text-balance">Confirm and pay</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-muted-foreground">Service</dt>
              <dd className="font-medium">{service}</dd>
              <dt className="text-muted-foreground">Patient</dt>
              <dd className="font-medium">{patient?.name ?? name}</dd>
              {item ? (
                <>
                  <dt className="text-muted-foreground">Selected</dt>
                  <dd className="font-medium">{item}</dd>
                </>
              ) : null}
              <dt className="text-muted-foreground">Date</dt>
              <dd className="font-medium">{date}</dd>
              <dt className="text-muted-foreground">Time</dt>
              <dd className="font-medium">{time}</dd>
              <dt className="text-muted-foreground">Amount</dt>
              <dd className="font-semibold">₹{price}</dd>
            </dl>

            <div className="mt-4 grid gap-2">
              <Button onClick={() => router.push(`/payment/success?service=${service}`)} aria-label="Mock pay now">
                Pay now
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </PatientGate>
    </main>
  )
}
