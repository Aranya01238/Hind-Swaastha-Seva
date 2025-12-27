// You can set SHEETS_ID and SHEETS_WRITE_URL in Project Settings later.
// For now, you can pass ?sheetId= to /api/sheets/* GET requests if the env is missing.

export const SHEETS_ID = process.env.SHEETS_ID || "13RSnLOO9hQ2HJQRgt8ijCzSdwMncBVs3J7ua73wYOhI"

// Optional Apps Script Web App URL for writes (POST). If unset, writes are disabled.
export const SHEETS_WRITE_URL = process.env.SHEETS_WRITE_URL

// Tab names must match your Google Sheet tabs exactly
export const TAB_NAMES = {
  Hospitals: "Hospitals",
  Doctors: "Doctors",
  Users: "Users", // Add this line for the new Users tab
  Appointments: "Appointments",
  Payments: "Payments",
  BloodBank: "BloodBank",
  Staff: "Staff",
  Labs: "LabTests",
  EmergencyBeds: "EmergencyBeds" // <-- alias key "Labs" maps to the real Google tab name "LabTests"
} as const

export function normalizeSheetId(input: string) {
  if (!input) return input
  // Extract /d/<id> if a full Google Sheets URL was provided
  const match = input.match(/\/d\/([a-zA-Z0-9-_]+)/)
  if (match?.[1]) return match[1]
  return input
}
