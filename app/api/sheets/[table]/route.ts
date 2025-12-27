import { type NextRequest, NextResponse } from "next/server"
import { SHEETS_ID, SHEETS_WRITE_URL, TAB_NAMES, normalizeSheetId } from "@/lib/sheets-config"
import { fetchGvizAsRecords } from "@/lib/gviz"
import type { TableMap, TableName } from "@/lib/types"

const TABLE_KEYS = Object.keys(TAB_NAMES) as TableName[]
const TABLE_ALIAS: Record<string, TableName> = TABLE_KEYS.reduce(
  (acc, k) => {
    acc[k.toLowerCase()] = k
    return acc
  },
  {} as Record<string, TableName>,
)

function canonicalizeTable(input: string): TableName {
  const key = input.trim().toLowerCase()
  const t = TABLE_ALIAS[key]
  if (!t) {
    const allowed = TABLE_KEYS.join(", ")
    throw new Error(`Unknown table: "${input}". Allowed: ${allowed}`)
  }
  return t
}

function coerceNumbers<T extends Record<string, any>>(row: T, keys: string[]) {
  keys.forEach((k) => {
    if (row[k] === null || row[k] === undefined || row[k] === "") return
    const n = Number(row[k])
    if (!Number.isNaN(n)) (row as any)[k] = n
  })
  return row
}

function coerceTypes(table: TableName, row: any) {
  switch (table) {
    case "Users":
      return coerceNumbers(row, ["age"])
    case "Hospitals":
      return coerceNumbers(row, ["bed_capacity", "available_beds", "emergency_beds", "beds_emergency", "beds"])
    case "Doctors":
      return coerceNumbers(row, ["rating", "fee"])
    case "Appointments":
      return row
    case "EmergencyBeds":
      return row
    case "Payments":
      return coerceNumbers(row, ["amount"])
    case "BloodBank":
      return coerceNumbers(row, ["quantity"])
    case "Staff":
      return row
    case "Labs":
      return coerceNumbers(row, ["price", "amount"])
  }
}

export async function GET(req: NextRequest, context: { params: { table: string } }) {
  try {
    const params = await context.params // Await params here
    const rawTable = params.table
    const table = canonicalizeTable(rawTable)

    const { searchParams } = new URL(req.url)
    const rawSheetId = searchParams.get("sheetId") || SHEETS_ID
    const sheetId = normalizeSheetId(rawSheetId) // ensure we only pass the doc ID to GViz
    if (!sheetId) {
      return NextResponse.json(
        {
          error: "Missing sheetId. Pass ?sheetId=... or set SHEETS_ID env.",
          hint: "You can pass either the full Google Sheets URL or just the document ID.",
        },
        { status: 400 },
      )
    }
    const tabOverride = searchParams.get("tab") || undefined
    const sheetName = tabOverride || TAB_NAMES[table as keyof typeof TAB_NAMES]

    let raw: Array<Record<string, any>> | null = null
    let gvizError: Error | null = null

    try {
      raw = await fetchGvizAsRecords<Record<string, any>>({ sheetId, sheetName })
    } catch (e: any) {
      gvizError = e
    }

    // Fallback to Apps Script Web App (SHEETS_WRITE_URL) if GViz failed and a URL is configured.
    if (!raw && SHEETS_WRITE_URL) {
      try {
        const url = new URL(SHEETS_WRITE_URL)
        url.searchParams.set("table", table)
        url.searchParams.set("sheetId", sheetId)
        url.searchParams.set("sheetName", sheetName)
        const proxyRes = await fetch(url.toString(), { cache: "no-store" })
        if (!proxyRes.ok) {
          const text = await proxyRes.text()
          throw new Error(`Apps Script read failed: ${proxyRes.status} ${text}`)
        }
        const body = await proxyRes.json().catch(() => ({}))
        // Support either { rows: [...] } or an array
        raw = Array.isArray(body) ? body : Array.isArray(body?.rows) ? body.rows : null
        if (!raw) throw new Error("Apps Script read returned no rows")
      } catch (proxyErr: any) {
        // If both GViz and Apps Script fail, surface the original GViz error with fallback detail.
        const message = [
          gvizError?.message || "GViz failed",
          "Apps Script read fallback also failed",
          proxyErr?.message,
        ]
          .filter(Boolean)
          .join(" | ")
        return NextResponse.json(
          {
            error: message,
            hint: "Either make the Sheet public (Anyone with link - Viewer) for GViz, or provide a working Apps Script Web App URL in SHEETS_WRITE_URL.",
          },
          { status: 502 },
        )
      }
    }

    if (!raw && gvizError) {
      return NextResponse.json(
        {
          error: gvizError.message,
          hint: "Ensure the Google Sheet is publicly viewable (Anyone with link - Viewer), or set SHEETS_WRITE_URL to a Google Apps Script Web App URL for private access.",
        },
        { status: 500 },
      )
    }

    const coerced = (raw || []).map((r) => coerceTypes(table, r))
    return NextResponse.json(
      {
        table,
        sheetId,
        sheetName,
        rows: coerced as Array<TableMap[TableName]>, // <-- Fix type error here
        count: coerced.length,
      },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (e: any) {
    return NextResponse.json(
      {
        error: e?.message || "Unknown error",
        hint: "Ensure the Google Sheet is publicly viewable (Anyone with link - Viewer), or configure SHEETS_WRITE_URL for private access.",
      },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest, context: { params: { table: string } }) {
  try {
    const rawTable = context.params.table
    const table = canonicalizeTable(rawTable)

    if (!SHEETS_WRITE_URL) {
      return NextResponse.json(
        {
          error: "Writes are disabled. Provide a Google Apps Script Web App URL in SHEETS_WRITE_URL to enable.",
        },
        { status: 501 },
      )
    }

    const payload = await req.json()

    const res = await fetch(SHEETS_WRITE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, payload }),
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: "Write failed", detail: text }, { status: 502 })
    }

    const data = await res.json().catch(() => ({}))
    return NextResponse.json({ ok: true, data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}
