"use client"

import { useState } from "react"
import Link from "next/link"
import { PanelHeader } from "@/components/panels/panel-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type OnlinePatient = { id: string; name: string; appointmentId: string; status: "Pending" | "Confirmed" }
type StaffMember = { id: string; name: string; phone: string; payment: "Paid" | "Due" }

const INIT_ONLINE: OnlinePatient[] = [
  { id: "p1", name: "Arjun", appointmentId: "12345", status: "Confirmed" },
  { id: "p2", name: "Meera", appointmentId: "12346", status: "Pending" },
]

const DOCTORS: StaffMember[] = [
  { id: "D1234", name: "Dr. Sharma", phone: "9999999999", payment: "Paid" },
  { id: "D5678", name: "Dr. Iyer", phone: "8888888888", payment: "Paid" },
]
const NURSES: StaffMember[] = [{ id: "N1020", name: "Nurse Priya", phone: "7777777777", payment: "Due" }]
const SECURITY: StaffMember[] = [{ id: "S9001", name: "Mr. Kumar", phone: "6666666666", payment: "Paid" }]

export default function SupervisorDashboard() {
  const [patients, setPatients] = useState(INIT_ONLINE)
  const [newUserName, setNewUserName] = useState("")

  function addUser() {
    if (!newUserName.trim()) return
    const id = crypto.getRandomValues(new Uint32Array(1))[0].toString()
    setPatients((p) => [...p, { id, name: newUserName.trim(), appointmentId: id.slice(0, 5), status: "Pending" }])
    setNewUserName("")
  }
  function removeUser(id: string) {
    setPatients((p) => p.filter((x) => x.id !== id))
  }

  return (
    <main className="min-h-screen flex flex-col">
      <PanelHeader title="Supervisor Dashboard" />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-secondary p-4 hidden md:flex md:flex-col gap-2" aria-label="Supervisor Navigation">
          <Link className="text-sm hover:underline" href="#online">
            Online Patients
          </Link>
          <Link className="text-sm hover:underline" href="#staff">
            Staff Management
          </Link>
          <Link className="text-sm hover:underline" href="/">
            Logout
          </Link>
        </aside>

        {/* Main */}
        <section className="flex-1 p-4 md:p-6 space-y-8">
          <section id="online" aria-labelledby="online-title" className="space-y-4">
            <h2 id="online-title" className="text-lg font-semibold">
              Online Patients
            </h2>

            <div className="flex items-end gap-2">
              <div className="flex-1 max-w-xs">
                <Label htmlFor="newUser">Add user (name)</Label>
                <Input id="newUser" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
              </div>
              <Button variant="outline" onClick={addUser} aria-label="Add User">
                + Add User
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {patients.map((p) => (
                <Card key={p.id} className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Patient: {p.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>Appointment ID: {p.appointmentId}</p>
                    <Badge variant={p.status === "Confirmed" ? "default" : "secondary"}>{p.status}</Badge>
                    <div className="pt-2 flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => removeUser(p.id)}>
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="staff" aria-labelledby="staff-title" className="space-y-4">
            <h2 id="staff-title" className="text-lg font-semibold">
              Staff Management
            </h2>

            <Tabs defaultValue="doctors" className="w-full">
              <TabsList>
                <TabsTrigger value="doctors">Doctors</TabsTrigger>
                <TabsTrigger value="nurses">Nurses</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="doctors">
                <StaffGrid members={DOCTORS} />
              </TabsContent>
              <TabsContent value="nurses">
                <StaffGrid members={NURSES} />
              </TabsContent>
              <TabsContent value="security">
                <StaffGrid members={SECURITY} />
              </TabsContent>
            </Tabs>
          </section>
        </section>
      </div>
    </main>
  )
}

function StaffGrid({ members }: { members: StaffMember[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {members.map((m) => (
        <Card key={m.id} className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-base">{m.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Phone: {m.phone}</p>
            <p>ID: {m.id}</p>
            <Badge variant={m.payment === "Paid" ? "default" : "secondary"}>{m.payment}</Badge>
            <div className="pt-2 flex gap-2">
              <Button size="sm">Edit</Button>
              <Button size="sm" variant="outline">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
