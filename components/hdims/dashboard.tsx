"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts"

const inventory = [
  { name: "Gloves", qty: 120 },
  { name: "Masks", qty: 480 },
  { name: "Saline", qty: 60 },
]

const staffing = [
  { shift: "Morning", nurses: 8, doctors: 4 },
  { shift: "Evening", nurses: 6, doctors: 3 },
  { shift: "Night", nurses: 4, doctors: 2 },
]

const analytics = [
  { day: "Mon", op: 42, ip: 8 },
  { day: "Tue", op: 51, ip: 12 },
  { day: "Wed", op: 49, ip: 9 },
  { day: "Thu", op: 60, ip: 10 },
  { day: "Fri", op: 55, ip: 14 },
]

export function HDIMSDashboard() {
  return (
    <Tabs defaultValue="inventory" className="w-full">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="inventory" className="space-y-2">
        {inventory.map((i) => (
          <Card key={i.name}>
            <CardContent className="p-3 flex items-center justify-between">
              <span>{i.name}</span>
              <span>{i.qty}</span>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
      <TabsContent value="schedule" className="space-y-2">
        {staffing.map((s) => (
          <Card key={s.shift}>
            <CardContent className="p-3 flex items-center justify-between">
              <span>{s.shift}</span>
              <span>
                {s.nurses} nurses, {s.doctors} doctors
              </span>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardContent className="p-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="op" stroke="var(--brand-primary)" name="Outpatient" />
                <Line type="monotone" dataKey="ip" stroke="var(--brand-accent)" name="Inpatient" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
