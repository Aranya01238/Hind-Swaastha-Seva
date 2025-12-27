import { type NextRequest, NextResponse } from "next/server"

const beds = [
  {
    id: "eb1",
    hospitalId: "H1",
    hospitalName: "District General Hospital",
    wardName: "ICU-1",
    bedNumber: 1,
    lat: 28.62,
    lng: 77.21,
    occupied: true,
    patientName: "Arjun",
    admittedAt: "2025-10-05 10:00",
    expectedDischarge: "2025-10-10 14:00",
    remarks: "Stable condition",
    lastUpdated: "2025-10-05 11:00",
  },
  {
    id: "eb2",
    hospitalId: "H1",
    hospitalName: "District General Hospital",
    wardName: "ICU-1",
    bedNumber: 2,
    lat: 28.62,
    lng: 77.21,
    occupied: false,
    patientName: "",
    admittedAt: "",
    expectedDischarge: "",
    remarks: "Available",
    lastUpdated: "2025-10-05 11:00",
  },
  {
    id: "eb3",
    hospitalId: "H2",
    hospitalName: "Community Health Centre",
    wardName: "Emergency-2",
    bedNumber: 5,
    lat: 28.58,
    lng: 77.12,
    occupied: true,
    patientName: "Maya",
    admittedAt: "2025-10-06 09:00",
    expectedDischarge: "2025-10-08 10:00",
    remarks: "Under observation",
    lastUpdated: "2025-10-06 09:30",
  },
  {
    id: "eb4",
    hospitalId: "H2",
    hospitalName: "Community Health Centre",
    wardName: "Emergency-3",
    bedNumber: 6,
    lat: 28.58,
    lng: 77.12,
    occupied: false,
    patientName: "",
    admittedAt: "",
    expectedDischarge: "",
    remarks: "Available",
    lastUpdated: "2025-10-06 09:30",
  },
]

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLon = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
  return R * c
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const lat = Number.parseFloat(url.searchParams.get("lat") || "")
  const lng = Number.parseFloat(url.searchParams.get("lng") || "")
  const radiusKm = Number.parseFloat(url.searchParams.get("radiusKm") || "10")
  const occupiedFilter = url.searchParams.get("occupied") // "true" or "false"

  const hasLocation = Number.isFinite(lat) && Number.isFinite(lng)

  let rows = beds.map((b) => {
    const distance = hasLocation ? distanceKm({ lat, lng }, { lat: b.lat, lng: b.lng }) : null
    return {
      ...b,
      distanceKm: distance !== null ? Math.round(distance * 100) / 100 : null,
    }
  })

  // Filter by radius if location present
  if (hasLocation) {
    rows = rows.filter((r) => r.distanceKm !== null && (r.distanceKm as number) <= radiusKm)
  }

  // Filter by occupied status if requested
  if (occupiedFilter === "true") {
    rows = rows.filter((r) => r.occupied)
  } else if (occupiedFilter === "false") {
    rows = rows.filter((r) => !r.occupied)
  }

  // Sort by available first, then by distance
  rows.sort((a, b) => {
    if (a.occupied !== b.occupied) return a.occupied ? 1 : -1
    const da = a.distanceKm ?? Number.POSITIVE_INFINITY
    const db = b.distanceKm ?? Number.POSITIVE_INFINITY
    return da - db
  })

  return NextResponse.json({
    beds: rows,
    meta: {
      hasLocation,
      radiusKm: hasLocation ? radiusKm : null,
      occupiedFilter: occupiedFilter ?? null,
    },
  })
}
// ... existing code ...