"use client"

import type React from "react"

import { useState } from "react"
import { usePatient } from "./use-patient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PatientGate({ children }: { children: React.ReactNode }) {
  const { patient, login, ready } = usePatient()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  if (!ready) return null
  if (patient) return <>{children}</>

  return (
    <div className="mx-auto my-10 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-balance">Patient Login Required</CardTitle>
          <CardDescription className="text-pretty">
            Please log in to continue with payment. You can browse and book first, login is only needed at payment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!email) return
              login({ email, name })
            }}
            className="grid gap-4"
            aria-label="Patient login form"
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Full name (optional)</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Asha Verma" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                required
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
