import { type NextRequest, NextResponse } from "next/server"

type InventoryUnits = Record<string, number>
type InventoryRich = Record<string, { units: number; liters: number }>

const UNIT_TO_LITERS = 0.45 // ~450 mL per unit

// Seed data: hospitals/blood centres with coordinates and inventory (units)
// You can expand this later or back it with a DB.
const banks = [
  {
    id: "b1",
    name: "City Blood Bank",
    address: "Sector 10, New Delhi",
    phone: "+91-11-1234-5678",
    lat: 28.61,
    lng: 77.2,
    types: { "A+": 12, "B+": 7, "O+": 18, "AB+": 4 } as InventoryUnits,
    lastUpdated: "2025-10-03T09:00:00Z",
  },
  {
    id: "b2",
    name: "Red Cross Unit",
    address: "Safdarjung Enclave, New Delhi",
    phone: "+91-11-4455-7788",
    lat: 28.57,
    lng: 77.15,
    types: { "A-": 2, "B-": 1, "O-": 3, "AB-": 1 } as InventoryUnits,
    lastUpdated: "2025-10-03T08:30:00Z",
  },
  {
    id: "b3",
    name: "Regional Blood Centre",
    address: "Connaught Place, New Delhi",
    phone: "+91-11-6677-8899",
    lat: 28.63,
    lng: 77.26,
    types: { "A+": 6, "B+": 10, "O+": 9, "AB+": 2 } as InventoryUnits,
    lastUpdated: "2025-10-03T07:50:00Z",
  },
]

// Haversine distance in km
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLon = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
  return R * c
}

function enrichInventory(units: InventoryUnits): InventoryRich {
  const r: InventoryRich = {}
  for (const [k, v] of Object.entries(units)) {
    r[k] = { units: v, liters: Math.round(v * UNIT_TO_LITERS * 100) / 100 }
  }
  return r
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const lat = Number.parseFloat(url.searchParams.get("lat") || "")
  const lng = Number.parseFloat(url.searchParams.get("lng") || "")
  const radiusKm = Number.parseFloat(url.searchParams.get("radiusKm") || "10")
  const typeFilter = (url.searchParams.get("type") || "").toUpperCase().trim()

  const hasLocation = Number.isFinite(lat) && Number.isFinite(lng)

  // Build response rows
  let rows = banks.map((b) => {
    const distance = hasLocation ? distanceKm({ lat, lng }, { lat: b.lat, lng: b.lng }) : null
    const inventory = enrichInventory(b.types)
    const matchLiters = typeFilter && inventory[typeFilter] ? inventory[typeFilter].liters : 0
    const totalLiters = Object.values(inventory).reduce((sum, x) => sum + x.liters, 0)
    return {
      id: b.id,
      name: b.name,
      address: b.address,
      phone: b.phone,
      lat: b.lat,
      lng: b.lng,
      distanceKm: distance !== null ? Math.round(distance * 100) / 100 : null,
      inventory,
      totalLiters: Math.round(totalLiters * 100) / 100,
      lastUpdated: b.lastUpdated,
      matchLiters,
    }
  })

  // Filter by radius if location present
  if (hasLocation) {
    rows = rows.filter((r) => r.distanceKm !== null && (r.distanceKm as number) <= radiusKm)
  }

  // Sort: prioritize type match then distance
  rows.sort((a, b) => {
    if (typeFilter) {
      if (b.matchLiters !== a.matchLiters) return (b.matchLiters || 0) - (a.matchLiters || 0)
    }
    const da = a.distanceKm ?? Number.POSITIVE_INFINITY
    const db = b.distanceKm ?? Number.POSITIVE_INFINITY
    return da - db
  })

  return NextResponse.json({
    banks: rows,
    meta: {
      unitToLiter: UNIT_TO_LITERS,
      hasLocation,
      radiusKm: hasLocation ? radiusKm : null,
      typeFilter: typeFilter || null,
    },
  })
}
