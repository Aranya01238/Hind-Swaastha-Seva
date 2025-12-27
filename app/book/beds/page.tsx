import BookingForm, { type BookingItem } from "@/components/booking/booking-form"

const items: BookingItem[] = [
  { id: "general", name: "General Bed (24h)", price: 1200 },
  { id: "icu", name: "ICU Bed (12h)", price: 5500 },
]

export default function BookBedsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <BookingForm
        type="beds"
        items={items}
        title="Reserve an Emergency Bed"
        description="Reserve a bed and arrive at the hospital desk with your confirmation."
      />
    </main>
  )
}
