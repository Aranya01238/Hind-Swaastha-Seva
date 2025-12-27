"use client"

import { useState } from "react"
import Link from "next/link"
import { PanelHeader } from "@/components/panels/panel-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type OfflinePatient = { id: string; name: string; payment: "Paid" | "Pending Payment" }

export default function ReceptionistDashboard() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [age, setAge] = useState<number | "">("")
  const [date, setDate] = useState("")
  const [doctor, setDoctor] = useState<string>("")
  const [patients, setPatients] = useState<OfflinePatient[]>([
    { id: "OP-101", name: "Ramesh", payment: "Pending Payment" },
    { id: "OP-102", name: "Sita", payment: "Paid" },
  ])

  function confirmBooking() {
    if (!name.trim() || !phone.trim() || !doctor) return
    const id = `OP-${Math.floor(100 + Math.random() * 900)}`
    setPatients((p) => [{ id, name: name.trim(), payment: "Pending Payment" }, ...p])
    setName("")
    setPhone("")
    setAge("")
    setDate("")
    setDoctor("")
  }

  return (
    <main className="min-h-screen flex flex-col">
      <PanelHeader title="Receptionist Dashboard" />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-secondary p-4 hidden md:flex md:flex-col gap-2" aria-label="Receptionist Navigation">
          <Link className="text-sm hover:underline" href="#booking">
            Offline Booking
          </Link>
          <Link className="text-sm hover:underline" href="#offline">
            Offline Patients
          </Link>
          <Link className="text-sm hover:underline" href="/">
            Logout
          </Link>
        </aside>

        {/* Main */}
        <section className="flex-1 p-4 md:p-6 space-y-8">
          <section id="booking" aria-labelledby="booking-title" className="space-y-4">
            <h2 id="booking-title" className="text-lg font-semibold">
              Offline Booking
            </h2>
            <Card>
              <CardContent className="pt-6">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      placeholder="Patient Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Age"
                      value={age}
                      onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                      min={0}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="date">Appointment Date</Label>
                    <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <Label>Doctor</Label>
                    <Select value={doctor} onValueChange={setDoctor}>
                      <SelectTrigger aria-label="Select doctor">
                        <SelectValue placeholder="Choose Doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dr. Sharma">Dr. Sharma</SelectItem>
                        <SelectItem value="Dr. Iyer">Dr. Iyer</SelectItem>
                        <SelectItem value="Dr. Khan">Dr. Khan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Button
                      type="button"
                      onClick={confirmBooking}
                      className="bg-[var(--brand-accent)] text-white hover:opacity-90"
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>

          <section id="offline" aria-labelledby="offline-title" className="space-y-4">
            <h2 id="offline-title" className="text-lg font-semibold">
              Offline Patients
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {patients.map((p) => (
                <Card
                  key={p.id}
                  className="hover:shadow-lg transition-shadow"
                  role="button"
                  tabIndex={0}
                  aria-label={`Patient ${p.name}, ${p.id}, ${p.payment}`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Patient: {p.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>ID: {p.id}</p>
                    <Badge variant={p.payment === "Paid" ? "default" : "secondary"}>{p.payment}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}
