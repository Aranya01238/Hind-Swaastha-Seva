"use client"

import { useEffect, useMemo, useState } from "react"
import PatientGate from "@/components/auth/patient-gate"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { Label } from "@/components/ui/label"
import { usePatient } from "@/components/auth/use-patient"

type Pending = {
  type: string
  item: { id: string; name: string; price: number }
  date: string
  note?: string
  phone?: string
}

export default function PayPage() {
  const router = useRouter()
  const sp = useSearchParams()
  const [pending, setPending] = useState<Pending | null>(null)
  const { patient } = usePatient()

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("hss.pendingBooking")
      if (raw) setPending(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    if (pending) return
    const service = sp.get("service")
    const item = sp.get("item")
    const price = sp.get("price")
    const date = sp.get("date")
    const phone = sp.get("phone") || undefined
    if (service && item && price && date) {
      setPending({
        type: service,
        item: { id: item, name: item, price: Number(price) || 0 },
        date,
        phone,
      })
    }
  }, [sp, pending])

  const summary = useMemo(() => {
    if (!pending) return null
    return [
      { label: "Category", value: pending.type },
      { label: "Selection", value: pending.item.name },
      { label: "Preferred time", value: new Date(pending.date).toLocaleString() },
      { label: "Contact", value: pending.phone || "—" },
      { label: "Note", value: pending.note || "—" },
      { label: "Amount (₹)", value: pending.item.price.toString() },
    ]
  }, [pending])

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <PatientGate>
        <div className="mb-6 flex items-center gap-2 text-sm">
          <span className="rounded-full size-6 flex items-center justify-center bg-[var(--brand-primary)] text-white">
            1
          </span>
          <span>Details</span>
          <span className="mx-2">→</span>
          <span className="rounded-full size-6 flex items-center justify-center bg-[var(--brand-primary)] text-white">
            2
          </span>
          <span>Payment</span>
          <span className="mx-2">→</span>
          <span className="rounded-full size-6 flex items-center justify-center bg-muted text-foreground/70">3</span>
          <span>Done</span>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Secure Checkout</CardTitle>
            <CardDescription>Review your booking and choose a payment method.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {!pending ? (
              <p role="status">Nothing to pay yet. Please start a booking.</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-xs text-muted-foreground">Category</div>
                    <div className="text-sm font-medium">{pending.type}</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-xs text-muted-foreground">Selection</div>
                    <div className="text-sm font-medium">{pending.item.name}</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-xs text-muted-foreground">Preferred time</div>
                    <div className="text-sm font-medium">{new Date(pending.date).toLocaleString()}</div>
                  </div>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Amount</span>
                      <span className="text-base font-semibold">₹{pending.item.price}</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <Label className="text-xs">Payment method</Label>
                    <div className="mt-2 grid gap-2">
                      <Button variant="outline" className="justify-start rounded-pill bg-transparent">
                        UPI (Mock)
                      </Button>
                      <Button variant="outline" className="justify-start rounded-pill bg-transparent">
                        Card (Mock)
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardContent className="pt-0">
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.back()} className="rounded-pill">
                Back
              </Button>
              <Button
                className="rounded-pill"
                onClick={async () => {
                  if (!pending) return
                  // Attempt to write to Google Sheets (gracefully skip if writes disabled)
                  try {
                    const appointmentId = `A-${Date.now()}-${Math.floor(Math.random() * 1000)}`
                    const paymentId = `P-${Date.now()}-${Math.floor(Math.random() * 1000)}`
                    const nowIso = new Date().toISOString()

                    const appointmentPayload = {
                      appointment_id: appointmentId,
                      user_id: patient?.email || "guest",
                      doctor_id: pending.type === "hospital" ? pending.item.id : "",
                      hospital_id: "",
                      date_time: pending.date,
                      referral_id: "",
                      status: "Confirmed",
                      payment_status: "paid",
                    }

                    const paymentPayload = {
                      payment_id: paymentId,
                      appointment_id: appointmentId,
                      amount: Number(pending.item.price || 0),
                      method: "UPI",
                      status: "paid",
                      created_at: nowIso,
                    }

                    const apptRes = await fetch("/api/sheets/Appointments", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(appointmentPayload),
                    })
                    // 501 means writes disabled; ignore errors to keep UX smooth
                    if (!apptRes.ok && apptRes.status !== 501) {
                      console.log("[v0] Appointment write failed:", await apptRes.text())
                    }

                    const payRes = await fetch("/api/sheets/Payments", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(paymentPayload),
                    })
                    if (!payRes.ok && payRes.status !== 501) {
                      console.log("[v0] Payment write failed:", await payRes.text())
                    }
                  } catch (err) {
                    console.log("[v0] Write operation error:", (err as any)?.message || err)
                  }

                  sessionStorage.removeItem("hss.pendingBooking")
                  router.push("/pay/success")
                }}
                disabled={!pending}
              >
                Confirm Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </PatientGate>
    </main>
  )
}
