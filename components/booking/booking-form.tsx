"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type BookingType = "labs" | "beds" | "blood" | "hospital"

export interface BookingItem {
  id: string
  name: string
  price: number // mock INR amount
}

export default function BookingForm({
  type,
  items,
  title,
  description,
}: {
  type: BookingType
  items: BookingItem[]
  title: string
  description?: string
}) {
  const router = useRouter()
  const [selected, setSelected] = useState<string>(items[0]?.id ?? "")
  const [date, setDate] = useState<string>("")
  const [note, setNote] = useState<string>("")
  const [phone, setPhone] = useState<string>("")

  const selectedItem = items.find((i) => i.id === selected) ?? items[0]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-balance">{title}</CardTitle>
        {description ? <CardDescription className="text-pretty">{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (!selectedItem) return
            const pending = {
              type,
              item: selectedItem,
              date,
              note,
              phone,
              createdAt: Date.now(),
            }
            sessionStorage.setItem("hss.pendingBooking", JSON.stringify(pending))
            const qs = new URLSearchParams({
              service: type,
              item: selectedItem.name,
              price: String(selectedItem.price),
              date,
              phone,
            })
            router.push(`/pay?${qs.toString()}`)
          }}
          aria-label={`${title} booking form`}
        >
          <div className="grid gap-2">
            <Label htmlFor="service">Select</Label>
            <Select value={selected || selectedItem?.id} onValueChange={setSelected}>
              <SelectTrigger id="service" aria-label="Select a service">
                <SelectValue placeholder="Choose option" />
              </SelectTrigger>
              <SelectContent>
                {items.map((i) => (
                  <SelectItem key={i.id} value={i.id}>{`${i.name} — ₹${i.price}`}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Preferred date & time</Label>
            <Input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="phone">Contact number</Label>
            <Input
              id="phone"
              inputMode="tel"
              placeholder="10-digit mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Textarea
              id="note"
              placeholder="Symptoms, requests, or additional details"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <Button type="submit" className="w-full md:w-auto">
              Proceed to Payment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
