"use client"

import useSWR from "swr"

type Fetcher<T> = (url: string) => Promise<T>
const fetcher: Fetcher<any> = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Sheets API error: ${res.status} ${text}`)
  }
  const data = await res.json()
  // If the API returns { rows: [...] }, unwrap to the array so list components get data directly.
  if (data && Array.isArray(data.rows)) return data.rows
  // If the API already returns an array, pass it through.
  if (Array.isArray(data)) return data
  return data
}

export function useSheets<T = any>(table: string, params?: Record<string, string | number | boolean | undefined>) {
  const query = new URLSearchParams()
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) query.set(k, String(v))
    }
  }
  // Example: /api/sheets/Doctors?tab=Doctors
  const key = `/api/sheets/${encodeURIComponent(table)}${query.toString() ? `?${query.toString()}` : ""}`
  const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher)
  return { data, error, isLoading, mutate }
}
