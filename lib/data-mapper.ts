export type Row = Record<string, any>

function normalizeKey(k: string) {
  const s = (k ?? "").toString()
  return s.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export function get<T = any>(row: Row | null | undefined, ...candidates: string[]): T | undefined {
  if (!row || typeof row !== "object") return undefined
  const valid = (candidates || []).filter(Boolean) as string[]
  for (const c of valid) {
    const key = Object.keys(row).find((rk) => normalizeKey(rk) === normalizeKey(c))
    if (key !== undefined) return (row as Row)[key]
  }
  return undefined
}

export function toNumber(v: any): number {
  if (v === null || v === undefined || v === "") return 0
  const n = Number(v)
  return Number.isNaN(n) ? 0 : n
}

// ----------------- MODIFIED -----------------
export function mapDoctor(row: Row) {
  return {
    id: get<string>(row, "id", "doctor_id"),
    name: get<string>(row, "name", "doctor_name"),
    specialty: get<string>(row, "specialty", "speciality", "department"),
    experienceYears: toNumber(get(row, "experience", "experienceYears")),
    fee: toNumber(get(row, "fee", "consultation_fee", "price")),
    hospital_id: get<string>(row, "hospital_id", "hospitalId"), // <-- ADDED
    hospitalName: get<string>(row, "hospital", "hospital_name"), // optional
    rating: toNumber(get(row, "rating", "stars")),
    photo: get<string>(row, "photo", "image", "avatar"),
    nextAvailable: get<string>(row, "next_available", "slot", "availability"),
  }
}

export function mapHospital(row: Row) {
  return {
    id: get<string>(row, "id", "hospital_id"),
    name: get<string>(row, "name", "hospital", "hospital_name"),
    address: get<string>(row, "address", "location"),
    city: get<string>(row, "city"),
    emergencyBeds: toNumber(
      get(
        row,
        "emergency_beds",
        "available_emergency_beds",
        "emergency_available",
        "beds_emergency",
        "er_beds",
        "emergency",
        "icu_emergency",
        "icu_beds",
        "beds",
      ),
    ),
    phone: get<string>(row, "phone", "contact"),
    lat: toNumber(get(row, "lat", "latitude")),
    lng: toNumber(get(row, "lng", "longitude")),
  }
}

export function mapLab(row: Row) {
  return {
    id: get<string>(row, "id", "lab_id"),
    name: get<string>(row, "name", "lab_name"),
    test: get<string>(row, "test", "test_name"),
    price: toNumber(get(row, "price", "amount")),
    turnaround: get<string>(row, "tat", "turnaround", "duration"),
  }
}

export function mapBloodBank(row: Row) {
  return {
    id: get<string>(row, "id", "bank_id"),
    name: get<string>(row, "name", "bank_name"),
    address: get<string>(row, "address", "location"),
    phone: get<string>(row, "phone", "contact"),
    stock: {
      "A+": toNumber(get(row, "A+", "A_pos", "Apos")),
      "A-": toNumber(get(row, "A-", "A_neg", "Aneg")),
      "B+": toNumber(get(row, "B+", "B_pos", "Bpos")),
      "B-": toNumber(get(row, "B-", "B_neg", "Bneg")),
      "O+": toNumber(get(row, "O+", "O_pos", "Opos")),
      "O-": toNumber(get(row, "O-", "O_neg", "Oneg")),
      "AB+": toNumber(get(row, "AB+", "AB_pos", "ABpos")),
      "AB-": toNumber(get(row, "AB-", "AB_neg", "ABneg")),
    },
  }
}

// ------------------ aggregateBloodBank stays the same ------------------
export function aggregateBloodBank(rows: Row[]) {
  const banks = new Map<
    string,
    {
      id?: string
      name?: string
      address?: string
      phone?: string
      stock: Record<string, number>
    }
  >()

  const ensureBank = (key: string, partial: Partial<Row>) => {
    if (!banks.has(key)) {
      banks.set(key, {
        id: (partial.id as string) ?? undefined,
        name: (partial.name as string) ?? undefined,
        address: (partial.address as string) ?? undefined,
        phone: (partial.phone as string) ?? undefined,
        stock: { "A+": 0, "A-": 0, "B+": 0, "B-": 0, "O+": 0, "O-": 0, "AB+": 0, "AB-": 0 },
      })
    }
    return banks.get(key)!
  }

  for (const row of rows) {
    if (!row || typeof row !== "object") continue

    const bloodTypeRaw = get<string>(row, "blood_type", "bloodgroup", "group")
    const qtyRaw = get(row, "quantity", "qty", "units", "count")

    if (bloodTypeRaw !== undefined) {
      const bankId = get<string>(row, "bank_id", "hospital_id", "id", "blood_bank_id")
      const bankName = get<string>(row, "name", "bank_name") ?? bankId ?? "Blood Bank"
      const address = get<string>(row, "address", "location")
      const phone = get<string>(row, "phone", "contact")
      const key = (bankId || bankName || "").toString()

      const bank = ensureBank(key, { id: bankId, name: bankName, address, phone })
      const grp = bloodTypeRaw.toString().toUpperCase().replace(/\s+/g, "")
      const qty = toNumber(qtyRaw)

      if (!bank.stock[grp]) bank.stock[grp] = 0
      bank.stock[grp] += qty
      continue
    }

    const wide = mapBloodBank(row)
    const mergeKey = (wide.id || wide.name || "").toString()
    if (!mergeKey) continue
    const target = ensureBank(mergeKey, wide)
    for (const k of Object.keys(wide.stock) as BloodGroup[]) {
      target.stock[k] = toNumber(target.stock[k]) + toNumber(wide.stock[k])
    }
    target.name ||= wide.name
    target.address ||= wide.address
    target.phone ||= wide.phone
  }

  return Array.from(banks.values())
}


// Add this type at the top (or near your mapBloodBank function)
type BloodGroup = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
