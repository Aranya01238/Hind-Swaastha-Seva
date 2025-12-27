"use client"

import { useCallback, useEffect, useState } from "react"

export type Patient = {
  email: string
  name?: string
}

const STORAGE_KEY = "hss.patient"

export function usePatient() {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setPatient(JSON.parse(raw))
    } catch {}
    setReady(true)
  }, [])

  const login = useCallback((p: Patient) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
    setPatient(p)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setPatient(null)
  }, [])

  return { patient, login, logout, ready }
}
