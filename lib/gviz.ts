type GVizCell = { v: any; f?: string }
type GVizCol = { id: string; label: string; type: string }
type GVizRow = { c: Array<GVizCell | null> }
type GVizTable = { cols: GVizCol[]; rows: GVizRow[] }
type GVizResponse = { table: GVizTable }

function stripGvizWrapper(text: string): string {
  const start = text.indexOf("{")
  const end = text.lastIndexOf("}")
  if (start === -1 || end === -1) {
    throw new Error("Invalid GViz response. Is the Sheet public (Anyone with link - Viewer) and the tab name correct?")
  }
  return text.slice(start, end + 1)
}

export async function fetchGvizRaw(params: {
  sheetId: string
  sheetName: string
  query?: string
}) {
  const { sheetId, sheetName, query = "select *" } = params
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    sheetName,
  )}&tq=${encodeURIComponent(query)}`
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) {
    const preview = await res.text().catch(() => "")
    throw new Error(
      `GViz fetch failed: ${res.status}. Check sharing and tab name. Preview: ${preview.slice(0, 160)}...`,
    )
  }
  const text = await res.text()
  let json: GVizResponse
  try {
    json = JSON.parse(stripGvizWrapper(text)) as GVizResponse
  } catch (err: any) {
    throw new Error(
      `GViz parse failed. Ensure the sheet is publicly viewable and the tab exists. Raw preview: ${text.slice(
        0,
        160,
      )}...`,
    )
  }
  return json.table
}

function toKey(label: string, idx: number) {
  const base = label?.trim() ? label.trim() : `c${idx}`
  return base
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
}

export async function fetchGvizAsRecords<T = any>(params: {
  sheetId: string
  sheetName: string
}) {
  const table = await fetchGvizRaw(params)
  const headers = table.cols.map((c, i) => toKey(c.label || c.id || "", i))
  const rows = table.rows.map((r) => {
    const obj: Record<string, any> = {}
    headers.forEach((h, i) => {
      const cell = r.c[i]
      obj[h] = cell ? (cell.f ?? cell.v) : null
    })
    return obj as T
  })
  return rows
}
