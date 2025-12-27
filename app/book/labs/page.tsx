import BookingForm, { type BookingItem } from "@/components/booking/booking-form"

const items: BookingItem[] = [
  { id: "cbc", name: "CBC Lab Test", price: 299 },
  { id: "lipid", name: "Lipid Profile", price: 799 },
  { id: "thyroid", name: "Thyroid Panel", price: 649 },
]

export default function BookLabsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <BookingForm
        type="labs"
        items={items}
        title="Book a Lab Test"
        description="Secure an appointment with a small deposit."
      />
    </main>
  )
}
