"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HDIMSDashboard } from "@/components/hdims/dashboard"

export default function SupervisorPage() {
  const [authed, setAuthed] = useState(false)
  const [u, setU] = useState("")
  const [p, setP] = useState("")

  useEffect(() => {
    const s = localStorage.getItem("hss-role")
    setAuthed(s === "supervisor")
  }, [])

  const login = () => {
    if (u === "Sup1234" && p === "Sup1234") {
      localStorage.setItem("hss-role", "supervisor")
      setAuthed(true)
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      <SiteHeader />
      <section className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Supervisor Dashboard</h1>
        {!authed ? (
          <Card className="max-w-sm">
            <CardContent className="p-4 space-y-2">
              <Input placeholder="Username" value={u} onChange={(e) => setU(e.target.value)} />
              <Input type="password" placeholder="Password" value={p} onChange={(e) => setP(e.target.value)} />
              <Button onClick={login} className="rounded-pill bg-[var(--brand-primary)] text-white">
                Login
              </Button>
              <p className="text-xs text-muted-foreground">Use Sup1234 / Sup1234</p>
            </CardContent>
          </Card>
        ) : (
          <HDIMSDashboard />
        )}
      </section>
    </main>
  )
}
