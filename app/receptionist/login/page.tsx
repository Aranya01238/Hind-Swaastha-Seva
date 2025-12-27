"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PanelHeader } from "@/components/panels/panel-header"

export default function ReceptionistLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (username === "Rec1234" && password === "Rec1234") {
      router.push("/receptionist/dashboard")
    } else {
      setError("Invalid credentials. Use Rec1234 / Rec1234.")
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PanelHeader title="Receptionist Login" />
      <section className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CardTitle className="text-center">Receptionist Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} aria-label="Receptionist login form" className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-[var(--brand-accent)] text-white hover:opacity-90"
                aria-label="Login"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
